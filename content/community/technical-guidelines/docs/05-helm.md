---
title: Helm
---

This guide covers the best practices for creating Helm charts every Kyma team should employ. 

## Do not use the crd-install hook

Helm doesn't trigger the `crd-install` hook in the upgrade process. Because of that, new Custom Resource Definitions (CRDs) aren't installed. See the alternatives to using the `crd-install` hook:

1. Make the CRD part of a separate chart which must be installed before the chart that requires the CRD.

  - Implementation effort: **low**

  - Pros:
    * No additional implementation effort required.
    * The CRD is a separate file which can be used on its own, for example for tests.
  
  - Cons:
    * Requires creating more charts.
    * The CRD is managed by Helm and comes with all of the associated limitations.

2. Register the CRD through its controller.

  - Implementation effort: **medium**

  - Pros:
    * The CRD is managed by a component that is logically responsible for it.
    * The CRD is not subject to the Helm limitations.

  - Cons:
    * Requires a controller for the CRD.
    * The CRD is not listed as a part of Helm release.
    * The CRD is not available as a file.

3. Create a job that registers the new CRD and removes its old version. The job must be triggered on `pre-install` and `pre-upgrade` Helm hooks.

  - Implementation effort: **high**

  - Pros:
    * The CRD can be a separate entity.
    * Migration can be easily implemented in the job. 
    * The CRD is not subject to the Helm limitations.

  - Cons:
    * Jobs are troublesome to debug.
    * The CRD is not listed as a part of Helm release.

## Moving resources between charts

Moving resources, such as ConfigMaps, Deployments, CRDs, and others from one chart to another is problematic as it causes Kyma to lose backward compatibility. The deployment in which the CRD is moved cannot be upgraded to a newer version.  

The `ABC` CRD is part of the `YYYY` chart in the 0.6 release. That CRD is moved to the `ZZZZ` chart in the 0.7 release. Kyma cannot apply changes to the `ZZZZ` chart because its CRD, `ABC`, exists in the 0.6 version as a part of the `YYYY` chart.  
 
To avoid these problems, rename your resources when you move them from one chart to another. 
>**NOTE:** Using this approach removes the old resource and creates a new one. 

When a CRD is deleted, all of the associated implementations are removed, which may cause the user to lose data. Because of this risk, migrate the CRDs instead of simply moving them between charts. Follow this procedure:

1. Backup all existing implementations. 
2. Remove the old CRD.
3. Run the upgrade.
4. Restore all CRD implementations. 