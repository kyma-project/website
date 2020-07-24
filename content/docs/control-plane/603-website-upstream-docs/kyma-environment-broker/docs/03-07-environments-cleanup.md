---
title: Environments Cleanup
type: Details
---

Environments Cleanup is an application that cleans up environments that do not meet requirements in a given Gardener project.

## Prerequisites

Environments Cleanup requires access to:
- Gardener project of choice to filter Shoots without a proper label
- Database to get an Instance ID for each Runtime marked for deletion
- Kyma Environment Broker to trigger Runtime deprovisioning

## Configuration

The Environments Cleanup binary allows you to override some configuration parameters. You can specify the following environment variables:

| Environment variable                       | Description                                                                                                                        | Default value                                                            |
|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| **APP_MAX_AGE_HOURS**                          | Defines the maximum time a Shoot can live without deletion in case the label is not specified. The Shoot age is provided in hours. | `24h`                                                                    |
| **APP_LABEL_SELECTOR**                          | Defines the label selector to filter out Shoots for deletion. | `owner.do-not-delete!=true`                                                                    |
| **APP_GARDENER_PROJECT**                       | Specifies the name of a Gardener project.                                                                                                   | `kyma-dev`                                                               |
| **APP_GARDENER_KUBECONFIG_PATH**               | Specifies the kubeconfig path to a Gardener cluster.                                                                                      | `/gardener/kubeconfig/kubeconfig`                                        |
| **APP_DATABASE_USER** | Specifies the username for the database. | `postgres` |
| **APP_DATABASE_PASSWORD** | Specifies the user password for the database. | `password` |
| **APP_DATABASE_HOST** | Specifies the host of the database. | `localhost` |
| **APP_DATABASE_PORT** | Specifies the port for the database. | `5432` |
| **APP_DATABASE_NAME** | Specifies the name of the database. | `provisioner` |
| **APP_DATABASE_SSL_MODE** | Activates the SSL mode for PostgrSQL. See all the possible values [here](https://www.postgresql.org/docs/9.1/libpq-ssl.html).  | `disable`|
| **APP_BROKER_URL**                             | Specifies the Kyma Environment Broker URL.                                                                                         | `https://kyma-env-broker.kyma.local`                                     |
| **APP_BROKER_TOKEN_URL**                       | Specifies the Kyma Environment Broker OAuth token endpoint.                                                                        | `https://oauth.2kyma.local/oauth2/token`                                 |
| **APP_BROKER_CLIENT_ID**                       | Specifies the username for the OAuth2 authentication in KEB.                                                                       | None                                                                     |
| **APP_BROKER_CLIENT_SECRET**                   | Specifies the password for the OAuth2 authentication in KEB.                                                                       | None                                                                     |
| **APP_BROKER_SCOPE**                           | Specifies the scope for the OAuth2 authentication in KEB.                                                                          | None                                                                     |
