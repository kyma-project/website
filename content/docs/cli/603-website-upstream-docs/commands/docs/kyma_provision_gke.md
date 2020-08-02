---
title: kyma provision gke
---

Provisions a Google Kubernetes Engine (GKE) cluster on Google Cloud Platform (GCP).

## Synopsis

Use this command to provision a GKE cluster on GCP for Kyma installation. Use the flags to specify cluster details.
NOTE: To access the provisioned cluster, make sure you get authenticated by Google Cloud SDK. To do so,run `gcloud auth application-default login` and log in with your Google Cloud credentials.

```bash
kyma provision gke [flags]
```

## Options

```bash
  -c, --credentials string    Path to the GCP service account key file. (required)
      --disk-size int         Disk size (in GB) of the cluster. (default 50)
  -k, --kube-version string   Kubernetes version of the cluster. (default "1.15")
  -l, --location string       Location of the cluster. (default "europe-west3-a")
  -n, --name string           Name of the GKE cluster to provision. (required)
      --nodes int             Number of cluster nodes. (default 3)
  -p, --project string        Name of the GCP Project where you provision the GKE cluster. (required)
  -t, --type string           Machine type used for the cluster. (default "n1-standard-4")
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

