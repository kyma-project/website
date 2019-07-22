# Create a common package for libraries used in Kyma components

Created on 2018-10-12 by Mateusz Szostok (@mszostok).

## Status

Proposed on 2018-10-17.

## Motivation

The Kyma project was consolidated and now all core projects written in Go are placed in one repository. Unfortunately, all of them are still written in a different way.

This situation causes the following problems: 
- Often the common package is copied across different projects which means that we break the DRY rule.
- When we do not follow the DRY rule, we must fix the detected bugs in all places. It makes it more complex to fix bugs and also makes it easy to forget about some projects.
- If a developer is not aware that a given functionality is already implemented and can be reused, the approach for the same business logic (such as logging pattern, metrics, graceful shutdown, testing, or configuration) is different.
- Because projects often have different approaches to the same problem, it's difficult for internal and external contributors to get acquainted with the project. 
- When a given functionality is reimplemented several times by different developers, the testing approach is often different. It means that sometimes the functionality is well tested but when it's not, it might not work as expected. The good example is a **wait** functionality. We reimplemented a well-known pattern [here](https://github.com/kyma-project/kyma/blob/09b945ec0a897822b40666e518f2f258ae66e7e8/tests/acceptance/servicecatalog/wait/wait.go#L8-L24) but with the small bug which caused that the function never reached a given timeout. There are a lot of reimplementations of this pattern in new PRs, for example [here](https://github.com/kyma-project/kyma/blob/ea5979bf2d82740e84d119df857f9e34541e070e/tests/backup-restore-e2e/utils/wait_util.go#L21-L42) (also not tested). 

## Solution

Extract common code from the Kyma components to the common package and use it in all required places. This allows us to use unified and well-tested libraries in our projects, which will be easier to understand and make future development faster.

### Scope

There is a question whether to use the general Go SDK or tight-coupled SDK for the Kyma project. This is the first phase, so the idea is to have an internal library used only by the Kyma developers. 
Those libraries should not be treated as public and we should not focus on having the generic libraries there. Instead, we should place there all things which are helpful for Kyma developers even if they are tightly coupled with the Kyma domain.

In the future, we should execute the next phase and review our libraries. We should also check if we are ready to extract common libraries outside and announce them as the official SDK for all Kyma internal and external developers. 

### Package name 

In Go ecosystem, there is a pretty popular `pkg` layout pattern. Many well-known projects, such as [Kubernetes](https://github.com/kubernetes/kubernetes/tree/master/pkg), [Docker](https://github.com/moby/moby/tree/master/pkg), [Grafana](https://github.com/grafana/grafana/tree/master/pkg), [Influxdb](https://github.com/influxdata/influxdb/tree/master/pkg), [Etcd](https://github.com/etcd-io/etcd/tree/master/pkg), use this pattern. 
However, the `pkg` directory is used mainly for public libraries. They can be used internally by your application but also by external projects. 
This is an informal contract between you and the external users of your code. 

In Go, there is a possibility to hide code using internal directories. If you put your code in an `internal` directory, no external project will be able to import that code. 
Initially, the idea was to put our private libraries in `kyma/internal/pkg/{private_libs}` but we consolidated all the project to one repository, so there is no option to vendor such libraries in our project. In this case, when we execute the `dep ensure` command, we receive such error:  
```
use of internal package  kyma/internal/pkg/http not allowed
```

Additionally, in case the libraries are hidden, there is no option to use them in other projects inside the Kyma project or Kyma Incubator organizations.

The new proposition is to name the package for libraries as `common`  and place it on the root of the Kyma repository as we will use it in `components`, `tests`, and `tools` projects. In the future, libraries can be moved to the `pkg` directory.

```text
.
└── kyma
    ├── CODEOWNERS
    ├── CODE_OF_CONDUCT.md
    ├── ...  # all other files
    ├── common # common libraries
    │   ├── README.md
    │   ├── iosafety/
    │   ├── logger/
    │   ├── ptr/
    │   └── signal/
    ├── components # use libs from common
    │   ├── api-controller/
    │   ├── apiserver-proxy/
    │   ├── binding-usage-controller/
    │   ├── configurations-generator/
    │   ├── connector-service/
    │   ├── environments/
    │   ├── event-bus/
    │   ├── event-service/
    │   ├── gateway/
    │   ├── helm-broker/
    │   ├── idppreset/
    │   ├── installer/
    │   ├── istio-kyma-patch/
    │   ├── istio-webhook/
    │   ├── metadata-service/
    │   ├── remote-environment-broker/
    │   ├── remote-environment-controller/
    │   └── ui-api-layer
    ├── tests # use libs from common
    │   ├── acceptance/
    │   ├── api-controller-acceptance-tests/
    │   ├── connector-service-tests/
    │   ├── event-bus/
    │   ├── gateway-tests/
    │   ├── kubeless-test-client/
    │   ├── logging/
    │   ├── metadata-service-tests/
    │   ├── remote-environment-controller-tests/
    │   ├── test-environments/
    │   ├── test-logging-monitoring/
    │   └── ui-api-layer-acceptance-tests/
    └── tools # use libs from common
        ├── alpine-net/
        ├── changelog-generator/
        ├── etcd-backup/
        ├── etcd-tls-setup/
        ├── stability-checker/
        └── watch-pods/4
```

### Examples

These are the example libraries that we can put in the package library:
- wait - a package where we place utils used for waiting for some condition. Used almost in all our acceptance and integration tests.
- http - a package where we put the default handlers required for healthz; required in all applications executed in Kuberenetes
- signals - a package where we put signal related implementations, such as graceful shutdown; required in all applications
- logger - a package where we put a mechanism for logging; required in almost all applications
- metrics - a package where we put a metrics flusher; required in almost all applications

 [Here](https://github.com/mszostok/kyma/tree/libs/common) is the example of such libraries.

### Restrictions

Libraries must be well-tested. Tests must be executed with the `-count 100` flag to ensure stability and with the `-race` flag to detect all race conditions. 
Each library must contain good documentation. It is also highly recommended that each library has the [Example Test](https://blog.golang.org/examples) similar to this [one](https://github.com/mszostok/kyma/blob/libs/common/http/client_example_test.go#L13).

### Next step

The next step is to create a proposal about the best practices. For example, we should get rid of the [`Sleep` functions](https://github.com/kyma-project/kyma/blob/09b945ec0a897822b40666e518f2f258ae66e7e8/tests/acceptance/servicecatalog/wait/wait.go#L8-L24) from our test cases and require a better approach. 
But first, we need a place where we can refer to the proper code which can be used out of the box. In such case, the common libraries can be used.
 
Another example is to unify the logging approach in our projects. This will be also resolved by the other proposal in which the source code will be placed in the common libraries package, so all projects can simply use it.  

## Consequences

Once approved, these are the consequences:
- new package for common libraries must be created and maintained
- new expert CODEOWNERS must be defined for reviewing libraries added for common package
- new package must be announced and other projects should switch to use the official libraries instead of custom implementation
- developers must always check our libraries not to reimplement the business logic
- if some business logic is used in more than two projects, it is highly recommended to extract it to common libraries. Remember that the added source code must follow all rules of the common package. Announce a new library which solves a given problem so that other developers can simply use it.

>**NOTE:** Because this proposal affects all Kyma developers, the requirement is that minimum one person from each team should take a look at this proposal and approve it or request changes.
