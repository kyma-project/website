---
title: Test strategy
---

This document is a general guide to how tests are performed in Kyma. It aims to clearly describe technical requirements for all Kyma test suites. It also explains the rationale behind them so they can be challenged when the need arises. In particular, this document is about:
* Types of tests to be implemented
* Tools that are used for testing
* Responsibilities of different persons in the quality assurance process
* Test automation
* Manual testing

Every contribution to Kyma must be compliant with this strategy.

## Test types
 We define several kinds of tests in Kyma. This section aims to describe all of them in detail. By the end of it you should be able to answer these questions:
* What are those tests and what is their purpose?
* Who defines test cases and what should they focus on?
* How are tests implemented and where is the code located?
* How are the tests integrated into continuous integration (CI) pipeline?

### Code quality checks
The validation of syntactic and semantic structure of the code contributes to better readability and maintainability and helps to avoid some programming errors.   

In general, it is a maintainer’s decision which checks are applied to a particular component, but we defined a minimal required set of checks that must be applied to all components.

The following tools have been defined as the minimal checks to be done for GO code:

* **go lint** as a style validation linter
* **go vet** for the static code analysis to find possible bugs or suspicious constructs
* **go fmt** to standardize the code formatting

For JavaScript and TypeScript code, this validation will be done using:

* [ESLint](https://eslint.org/) for JavaScript code validation
* [TSLint](https://palantir.github.io/tslint/) for TypeScript code validation

Code quality checks are required to pass before any contribution can be merged into the `main` branch. All quality checks for a component should be put in its build script. Thanks to that, code analysis is executed automatically on CI. Anyone can also execute these tools manually in a local development environment.

### Component tests
By component tests, we understand all tests that do not cross the component boundary. This may include tests with a different granularity of scope, e.g. tests for a single module (unit tests) or tests checking a component as a whole. The purpose of component testing is to provide fast feedback to a contributor that implements a given functionality. Test code must be placed in the same location in the repository as the tested code.

Every change in the code should be verified by a set of component tests, but strict test coverage is not required. The contributor is responsible for writing scenarios that are most beneficial and give confidence that the new software is working as expected. Maintainers decide if the implemented test suite covers the functionality sufficiently.

Component tests are required to pass before any contribution can be merged into the `main` branch. A command to run unit tests must be a part of the component build script. Thanks to that, unit tests are executed automatically on the CI server. Anyone can also execute component tests in the local environment.

### Integration tests
Integration tests are applications run within a Kyma cluster and verify Kyma behavior. Their purpose is to check if Kyma components work as expected in a production-like environment. Their focus is on a single component and its interactions.

Integration tests should verify if a component communicates properly with its dependencies and clients. Test cases are not formalized and it is up to contributors to write them in the way they find it beneficial. The maintenance cost of integration tests is much higher than the cost of component tests so the latter should be preferred if possible. Any internal logic should be tested by component tests.

Integration tests are built as Docker containers and deployed to a Kyma cluster using [Octopus](https://github.com/kyma-incubator/octopus). The test application must fail if the aspect of Kyma that is being tested does not meet its acceptance criteria. They should be fast and safe to run concurrently. The hard limit on how long a single test can run is 2 minutes. The code of test applications is located in the `tests/integration/` folder in Kyma. Tests for a given component should be placed in a subdirectory named after that component, e.g. `tests/integration/api-controller/`.

Integration tests are required to pass before any change can be merged into the `main` branch. As the results may change when running on different Kubernetes implementations, they must finish successfully on Minikube and cloud Kubernetes cluster.

### End-to-end tests
End-to-end tests are applications meant to verify complete user interactions with Kyma. They mimic user behavior in a set of predefined scenarios to check if Kyma meets the business requirements. Because of their overarching nature, they must use only entry points meant to be used by end users.

Test scenarios are provided by the Product Owner. Scenario descriptions should be written down in a user-facing document. It is meant to provide users with an easy-to-grasp introduction to a given Kyma functionality.

The implementation of E2E tests may vary. If possible, they should be Docker applications deployed using [Octopus](https://github.com/kyma-incubator/octopus). However, some scenarios may cross cluster boundaries and thus require different methods of execution. A description of such a test must contain an explanation of how to run it manually. All E2E test code must be placed under `tests/end-to-end/` in the `kyma` repository with a directory name reflecting the business requirement it is testing, e.g. `tests/end-to-end/upgrade`.

E2E scenarios are executed as periodic jobs on the CI server. They may be resource- and time-consuming so they are not required to pass before merging to the `main` branch. There can be exceptions to this rule such as an E2E test which is required to pass before merging is allowed.

### Contract tests
Contract tests are Docker applications, just like integration tests. The difference is that they test if an external solution that Kyma relies on works as expected. Their main goal is to be able to safely upgrade 3rd parties and know where the API contract was broken.

Test cases are defined by a contributor who integrates the external solution with Kyma. They shouldn't test 3rd party code extensively, but rather check if the contract defined by the provider is being kept. Ideally, every API used by Kyma should be covered.

Contract tests are Docker applications run by [Octopus](https://github.com/kyma-incubator/octopus). The code is placed in the `tests/contract/` directory in a subdirectory named after a solution they are testing, e.g. `tests/contract/knative-serving`. They should be fast and safe to run concurrently. The hard limit on how long a single test can run is 2 minutes. They shouldn’t rely on any Kyma component.

Contract tests are required to pass before merging a change into the `main` branch. As they should rely only on the solution that is being tested, they may be skipped by the CI server if the change is not related to the solution.

## Development
Because tests are developed as code, some of the rules outlined above apply to them too. Every test must be covered at least by code quality checks. Tests run as applications can also be unit tested if applicable. Also, tests must pass a code review by one of Kyma maintainers. The code review process is documented in the [contributing guidelines](/contributing/02-contributing.md) in the `community` repository.

The reviewer should not only for the quality of the code implementing functionality but also for the code validating it. Reviewer should pay attention to the implemented test cases. Test coverage should give confidence that the software is working as expected. There are currently no requirements in terms of measuring test coverage.

## Continuous integration
Contributors should write tests at the same time then they make changes in production code according to test-driven development (TDD) practices. Such tests are automatically executed as a part of the CI process. Thanks to that approach, the newly created functionality is thoroughly tested before it is merged to the `main` branch.

### Presubmit
Some tests described in this document are required to pass before a change can be merged into the `main` branch. No new code change can be merged if tests are not passing on the CI server. Tests shouldn’t be skipped or made less strict to make them pass if requirements were not changed.

### Postsubmit
Besides checks on pull requests, all tests are also run on the `main` branch to verify if new submissions haven’t broken Kyma. If the test execution fails, the corresponding team is responsible to evaluate the failure and determine the root cause. Problems found this way should be reported as GitHub issues and labeled `test-failing`.  

### Nightly and weekly builds
In addition to required and periodic checks, there are also nightly and weekly clusters that are meant to check Kyma stability. They are created every night or once a week respectively from the `main` branch at the time of the cluster creation. Only integration and contract tests are run on them. The tests are run in fixed intervals. Failures on those clusters should be treated the same way as postsubmit failures.

## Manual testing
Kyma test coverage is not complete yet, and probably will never be due to the nature of software development. We cannot predict all the test cases and discover all bugs. If a bug is discovered later, we need to add an automated test to cover that scenario. Thanks to that, we will avoid making the same mistakes in the future.

Because of the facts outlined above, some manual tests are always required before Kyma is released. Release candidates have to be verified manually following this process:

1. Every time a missing test case is identified or a bug is found, an issue to cover that scenario with automated tests is created. The issue is labeled `test-missing` and assigned to the backlog of a team maintaining this area. In the case of unclear responsibility, one team is chosen. The issue description must contain a procedure on how to verify this scenario manually.
2. While creating a new release candidate, the Release Master creates a place to track progress (e.g. spreadsheet) with all open issues labeled `test-missing`. Teams assigned to issues are responsible to check manually if the functionality not covered with tests is working as expected, and report any problems. They mark their progress in the space provided by the Release Master.
3. If any test is unstable and impedes the release, the Release Master may decide to disable that test. The Release Master creates an issue to enable that test again and labels it `test-missing`. The responsible team must then perform the test manually on the release candidate.
