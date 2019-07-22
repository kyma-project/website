# Kyma Installer - dynamic installation 

Created on 2018-08-23 by Krysian Cieślik (@crabtree) and Jakub Kabza (@jakkab).
This document is a part of the [Kyma modularization proposal](./modularization.md).

## Status

Proposed on 2018-08-23.

## Motivation

Kyma installation is a complex, time-consuming process, involving multiple components. The procedure is followed every day by a large number of developers who test their features, and thus should easily handle different scenarios without modifications. This is where the dynamic installation comes in handy, unifying, simplifying and automating the process.

## Goal

This proposal aims to enhance developer experience by:

- extending installation customizability 
- reducing the number of different installation methods
- avoiding redundant modifications to the Installer component

## Current solution

Kyma installation:

- consists of hard-coded steps
- uses a variety of installation methods throughout the process, such as custom shell scripts, Helm, and kubectl commands
- stores overrides in a fixed struct that requires code modifications every time new parameter is introduced

All things considered, the installation process lacks coherence and leaves little room for customization, requiring constant maintenance at the same time.

## Suggested solution

- Installer is a component that handles installation, update, and deletion of Helm charts.
- Installer no longer allows Bash scripts as a method of installing Kyma components. Bash scripts used to trigger the installation and prepare the cluster remain unaffected.
- In order to increase security, Docker container used to run Installer does not feature Bash at all.
- Installer is provided with a descriptive and comprehensible list of Kyma components, specified in the `kyma-installation` custom resource.
- The list is declarative. It is for the user to decide which components will be installed.
- Each component on the list is identified by its name and Namespace.
- Installer handles dependencies between components basing on an order in a flat list.
- Installer is provided with Helm overrides by means of ConfigMaps and Secrets. Values are no longer passed via environment variables or stored in rigid objects.
- A map-like file with components versions is loaded to Installer.