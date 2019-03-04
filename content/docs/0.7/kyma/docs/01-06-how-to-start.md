---
title: How to start
type: Overview
---

When you already know what Kyma is and what components it consists of, you can start using it. Minikube allows you to run Kyma locally, develop, and test your solutions on a small scale before you push them to a cluster. With the Installation and Getting Started guides in hand, you can start developing in a matter of minutes.

Read, learn, and try on your own to:

- [Install Kyma locally from the release](#installation-install-kyma-locally-from-the-release)
- [Install Kyma locally from sources](#installation-install-kyma-locally-from-sources)
- [Install Kyma on a cluster](#installation-install-kyma-on-a-gke-cluster)
- [Deploy a sample service locally](#getting-started-sample-service-deployment-on-local)
- [Deploy a service on a cluster](#getting-started-sample-service-deployment-on-a-cluster)
- [Develop a service locally without using Docker](#getting-started-develop-a-service-locally-without-using-docker)
- [Publish a service Docker image and deploy it to Kyma](#getting-started-publish-a-service-docker-image-and-deploy-it-to-kyma)
- [Configure the Installer with override values for Helm charts](#getting-started-helm-overrides-for-kyma-installation)
- [Register a Broker in Service Catalog](/components/service-catalog#tutorials-register-a-broker-in-the-service-catalog)
- [Create a new Application](/components/application-connector#tutorials-create-a-new-application)
- [Get the client certificate](/components/application-connector#tutorials-get-the-client-certificate)
- [Register a service](/components/application-connector#tutorials-register-a-service)
- [Bind an Application to a Namespace](/components/application-connector#tutorials-bind-an-application-to-a-namespace)
- [Trigger a lambda with events](/components/application-connector#tutorials-trigger-a-lambda-with-events)
- [Call a registered external service from Kyma](/components/application-connector#tutorials-call-a-registered-external-service-from-kyma)
- [Expose custom metrics in Kyma](/components/monitoring#tutorials-expose-custom-metrics-in-kyma)

1. lololol
2. lololo
    <div tabs>
      <details>
      <summary>
      From release
      </summary>

      When you install Kyma locally from a release, follow [this](#installation-install-kyma-locally-from-the-release-install-kyma-on-minikube) guide. 
      Ensure that you created the local Kubernetes cluster with `10240Mb` memory and `30Gb` disk size.
      ```
      ./scripts/minikube.sh --domain "kyma.local" --vm-driver "hyperkit" --memory 10240Mb --disk-size 30g
      ```

      Run the following command before triggering the Kyma installation process:
      ```
      kubectl -n kyma-installer patch configmap installation-config-overrides -p '{"data": {"global.knative": "true", "global.kymaEventBus": "false", "global.natsStreaming.clusterID": "knative-nats-streaming"}}'
      ```
      </details>
      <details>
      <summary>
      From sources
      </summary>

      When you install Kyma locally from sources, add the `--knative` argument to the `run.sh` script. Run this command:

      ```
      ./run.sh --knative
      ```
      </details>
      <details>
      <summary>
      Cluster deployment
      </summary>

      Run the following command before triggering the Kyma installation process:
      ```
      kubectl -n kyma-installer patch configmap installation-config-overrides -p '{"data": {"global.knative": "true", "global.kymaEventBus": "false", "global.natsStreaming.clusterID": "knative-nats-streaming"}}'
      ```
      </details>
    </div>
3. lololo
    <div tabs>
      <details>
      <summary>
      From release
      </summary>

      When you install Kyma locally from a release, follow [this](#installation-install-kyma-locally-from-the-release-install-kyma-on-minikube) guide. 
      Ensure that you created the local Kubernetes cluster with `10240Mb` memory and `30Gb` disk size.
      ```
      ./scripts/minikube.sh --domain "kyma.local" --vm-driver "hyperkit" --memory 10240Mb --disk-size 30g
      ```

      Run the following command before triggering the Kyma installation process:
      ```
      kubectl -n kyma-installer patch configmap installation-config-overrides -p '{"data": {"global.knative": "true", "global.kymaEventBus": "false", "global.natsStreaming.clusterID": "knative-nats-streaming"}}'
      ```
      </details>
      <details>
      <summary>
      From sources
      </summary>

      When you install Kyma locally from sources, add the `--knative` argument to the `run.sh` script. Run this command:

      ```
      ./run.sh --knative
      ```
      </details>
      <details>
      <summary>
      Cluster deployment
      </summary>

      Run the following command before triggering the Kyma installation process:
      ```
      kubectl -n kyma-installer patch configmap installation-config-overrides -p '{"data": {"global.knative": "true", "global.kymaEventBus": "false", "global.natsStreaming.clusterID": "knative-nats-streaming"}}'
      ```
      </details>
    </div>