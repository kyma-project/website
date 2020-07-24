---
title: Runtime provisioning and deprovisioning
type: Details
---

Kyma Environment Broker allows you to configure Runtime provisioning and deprovisioning processes.

Both provisioning and deprovisioning operation consist of several steps. Each step is represented by a separate file. As every step can be re-launched multiple times, for each step, you should determine a behavior in case of a processing failure. It can either:

- Return an error, which interrupts the entire provisioning or deprovisioning process, or
- Repeat the entire operation after the specified period.

The provisioning and deprovisioning timeouts for processing an operation are set to `24h`.

> **NOTE:** It's important to have lower timeouts for the Kyma installation in the Runtime Provisioner .

## Provisioning

Each provisioning step is responsible for a separate part of preparing Runtime parameters. For example, in a step you can provide tokens, credentials, or URLs to integrate Kyma Runtime with external systems. All data collected in provisioning steps are used in the step called [`create_runtime`](https://github.com/kyma-project/control-plane/blob/master/components/kyma-environment-broker/internal/process/provisioning/create_runtime.go) which transforms the data into a request input. The request is sent to the Runtime Provisioner component which provisions a Runtime.
The provisioning process contains the following steps:

| Name                                   | Domain                   | Description                                                                                                                                     | Owner            |
|----------------------------------------|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| Initialization                         | Provisioning             | Starts the provisioning process and asks the Director for the Dashboard URL if the provisioning in Gardener is finished.                                | @jasiu001 (Team Gopher)       |
| Resolve_Target_Secret                  | Hyperscaler Account Pool | Provides the name of a Gardener Secret that contains  Hypescaler account credentials used during cluster provisioning.                                | @koala7659 (Team Framefrog)      |
| AVS_Configuration_Step                 | AvS                      | Sets up external and internal monitoring of Kyma Runtime.                                      | @abbi-guarav     |
| Create_LMS_Tenant                      | LMS                      | Requests a tenant in the LMS system or provides a tenant ID if it was created before.                                                              | @piotrmiskiewicz (Team Gopher) |
| IAS_Registration                       | Identity Authentication Service | Registers a new ServiceProvider on IAS, generates client ID and Secret, and inserts them to Grafana overrides. This step is not required and can be disabled. | @jasiu001 (Team Gopher) |
| EDP_Registration                       | Event Data Platform      | Registers an SKR on Event Data Platform with the necessary parameters. This step is not required and can be disabled. | @jasiu001 (Team Gopher) |
| Provision Azure Event Hubs             | Event Hub                | Creates the Azure Event Hub Namespace which is a managed Kafka cluster for a Kyma Runtime.                                                       | @anishj0shi (Team SkyDivingTunas)     |
| Overrides_From_Secrets_And_Config_Step | Kyma overrides           | Configures default overrides for Kyma.                                                                                                          | @jasiu001 (Team Gopher)        |
| ServiceManagerOverrides                | Service Manager          | Configures overrides with Service Manager credentials.                                                                                          | @mszostok (Team Gopher)        |
| Request_LMS_Certificates               | LMS                      | Checks if the LMS tenant is ready and requests certificates. The step configures Fluent Bit in a Kyma Runtime. It requires the Create_LMS_Tenant step to be completed beforehand. The step does not fail the provisioning operation. | @piotrmiskiewicz (Team Gopher) |
| Create_Runtime                         | Provisioning             | Triggers provisioning of a Runtime in the Runtime Provisioner.                                                                                                       | @jasiu001 (Team Gopher)        |

## Deprovisioning

Each deprovisioning step is responsible for a separate part of cleaning Runtime dependencies. To properly deprovision all Runtime dependencies, you need the data used during the Runtime provisioning. You can fetch this data from the **ProvisioningOperation** struct in the [initialization](https://github.com/kyma-project/control-plane/blob/master/components/kyma-environment-broker/internal/process/deprovisioning/initialisation.go#L46) step.

Any deprovisioning step shouldn't block the entire deprovisioning operation. Use the `RetryOperationWithoutFail` function from the `DeprovisionOperationManager` struct to skip your step in case of retry timeout. Set at most 5min timeout for retries in your step.

The deprovisioning process contains the following steps:

| Name                         | Domain         | Status      | Description                                                                            | Owner     |
|------------------------------|----------------|-------------|----------------------------------------------------------------------------------------|-----------|
| Deprovision_Initialization   | Deprovisioning | Done        | Initializes the `DeprovisioningOperation` instance with data fetched from the `ProvisioningOperation`. | @polskikiel (Team Gopher) |
| Deprovision Azure Event Hubs | Event Hub      | In progress | Deletes the Azure Event Hub Namespace.                                                  | @montaro (Team SkyDivingTunas)   |
| De-provision_AVS_Evaluations | AvS            | Done        | Removes external and internal monitoring of Kyma Runtime.                                                  | @abbi-guarav  |
| IAS_Deregistration           | Identity Authentication Service | Done | Removes the ServiceProvider from IAS. | @jasiu001 (Team Gopher) |
| EDP_Deregistration           | Event Data Platform | Done | Removes all entries about SKR from Event Data Platform. | @jasiu001 (Team Gopher) |
| Remove_Runtime               | Deprovisioning | Done        | Triggers deprovisioning of a Runtime in the Runtime Provisioner. | @polskikiel (Team Gopher) |

## Add provisioning or deprovisioning step

You can configure Runtime provisioning and deprovisioning processes by providing additional steps. To add a new provisioning or deprovisioning step, follow these tutorials:

<div tabs name="runtime-provisioning-deprovisioning" group="runtime-provisioning-deprovisioning">
  <details>
  <summary label="provisioning">
  Provisioning
  </summary>

1. Create a new file in [this](https://github.com/kyma-project/control-plane/blob/master/components/kyma-environment-broker/internal/process/provisioning) directory.

2. Implement this interface in your provisioning step:

    ```go
    type Step interface {
        Name() string
        Run(operation internal.ProvisioningOperation, logger logrus.FieldLogger) (internal.ProvisioningOperation, time.Duration, error)
    }
    ```

    - `Name()` method returns the name of the step that is used in logs.
    - `Run()` method implements the functionality of the step. The method receives operations as an argument to which it can add appropriate overrides or save other used variables.


    ```go
    operation.InputCreator.SetOverrides(COMPONENT_NAME, []*gqlschema.ConfigEntryInput{
        {
            Key:   "path.to.key",
            Value: SOME_VALUE,
        },
        {
            Key:    "path.to.secret",
            Value:  SOME_VALUE,
            Secret: ptr.Bool(true),
        },
    })
    ```

    If your functionality contains long-term processes, you can store data in the storage.
    To do this, add this field to the provisioning operation in which you want to save data:

    ```go
    type ProvisioningOperation struct {
        Operation `json:"-"`

        // These fields are serialized to JSON and stored in the storage
        LmsTenantID            string `json:"lms_tenant_id"`
        ProvisioningParameters string `json:"provisioning_parameters"`

        NewFieldFromCustomStep string `json:"new_field_from_custom_step"`    

        // These fields are not stored in the storage
        InputCreator ProvisionInputCreator `json:"-"`
    }
    ```

    By saving data in the storage, you can check if you already have the necessary data and avoid time-consuming processes. You should always return the modified operation from the method.

    See the example of the step implementation:

    ```go
    package provisioning

    import (
        "encoding/json"
        "net/http"
        "time"

        "github.com/kyma-incubator/compass/components/provisioner/pkg/gqlschema"
        "github.com/kyma-incubator/compass/components/kyma-environment-broker/internal"
        "github.com/kyma-incubator/compass/components/kyma-environment-broker/internal/storage"

        "github.com/sirupsen/logrus"
    )

    type HelloWorldStep struct {
        operationStorage storage.Operations
        client           *http.Client
    }

    type ExternalBodyResponse struct {
        data  string
        token string
    }

    func NewHelloWorldStep(operationStorage storage.Operations, client *http.Client) *HelloWorldStep {
        return &HelloWorldStep{
            operationStorage: operationStorage,
            client:           client,
        }
    }

    func (s *HelloWorldStep) Name() string {
        return "Hello_World"
    }

    // Your step can be repeated in case any other step fails, even if your step has already done its job
    func (s *HelloWorldStep) Run(operation internal.ProvisioningOperation, log *logrus.Entry) (internal.ProvisioningOperation, time.Duration, error) {
        log.Info("Start step")

        // Check whether your step should be run or if its job has been done in the previous iteration
        // All non-save operation data are empty (e.g. InputCreator overrides)

        // Add your logic here

        // Add a call to an external service (optional)
        response, err := s.client.Get("http://example.com")
        if err != nil {
            // Error during a call to an external service may be temporary so you should return time.Duration
            // All steps will be repeated in X seconds/minutes
            return operation, 1 * time.Second, nil
        }
        defer response.Body.Close()

        body := ExternalBodyResponse{}
        err = json.NewDecoder(response.Body).Decode(&body)
        if err != nil {
            log.Errorf("error: %s", err)
            // Handle a process failure by returning an error or time.Duration
        }

        // If a call or any other action is time-consuming, you can save the result in the operation
        // If you need an extra field in the ProvisioningOperation structure, add it first
        // in the step below; beforehand, you can check if a given value already exists in the operation
        operation.HelloWorlds = body.data
        updatedOperation, err := s.operationStorage.UpdateProvisioningOperation(operation)
        if err != nil {
            log.Errorf("error: %s", err)
            // Handle a process failure by returning an error or time.Duration
        }

        // If your step finishes with data which should be added to override used during the Runtime provisioning,
        // add an extra value to operation.InputCreator, then return the updated version of the Application
        updatedOperation.InputCreator.SetOverrides("component-name", []*gqlschema.ConfigEntryInput{
            {
                Key:   "some.key",
                Value: body.token,
            },
        })

        // Return the updated version of the Application
        return *updatedOperation, 0, nil
    }
    ```

3. Add the step to the [`/cmd/broker/main.go`](https://github.com/kyma-project/control-plane/blob/master/components/kyma-environment-broker/cmd/broker/main.go) file:

    ```go
    provisioningSteps := []struct {
   		weight   int
   		step     provisioning.Step
   	}{
   		{
   			weight: 1,
   			step:   provisioning.NewHelloWorldStep(db.Operations(), &http.Client{}),
   		},
    }
    ```

    The weight of the step should be greater than or equal to 1. If you want the step to be performed before a call to the Runtime Provisioner, its weight must be lower than the weight of the `create_runtime` step.

  </details>
  <details>
  <summary label="deprovisioning">
  Deprovisioning
  </summary>

  1. Create a new file in [this](https://github.com/kyma-project/control-plane/blob/master/components/kyma-environment-broker/internal/process/deprovisioning) directory.

2. Implement this interface in your deprovisioning step:

    ```go
    type Step interface {
        Name() string
        Run(operation internal.DeprovisioningOperation, logger logrus.FieldLogger) (internal.DeprovisioningOperation, time.Duration, error)
    }
    ```

    - `Name()` method returns the name of the step that is used in logs.
    - `Run()` method implements the functionality of the step. The method receives operations as an argument to which it can add appropriate overrides or save other used variables.


    If your functionality contains long-term processes, you can store data in the storage.
    To do this, add this field to the deprovisioning operation in which you want to save data:

    ```go
    type DeprovisioningOperation struct {
        Operation `json:"-"`

        // add additional data here
    }
    ```

    By saving data in the storage, you can check if you already have the necessary data and avoid time-consuming processes. You should always return the modified operation from the method.

    See the example of the step implementation:

    ```go
    package deprovisioning

    import (
        "encoding/json"
        "net/http"
        "time"

        "github.com/kyma-incubator/compass/components/provisioner/pkg/gqlschema"
        "github.com/kyma-incubator/compass/components/kyma-environment-broker/internal"
        "github.com/kyma-incubator/compass/components/kyma-environment-broker/internal/storage"

        "github.com/sirupsen/logrus"
    )

    type HelloWorldStep struct {
        operationStorage storage.Operations
        client           *http.Client
    }

    type ExternalBodyResponse struct {
        data  string
        token string
    }

    func NewHelloWorldStep(operationStorage storage.Operations, client *http.Client) *HelloWorldStep {
        return &HelloWorldStep{
            operationStorage: operationStorage,
            client:           client,
        }
    }

    func (s *HelloWorldStep) Name() string {
        return "Hello_World"
    }

    // Your step can be repeated in case any other step fails, even if your step has already done its job
    func (s *HelloWorldStep) Run(operation internal.DeprovisioningOperation, log *logrus.Entry) (internal.DeprovisioningOperation, time.Duration, error) {
        log.Info("Start step")

        // Check whether your step should be run or if its job has been done in the previous iteration
        // All non-save operation data are empty (e.g. InputCreator overrides)

        // Add your logic here

        // Add a call to an external service (optional)
        response, err := s.client.Get("http://example.com")
        if err != nil {
            // Error during a call to an external service may be temporary so you should return time.Duration
            // All steps will be repeated in X seconds/minutes
            return operation, 1 * time.Second, nil
        }
        defer response.Body.Close()

        body := ExternalBodyResponse{}
        err = json.NewDecoder(response.Body).Decode(&body)
        if err != nil {
            log.Errorf("error: %s", err)
            // Handle a process failure by returning an error or time.Duration
        }

        // If a call or any other action is time-consuming, you can save the result in the operation
        // If you need an extra field in the DeprovisioningOperation structure, add it first
        // in the step below; beforehand, you can check if a given value already exists in the operation
        operation.HelloWorlds = body.data
        updatedOperation, err := s.operationStorage.UpdateDeprovisioningOperation(operation)
        if err != nil {
            log.Errorf("error: %s", err)
            // Handle a process failure by returning an error or time.Duration
        }

        // If your step finishes with data which should be added to override used during the Runtime deprovisioning,
        // add an extra value to operation.InputCreator, then return the updated version of the Application
        updatedOperation.InputCreator.SetOverrides("component-name", []*gqlschema.ConfigEntryInput{
            {
                Key:   "some.key",
                Value: body.token,
            },
        })

        // Return the updated version of the Application
        return *updatedOperation, 0, nil
    }
    ```

3. Add the step to the [`/cmd/broker/main.go`](https://github.com/kyma-project/control-plane/blob/master/components/kyma-environment-broker/cmd/broker/main.go) file:

    ```go
    deprovisioningSteps := []struct {
   		weight   int
   		step     deprovisioning.Step
   	}{
   		{
   			weight: 1,
   			step:   deprovisioning.NewHelloWorldStep(db.Operations(), &http.Client{}),
   		},
    }
    ```

    The weight of the step should be greater than or equal to 1. If you want the step to be performed before a call to the Runtime Provisioner, its weight must be lower than the weight of the `remove_runtime` step.

   </details>
</div>
