---
title: "Kyma 2.0 migrator tool is no longer hosted as part of Kyma runtime"
author:
  name: "Krzysztof Kwiatosz and Grzegorz Karaluch"
tags:
  - kyma
  - busola
  - migrator
redirectFrom:
  - "/blog/busola-migrator-note"
---

With Kyma 2.0, Kyma Dashboard is no longer a local component of the Kyma runtime. Instead, it is a centrally hosted service that can be accessed by referencing Kyma Service Instance ID, as a path parameter in the Kyma Dashboard URL, for example, `https://dashboard.kyma.cloud.sap/?kubeconfigID={KYMA_SERVICE_INSTANCE_ID}`.

<!-- overview -->

Before 2.0, Kyma used XSUAA instance for user authentication and authorization, and your roles were assigned through role collections in SAP BTP cockpit. As of [version 2.0](../2021-12-07-release-notes-2.0/index.md), Kyma uses the [OIDC Identity Provider](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/85200d8509004236b2a3a637bf1471a8.html?locale=en-US) (default or custom) to issue access tokens. Because of that, Kyma roles and role bindings must be redefined taking into account new identity subjects, as provided by the new Identity Provider.

## Important

In order to clean up the unused XSUAA instances (used for Kyma authorisation before 2.0 version) we have to disable the migrator tool that uses it. Therefore, the migrator tool is no longer installed on the new Kyma instances and is removed from the existing ones.

## Impact

The old Kyma Console URL from your Kyma instance is no longer working. Please update your bookmarks to point to the centrally hosted Kyma Dashboard. For more information, see the [Kyma Console URL Responds with Not Found 404](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/d514c43c8250418c8ab8e7d4bd44f083.html?locale=en-US) troubleshooting guide.

If you have not migrated your permissions from XSUAA role collections using the migrator tool, you need to ask the Kyma runtime administrator to assign you a proper role in Kyma runtime. To learn more, visit the [Forbidden Access to Kyma](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/a779e5107dbb49a78b77c11f0f39e4ac.html?locale=en-US) troubleshooting guide.