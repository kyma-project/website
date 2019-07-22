# Application Connector support for OData services

Created on 2018-09-03 by Lukasz Szymik (@lszymik)

## Status

Proposed on 2018-09-03

## Motivation

The Application Connector is supporting only Rest API with OAuth tokens. The other authentication and support for OData must be added.

## Goal

The Application Connector must support registration and proxying to the OData APIs.
That is description how we would like to integrate OData with Application Connector.

The following items must be added:

- Registration of OData API in the Metadata API
- Proxying to OData API with different authentication mechanisms

## Suggested solution

### API Registration

The Metadata service will be extended with the possibility to register OData API. Therefore, the following changes will be introduced:

- Current registration of API will be the same with inlined API specification (an in-line version has higher priority).
- Registration of API with `specUrl` will be added. If `spec` fields is not given, the API definition will be downloaded from `specUrl`.
- API registration will have an additional optional field type, where a user will be able to mark API as OData one or classic REST API. Type can be stored in tags field which is already part of the RE CRD.
- if the type is provided then the API specification will be fetched from `specUrl` or an in-line version will be used for REST and fetching the $metadata will be used for OData API
- If the type is not provided and there is no `spec` or `specUrl` given, the Metadata service will do a lookup to the API URL/$metadata and automatically set the API type to OData one. OData registration will not have specification fields.
- OData specification will be stored in Minio and need to have the FQ'ed URLs amended to the Gateway specific ones.
- Implementation must not introduce any breaking changes for already implemented integrations.

#### API snippet

Example API calls with an OData API or a Rest API.

```json
...
"api": {
        "targetUrl": "https://example/odata",
        "type" : "odata",
```

```json
...
"api": {
        "targetUrl": "https://example.com/rest/v2",
        "specUrl": "https://example.com/rest/v2/apiSpec.json"
        ...
```

### OData Specification in Service Catalog

The Service Catalog UI must be extended with possibility to display OData API specification.

### Additional authentication

The additional support for a different authentication will be added to the Application Connector:

- Client certificates (pkcs#12 (PFX), PEM)
- Basic auth (for a development mode only, not production)

#### OAuth token

The OAuth authentication configuration will be the same.

``` json
"api": {
        "targetUrl": "https://electronics.playground.cluster.kyma.cx/rest/v2",
        "credentials": {
            "oauth": {
                "url": "https://electronics.playground.cluster.kyma.cx/authorizationserver/oauth/token",
                "clientId": "********",
                "clientSecret": "********"
            }
        },
```

#### Client certificate as PKCS

The client certificate as PKCS will be registered as base64 encoded string.

``` json
"api": {
        "targetUrl": "https://electronics.playground.cluster.kyma.cx/rest/v2",
        "credentials": {
            "pkcs": "PKCS certificate base64 encoded"
        },
        ...
```

#### Client certificate as PEM file

The client certificate as PEM will be registered as base64 encoded string.

``` json
"api": {
        "targetUrl": "https://electronics.playground.cluster.kyma.cx/rest/v2",
        "credentials": {
            "pem": "PEM certificate base64 encoded"
        },
        ...
```

#### Basic auth

The basic auth credentials will be provided as `username` and `password` fields. Pretty similar to the OAuth case.

``` json
"api": {
        "targetUrl": "https://electronics.playground.cluster.kyma.cx/rest/v2",
        "credentials": {
            "basic": {
                "username": "********",
                "password": "********"
            }
        },
        ...
```