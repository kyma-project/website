# DR 008: DEX as an OIDC authenticator

Created on 2018-03-01 by Damian Pacierpnik (@damianpacierpnikatsap).

## Context

Although Kubernetes manages service accounts, the solution leaves the management of regular users to an independent, outside service.
For this reason, Kyma needs an authentication provider for end-users.

Kubernetes has the following requirements for authentication providers:
- The authentication provider must support the [OpenID connect discovery](https://openid.net/specs/openid-connect-discovery-1_0.html).
- The authentication provider must run in TLS with non-obsolete ciphers.
- The authentication provider must support CA-signed certificates, even for commercial and self-signed CAs.

The solution must also fulfill the general platform requirements:
- It must be a cloud-native solution.
- It must be lightweight, preferably written in GoLang.
- It must be open-source, with the ability to contribute to the project development.

Additionally, the solution must allow to delegate authentication to SAML2-compliant Identity Providers.

## Decision

The decision is to use [Dex](https://github.com/coreos/dex) as an authentication provider for end-users in Kyma.

## Status

Accepted on 2018-03-01.

## Consequences

Dex is a lightweight application written in GoLang.

Using connectors, Dex supports both the OIDC- and SAML2-compliant Identity Providers. Dex does not have its own user database, and therefore requires at least one connector to work in the production
environment. The solution supports static users but, as it is not a completely secure method of user management, it should be used for test purposes only.
When you register multiple connectors in Dex, it is not possible to automatically select the desired connector. In such case, Dex prompts the user to choose the desired connector.
An improvement has been proposed to allow Dex choosing a default connector but the pull request to the Dex project was rejected.

Although some of the Kyma team's pull requests were rejected, the team contributed to the Dex project.
After some discussion, the team managed to introduce [this](https://github.com/coreos/dex/issues/1087) change.

Finally, Dex is designed to work with Kubernetes and is also one of the authentication solutions
recommended in the [Kubernetes documentation](https://kubernetes.io/docs/admin/authentication/#configuring-the-api-server).
