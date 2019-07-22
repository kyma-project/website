# DR 004: Kyma components testing

Created on 2017-12-11 by Piotr Kopczyński (@PK85).

## Context

Testing is a vital part of any production-ready solution. Kyma components, both core elements and extensions, require a simple and intuitive mechanism to check if they work as expected. The flow for running tests must be the same both for APIs and UI. As per the [Kyma Manifesto](https://kyma-project.github.io/community/), native Kubernetes has priority.

## Decision

One of the previous architecture decisions was to use Helm as the main installation tool for all Kyma components. Helm uses a packaging format called charts. Helm also provides a solution for testing charts, namely chart tests. For that reason, and also because the most intuitive solutions should be our natural choices, the decision is to use Helm to test Kyma components.

Additionally, one of the principles of the [Kyma Manifesto](https://kyma-project.github.io/community/) is to build native Kubernetes functionalities, which confirms that it is the right decision to use Helm chart tests.

## Status

Accepted on 2017-12-11.

## Consequences

Charts providers must write tests for their components and publish the tests inside a Docker image. Then, they must add the chart tests, called Pod definitions, to the relevant `templates` directory of the Helm chart. The Pods run the test image. The flow is as follows:
1. The Kyma cluster starts.
2. Components are installed.
3. After a successful installation, the test Pod and tests start running.
4. The Pod informs about the tests success or failure.
5. If any test fails, Pod logs printed in the terminal provide the details of the failure.

To learn more, see the official [Chart Tests](https://docs.helm.sh/developing_charts/#chart-tests) documentation.  

You can also use simple acceptance images with cURL.

Currently, tests run sequentially. As the number of tests increases, sequential processing can perpetually extend the duration of Kyma cluster provisioning. To reduce the amount of time, there may be a need to come up with a solution to run tests in parallel.

When choosing a tool for UI testing, the size of the Docker image needs to be taken into account. For example, the base Docker image with Chrome and Selenium is over 800 MB, and with Cypress it is about 1.5 GB. Therefore, one of the following choices must be considered:
- Find a way to cache images or have some Kyma base image with all dependencies in it.
- Choose a more lightweight solution with one core element as a test runner. However, this approach requires downloading one big image that would provide a runner environment.
- Accept running browser tests headless. An investigation is still necessary if the size of the images gets much smaller.
