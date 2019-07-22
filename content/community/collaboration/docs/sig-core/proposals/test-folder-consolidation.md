# Test folder consolidation

## Introduction
The [tests](https://github.com/kyma-project/kyma/tree/master/tests) folder of the kyma-project contains tests executed against a running Kyma cluster to assure integrity and functional correctness of the cluster with all modules installed.
These are acceptance tests.
All subfolders in the `tests` directory define one test suite, usually focusing on one component.

## Problem
Each subfolder uses a different naming pattern. For example, `kubeless` or `ui-api-layer-acceptance-tests`.

As a result:
- It's difficult to decide which convention to follow when creating a new subfolder.
- It's not always possible to derive the related component (there is no e2e test yet, the tests are focused on components).
- It's confusing for readers.

## Goal

Propose a name pattern using specific information to distinguish between the folders.

## Consideration

**kind of test** Currently, all tests are called **acceptance tests**. As long as there is no different kind of tests available, the test kind is not valuable information as part of the subfolder name.

**test prefix/suffix** All subfolders contain test suites. That's why they reside in the `test` folder. A prefix or suffix in the folder name is redundant and does not bring more value to the reader.

**one component per folder** As long as a test suite focuses on a specific component, the test suite should be named accordingly. This way the component and its maintainers can be identified quicker.
The `acceptance` folder currently contains test suites for 3 different components. These suites share some few common scripts. The best practice is to have a dedicated folder per component, including a docker image. That's why the `acceptance` folder should be converted into three dedicated component folders with their own docker images. Common scripts can be still shared on the root level or in a `common` folder.

**docker images** Each subfolder produces a docker image using the folder name for the image name. If no prefix/suffix is used, the folder and image names can be conflicting. Introducing a subfolder for the image could solve this problem. 

## Proposal

Use the component's name for the component-specific subfolder.

No prefix, no suffix, no `acceptance` no multi-components.

The docker image for a subfolder resides in the `tests` subfolder.

**Example**: The Event-Bus component has its acceptance tests in the `tests/event-bus` folder and produces the `XX/tests/event-bus:0.5.1` docker image.

+ Bundle the real e2e scenarios (like kubeless-integration) into one `e2e` subfolder. Here we should have one test project which executes all e2e tests divided by scenarios into different packages.

## Actions

- Include a `README.md` file in the `tests` folder to explain the naming convention.
- Link the `README.md` file in the developer's guide.
- Migrate the `kubeless-integration` to `e2e` project containing e2e scenarios on the package level to have one test suite.
- Keep all folders in the root `tests` folder rename them according to the information in this table:

| old folder | new folder | action required |
|------------|------------|-----------------|
| acceptance | dex | yes |
| _ | service-catalog | yes |
| _ | application-controller | yes |
|api-controller-acceptance-tests|api-controller| yes |
|application-operator-tests|application-operator| yes |
|application-registry-tests|application-registry|yes|
|connector-service-tests|connector-service| yes |
|event-bus|event-bus| - |
|gateway-tests|gateway|yes|
|knative-serving-acceptance|knative-serving|yes|
|kubeless-integration|e2e|yes|
|kubeless|kubeless|-|
|logging|logging|-|
|test-namespace-controller|namespace-controller|yes|
|test-logging-monitoring|monitoring|yes|
|ui-api-layer-acceptance-tests|ui-api-layer|yes|
