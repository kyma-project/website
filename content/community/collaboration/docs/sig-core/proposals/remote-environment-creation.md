# Creating Remote Environment from UI and Command Line

Created on 2018-09-04 by Szymon Gibała (@Szymongib)

## Status

Proposed on 2018-09-04

## Motivation

The only way for Kyma users to create a new Remote Environment is by Helm, which is not the most convenient way. The creation of new Environment should be easy and should not require any other tools like Helm.

Moreover, users have very limited abilities to differentiate between connected Remote Environments. The only ways to distinguish them are fields `Name` and `Description`, which might not be sufficient for users with a large number of connected solutions.


## Goal

The goal is to enable users to manipulate Remote Environments form UI as well as command line and add custom labels configured by users for easier differentiation between the solutions which would make browsing through them more user-friendly.


## Current solution

Currently creating Remote Environment is done in following steps:
- install Helm
- download Remote Environment Helm chart
- install chart

The solution is not at all intuitive, requires diving into documentation. Also when the chart changes users have to download new version before installing. 

Distinguishing of the Remote Environments is done by the following fields:
- name
- description
- source
    - environment
    - type
    - namespace

The approach is very limited and might not be sufficient for some users and different types of solutions.


## Suggested solution

The suggested solution is to make it possible to manipulate Remote Environments for Kyma UI as well as command line and also replace `source` fields with custom labels provided by the user. The deployment will be handled by the Remote Environment Controller so the user will not need to use Helm directly.

The following fields would be present in Remote Environment:
- name
- description
- labels
    - Key1:Value1
    - Key2:Value2
    - ...

Users could provide any number of custom labels which would make it easier to distinguish between connected solutions and possibly allow easier browsing and searching through them.

The UI and command line would make it possible to manipulate Remote Environments. The following operation would be possible:
- Create - Creates new RE with provided options
    - name
    - description
    - labels
- Update - Update the following fields of RE
    - description
    - labels
- Delete - Deletes the RE
