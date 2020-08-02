---
title: kyma provision minikube
---

Provisions Minikube.

## Synopsis

Use this command to provision a Minikube cluster for Kyma installation.

```bash
kyma provision minikube [flags]
```

## Options

```bash
      --cpus string                  Specifies the number of CPUs used for installation. (default "4")
      --disk-size string             Specifies the disk size used for installation. (default "30g")
      --hypervVirtualSwitch string   Specifies the Hyper-V switch version if you choose Hyper-V as the driver.
      --memory string                Specifies RAM reserved for installation. (default "8192")
      --profile string               Specifies the Minikube profile.
      --timeout duration             Maximum time during which the provisioning takes place, where "0" means "infinite". Valid time units are "ns", "us" (or "µs"), "ms", "s", "m", "h". (default 5m0s)
      --vm-driver string             Specifies the VM driver. Possible values: vmwarefusion,kvm,xhyve,hyperv,hyperkit,virtualbox,kvm2,none (default "hyperkit")
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

* [kyma provision](#kyma-provision-kyma-provision)	 - Provisions a cluster for Kyma installation.

