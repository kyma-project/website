---
title: Authorization
type: Details
---

Kyma Environment Broker provides OAuth2 authorization. For this purpose, Kyma Environment Broker uses the [ApiRule](https://github.com/kyma-project/kyma/blob/master/docs/api-gateway-v2/06-01-apirule.md) custom resource which generates a [VirtualService](https://istio.io/docs/reference/config/networking/virtual-service/) and uses  [Oathkeeper Access Rules](https://www.ory.sh/docs/oathkeeper/api-access-rules) to allow or deny access.
To authorize with the Kyma Environment Broker, use an OAuth2 client registered through the [Hydra Maester controller](https://github.com/ory/k8s/blob/master/docs/helm/hydra-maester.md).

To access the Kyma Environment Broker endpoints, use the `/oauth` prefix before OSB API paths. For example:

```shell
/oauth/{region}/v2/catalog
```

You must also specify the `Authorization: Bearer` request header:

```shell
Authorization: Bearer {ACCESS_TOKEN}
```

## Get the access token

Follow these steps to obtain a new access token:

1. Export these values as environment variables:

  - The name of your client and the Secret which stores the client credentials:

    ```bash
    export CLIENT_NAME={YOUR_CLIENT_NAME}
    ```

  - The Namespace in which you want to create the client and the Secret that stores its credentials:

    ```bash
    export CLIENT_NAMESPACE={YOUR_CLIENT_NAMESPACE}
    ```

  - The domain of your cluster:

    ```bash
    export DOMAIN={CLUSTER_DOMAIN}
    ```

2. Create an OAuth2 client:

```bash
cat <<EOF | kubectl apply -f -
apiVersion: hydra.ory.sh/v1alpha1
kind: OAuth2Client
metadata:
  name: $CLIENT_NAME
  namespace: $CLIENT_NAMESPACE
spec:
  grantTypes:
    - "client_credentials"
  scope: "broker:write"
  secretName: $CLIENT_NAME
EOF
```

3. Export the credentials of the created client as environment variables. Run:

```shell
export CLIENT_ID="$(kubectl get secret -n $CLIENT_NAMESPACE $CLIENT_NAME -o jsonpath='{.data.client_id}' | base64 --decode)"
export CLIENT_SECRET="$(kubectl get secret -n $CLIENT_NAMESPACE $CLIENT_NAME -o jsonpath='{.data.client_secret}' | base64 --decode)"
```

4. Encode your client credentials and export them as an environment variable:

```shell
export ENCODED_CREDENTIALS=$(echo -n "$CLIENT_ID:$CLIENT_SECRET" | base64)
```

5. Get the access token:

```shell
curl -ik -X POST "https://oauth2.$DOMAIN/oauth2/token" -H "Authorization: Basic $ENCODED_CREDENTIALS" -F "grant_type=client_credentials" -F "scope=broker:write"
```
