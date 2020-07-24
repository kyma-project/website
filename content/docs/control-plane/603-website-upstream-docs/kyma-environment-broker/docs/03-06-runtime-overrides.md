---
title: Set overrides for Kyma Runtime
type: Details
---

You can set overrides to customize your Kyma Runtime. To provision a cluster with custom overrides, add a Secret or a ConfigMap with a specific label. Kyma Environment Broker uses this Secret and/or ConfigMap to prepare a request to the Runtime Provisioner.

Overrides can be either global or specified for a given component. In the second case, use the `component: {"COMPONENT_NAME"}` label to indicate the component. Create all overrides in the `kcp-system` Namespace.

See the examples:

- ConfigMap with global overrides:

    ```yaml
    apiVersion: v1
    kind: ConfigMap
    metadata:
      labels:
        provisioning-runtime-override: "true"
      name: global-overrides
      namespace: kcp-system
    data:
      global.disableLegacyConnectivity: "true"
    ```  

- Secret with overrides for the `core` component:

    ```yaml
    apiVersion: v1
    kind: Secret
    metadata:
      labels:
        component: "core"
        provisioning-runtime-override: "true"
      name: core-overrides
      namespace: kcp-system
    data:
      database.password: YWRtaW4xMjMK
    ```  

## Disable overrides for specific plans

ConfigMaps and Secrets overrides work for all plans, however, you can disable overrides for specific lite plans, such as `AzureLite`.
To disable a specific override for a lite plan, use the `default-for-lite: "true"` label.

See the example:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  labels:
    provisioning-runtime-override: "true"
    default-for-lite: "true"
  name: global-overrides
  namespace: compass-system
data:
  global.disableLegacyConnectivity: "true"
```  
    
This ConfigMap activates a global override for all plans except SKRs provisioned with a special plan marked as `lite`.
