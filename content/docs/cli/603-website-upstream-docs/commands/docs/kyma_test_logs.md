---
title: kyma test logs
---

Shows the logs of tests Pods for a given test suite.

## Synopsis

Use this command to display logs of a test executed for a given test suite. By default, the command displays logs for failed tests, but you can change this behavior using the "test-status" flag. 

To print the status of specific test cases, run `kyma test logs testSuiteOne testSuiteTwo`.
Provide at least one test suite name.


```bash
kyma test logs <test-suite-1> <test-suite-2> ... <test-suite-N> [flags]
```

## Options

```bash
      --ignored-containers strings   Container names which are ignored when fetching logs from testing Pods. Takes comma-separated list. (default [istio-init,istio-proxy,manager])
      --test-status string           Displays logs coming only from testing Pods with a given status. (default "Failed")
```

## Options inherited from parent commands

```bash
      --ci                  Enables the CI mode to run on CI/CD systems.
  -h, --help                Displays help for the command.
      --kubeconfig string   Specifies the path to the kubeconfig file. By default, Kyma CLI uses the KUBECONFIG environment variable or "/$HOME/.kube/config" if the variable is not set.
      --non-interactive     Enables the non-interactive shell mode.
  -v, --verbose             Displays details of actions triggered by the command.
```

## See also

* [kyma test](#kyma-test-kyma-test)	 - Runs tests on a provisioned Kyma cluster.

