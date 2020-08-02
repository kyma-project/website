---
title: kyma install
---

Installs Kyma on a running Kubernetes cluster.

## Synopsis

Use this command to install Kyma on a running Kubernetes cluster.

### Detailed description

Before you use the command, make sure your setup meets the following prerequisites:

* Kyma is not installed.
* Kubernetes cluster is available with your kubeconfig file already pointing to it.

Here are the installation steps:

The standard installation uses the minimal configuration. The system performs the following steps:

1. Deploys and configures the Kyma Installer. At this point, steps differ depending on the installation type.

  When you install Kyma locally **from release**, the system:
   
  1. Fetches the latest or specified release along with configuration.
  2. Deploys the Kyma Installer on the cluster.
  3. Applies downloaded or defined configuration.
  4. Applies overrides, if applicable.
  5. Sets the admin password.
  6. Patches the Minikube IP.
	
  When you install Kyma locally **from sources**, the system:

  1. Fetches the configuration yaml files from the local sources.
  2. Builds the Kyma Installer image.
  3. Deploys the Kyma Installer and applies the fetched configuration.
  4. Applies overrides, if applicable.
  5. Sets the admin password.
  6. Patches the Minikube IP.
    
2. Runs Kyma installation until the **installed** status confirms the successful installation. You can override the standard installation settings using the `--override` flag.



```bash
kyma install [flags]
```

## Options

```bash
  -c, --components string      Path to a YAML file with component list to override.
      --custom-image string    Full image name including the registry and the tag. Required for installation from local sources to a remote cluster.
  -d, --domain string          Domain used for installation. (default "kyma.local")
      --fallbackLevel int      If "source=latest-published", defines the number of commits from master branch taken into account if artifacts for newer commits do not exist yet (default 5)
  -n, --noWait                 Flag that determines if the command should wait for Kyma installation to complete.
  -o, --override stringArray   Path to a YAML file with parameters to override.
  -p, --password string        Predefined cluster password.
  -s, --source string          Installation source. 
                               	- To use the specific release, write "kyma install --source=1.3.0".
                               	- To use the latest master, write "kyma install --source=latest".
                               	- To use the latest published master, which is the latest commit with released images, write "kyma install --source=latest-published".
                               	- To use a commit, write "kyma install --source=34edf09a".
                               	- To use the local sources, write "kyma install --source=local".
                               	- To use a custom installer image, write kyma "install --source=user/my-kyma-installer:v1.4.0".
      --src-path string        Absolute path to local sources.
      --timeout duration       Time-out after which CLI stops watching the installation progress. (default 1h0m0s)
      --tlsCert string         TLS certificate for the domain used for installation. The certificate must be a base64-encoded value.
      --tlsKey string          TLS key for the domain used for installation. The key must be a base64-encoded value.
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

* [kyma](#kyma-kyma)	 - Controls a Kyma cluster.

