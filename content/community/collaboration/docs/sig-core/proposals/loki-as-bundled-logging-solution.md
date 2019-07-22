# Loki as bundled logging solution

Created on 2019-01-28 by Andreas Thaler (@a-thaler).

## Status

Proposed on 2019-01-28

## Motivation
Kyma should provide a "batteries-included" solution for logging. Such a solution must be very lightweight as it must run in-cluster and should work for a local development. The current approach is to use [OK Log](https://github.com/oklog/oklog), which is fulfilling the main criteria, but unfortunately its development has been discontinued and it also lacks many user experience features.

## Goal
Replace OK Log with a solution which is:
- lightweight in resource consumption (in-cluster local development support)
- easy to operate even when scaling up the cluster
- able to query recent logs for a Pod in a user-friendly way
- maintained and further developed by a community

## Proposal
Replace OK Log with [Loki](https://github.com/grafana/loki) by:
- Adjusting the logging Helm chart to deploy the Loki service and the promtail DaemonSet instead of OK Log service and the Logspout DaemonSet.
- Enabling Grafana's experimental feature to enable the new explorer and integration with Loki as the data source.

## Details
Loki is a new project by Grafana Labs and aims to provide a similar solution for logging as Prometheus does for monitoring.
It uses a similar approach as the OK Log by indexing on the metadata level instead of performing full-text indexing. Additionally, it is leveraging the existing labels of Prometheus and Kubernetes and it integrates with Grafana out-of-the-box (an experimental feature for now).

Apart from the OK Log and Loki there was no other alternative covering the described requirements.
OK Log should be replaced with Loki because:
- It has an active development community.
- It leverages the existing labels, thus providing a much better search experience.
- It provides an improved graphical user interface as a result of integration with Grafana. 

