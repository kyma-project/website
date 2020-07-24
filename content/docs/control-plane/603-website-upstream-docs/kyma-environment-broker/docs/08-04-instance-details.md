---
title: Check SKR instance details
type: Tutorials
---

This tutorial shows how to get the SKR instance details.

## Steps

1. Export the instance ID that you set during [provisioning](#tutorials-provision-kyma-runtime-using-keb):

   ```bash
   export INSTANCE_ID={SET_INSTANCE_ID}
   ```

> **NOTE:** Ensure that the BROKER_URL and INSTANCE_ID environment variables are exported as well before you proceed.

2. Make a call to the Kyma Environment Broker with a proper **Authorization** [request header](#details-authorization) to verify that provisioning/deprovisioning succeeded:

   ```bash
   curl --request GET "https://$BROKER_URL/oauth/v2/service_instances/$INSTANCE_ID" \
   --header 'X-Broker-API-Version: 2.14' \
   --header "$AUTHORIZATION_HEADER"
   ```

A successful call returns the instance details:

   ```json
   {
       "service_id": "47c9dcbf-ff30-448e-ab36-d3bad66ba281",
       "plan_id": "4deee563-e5ec-4731-b9b1-53b42d855f0c",
       "dashboard_url": "https://console.{DOMAIN}",
       "parameters": {
           "autoScalerMax": 3,
           "autoScalerMin": 1,
           "components": [],
           "machineType": null,
           "maxSurge": 1,
           "maxUnavailable": 1,
           "name": "test",
           "region": "westeurope",
           "targetSecret": "azrspn-ce-skr-dev-00001",
           "volumeSizeGb": 50,
           "zones": ["1", "2", "3"]
       }
   }
   ```

   > **NOTE:** The **dashboard_url** field is available only if the Runtime was provisioned successfully and the Runtime Agent registered the Runtime in the Director. Fields under the **parameters** field can differ depending on the provisioning input.
