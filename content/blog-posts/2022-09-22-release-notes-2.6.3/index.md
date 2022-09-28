---
title: "Kyma 2.6.3"
author:
  name: "Magdalena Stręk, PO @Kyma, and Maja Szostok, Technical Writer @Kyma"
tags:
  - release-notes 
type: release 
releaseTag: "2.6.3"
redirectFrom:
  - "/blog/release-notes-26"
---


- [API Exposure](#api-exposure) -  Bug fix for APIRule `v1alpha1` handling sub-resources

<!-- overview -->

## API Gateway 
 
In Kyma 2.6 we introduced a new version of the APIRule custom resource (CR) - `v1beta1`. Unfortunately, with this change we also introduced a bug. When an APIRule is created, it is created with certain related sub-resources, which are labeled with the version of this APIRule. These labels are used to fetch the sub-resources for the appropriate version when editing the APIRule. Unfortunately, due to improper adjustment of the labeling when introducing the new APIRule version, in Kyma 2.6, when the user edited an APIRule in version `v1alpha1`, sub-resources labeled with version `v1beta1` were searched instead. Because they were not found, the system recognized them as missing and created those sub-resources in version `v1beta1`, which was not the desired behavior. As a result, any calls to the exposed workload returned the `5xx` errors. This patch release fixes the problem.   

For more details, see the [GitHub issue](https://github.com/kyma-project/api-gateway/pull/31).

> **TIP:** See also [Release Notes for Kyma 2.6](https://kyma-project.io/blog/2022/8/25/release-notes-26/).