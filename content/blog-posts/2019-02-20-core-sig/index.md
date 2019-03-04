---
title: "The Core Special Interest Group"
author: 
  name: "Ana Yankovich, Knowledge Consultant @Kyma"
tags:
  - kyma
  - community
  - sig
  - core
redirectFrom:
  - "/blog/core-sig"
---

As you know, a vibrant community of individuals stands behind the Kyma open-source project. They collaborate through Special Interest Groups (SIGs) and Working Groups (WGs), just like it is done in Kubernetes. Additionally, both SIGs and WGs facilitate technical discussions, proposals, and contributions. They also ensure Kyma is a welcoming community for all contributors. The WGs facilitate discussions and work on short-lived, specific topics that either result from the work of SIG groups or that the community members initiate directly.

<!-- overview -->

**Is there a SIG I can join?**

Yes, there is one main SIG called **Core** that is the entry point. The Core SIG consists of SIG leaders and members. To learn more about their roles, click [here](https://github.com/kyma-project/community/blob/master/sig-and-wg/README.md#roles).

**Who are the Core SIG leaders?**

The Core SIG leaders are Piotr Kopczynski ([@PK85](https://twitter.com/PiotrasPk)), Mateusz Szostok [(@mszostok](https://twitter.com/m_szostok)), Ahmed Abdalla ([@Abd4llA](https://twitter.com/Abd4llA)), and Lukasz Gornicki ([@derberg](https://twitter.com/derberq)).

**What is the purpose of the Core SIG?**

The purpose of the Core SIG is to:

- Publicly represent Kyma.
- Facilitate collaboration with external contributors.
- Communicate the Kyma project vision and roadmap to the community.
- Represent the Kyma contributors.
- Be the main contribution contact for Kyma.
- Gauge interest, request the community feedback, and ensure it is addressed.
- Own all code repositories in the Kyma organization except for the `community` repository.
- Showcase proposals to the community and collect feedback on those proposals to assist the decision-making process.
- Represent its members and the Kyma community in the Council meetings.

**I am interested! How can I join the Core SIG?**

You can join the Core SIG biweekly meetings that take place on Wednesdays at 15:00 CET on [Zoom](https://zoom.us/j/4794339038). If you can't join them, read the meeting agenda and notes [here](https://docs.google.com/document/d/1vWleTon7sJIk0teee4SoVezS4mR3K8TlkvXkgLJwRD8), or watch the meeting recordings on the [Kyma YouTube channel](https://www.youtube.com/watch?v=1DD5aCBnywQ&amp;list=PL7PGl--iaIH9jnbT8yG_KOV3unv1iUILR).

We're on [Slack](https://join.slack.com/t/kyma-community/shared_invite/enQtNDAwNzE4Mjk2NDE3LTJhOTlmZjM5YzkwNmEzNmY3ZjE2MTU2OTMxOGE4ZDM0MmU4ZWRkZGJiODgzNmRmMTYxMDYwNjZiMDAwMTA2OWM) too!
Join the [#sig-core Slack channel](https://kyma-community.slack.com/messages/CBP7LKRPS/) to ask questions, keep up to date with the latest Core SIG news, or simply to meet the Core SIG leaders and members. 

We'd be happy to have you at the Core SIG!

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