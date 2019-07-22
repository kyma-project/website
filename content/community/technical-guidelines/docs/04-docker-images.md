---
title: Docker images
---

This document provides guidelines for the Docker image provided in the context of Kyma.

## Naming and structure guidelines

Place images in the Kyma Docker registry located at `eu.gcr.io/kyma-project`. For development and proof of concepts, use the following location: `eu.gcr.io/kyma-project/snapshot`.

All images use the following attributes:
- an image name which is the same as the related project. Do not use prefixes. If the image requires sub-modularization, append it as in "istio-mixer"
- a tag with a semantic version number, like `0.3.2`

Assume an initializer image for the Helm Broker extension. This is the example of the location and the name of the image:

```
eu.gcr.io/kyma-project/helm-broker-initializer:0.1.0
```

## Base images

Base all images on an image that is as small as possible in size and dependency. A base image must have a specified version. Do not use the `latest` tag.

An application based on Golang should originate from a `scratch` image. If a `scratch` image does not have the specific tooling available, you can use an `alpine` base image having the package catalog updated.
A JavaScript-based application should originate from an `nginx-alpine` base image with an updated package catalog.

## Label images

All images use the `source` label with a link to the GitHub repository containing the sources.

Define labels as in the following example:

```
source = git@github.com:kyma-project/examples.git
```

## Examples

Golang from scratch:
```
FROM scratch
LABEL source=git@github.com:kyma-project/examples.git

ADD main /
CMD ["/main"]
```

Golang from alpine:
```
FROM alpine:3.7
RUN apk --no-cache upgrade && apk --no-cache add curl

LABEL source=git@github.com:kyma-project/examples.git

ADD main /
CMD ["/main"]
```

JavaScript from nginx:
```
FROM nginx:1.13-alpine
RUN apk --no-cache upgrade

LABEL source=git@github.com:kyma-project/examples.git

COPY nginx.conf /etc/nginx/nginx.conf
COPY /build var/public

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```
