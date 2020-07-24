---
title: Deprovision Kyma Runtime using KEB
type: Tutorials
---

This tutorial shows how to deprovision Kyma Runtime on Azure using Kyma Environment Broker.

## Steps

1. Ensure that these environment variables are exported:

   ```bash
   export BROKER_URL={KYMA_ENVIRONMENT_BROKER_URL}
   export INSTANCE_ID={INSTANCE_ID_FROM_PROVISIONING_CALL}
   ```

2. Get the [access token](#details-authorization). Export this variable based on the token you got from the OAuth client:

   ```bash
   export AUTHORIZATION_HEADER="Authorization: Bearer $ACCESS_TOKEN"
   ```

3. Make a call to the Kyma Environment Broker to delete a Runtime on Azure.

   ```bash
   curl  --request DELETE "https://$BROKER_URL/oauth/v2/service_instances/$INSTANCE_ID?accepts_incomplete=true&service_id=47c9dcbf-ff30-448e-ab36-d3bad66ba281&plan_id=4deee563-e5ec-4731-b9b1-53b42d855f0c" \
   --header 'X-Broker-API-Version: 2.13' \
   --header "$AUTHORIZATION_HEADER"
   ```

A successful call returns the operation ID:

   ```json
   {
       "operation":"8a7bfd9b-f2f5-43d1-bb67-177d2434053c"
   }
   ```

4. Check the operation status as described [here](#tutorials-check-operation-status).
