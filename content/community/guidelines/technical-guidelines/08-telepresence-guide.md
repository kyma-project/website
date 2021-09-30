---
title: Using Telepresence for local Kyma development
---

This document is a general guide to local development with [Telepresence](https://www.telepresence.io/).

Certain Kyma components store their state in Kubernetes custom resources and, therefore, depend on Kubernetes.    
Mocking the dependency and developing locally is not possible, and manual deployment on every change is a mundane task.  

Telepresence is a tool that connects your local process to a remote Kubernetes cluster through proxy, which lets you easily debug locally.  
It replaces a container in the specified Pod, opens up a new local shell, and proxies the network traffic from the local shell through the Pod. 

Telepresence enables you to make HTTP requests from your local machine to services in the cluster that are not exposed outside. When you run a server in this shell, other Kubernetes services can access it. 

To start developing with Telepresence, follow these steps:
> **NOTE**: This guide was tested on version `0.101`.

1. [Install Telepresence](https://www.telepresence.io/reference/install).

2. Run Kyma locally or connect to a remote cluster. Then, configure your local kubectl to use the desired Kyma cluster. 

3. To check the container name of the deployment to swap, run:

	```
	kubectl get deployment {DEPLOYMENT_NAME} -o jsonpath='{.spec.template.spec.containers[0].name}'
	```

4. Run this command to swap the deployment: 

	```
	telepresence --namespace {NAMESPACE} --swap-deployment {DEPLOYMENT_NAME}:{CONTAINER_NAME} --run-shell
	```

5. Every Kubernetes Pod has the directory `/var/run/secrets` mounted. The Kubernetes client uses it in the component services. By default, Telepresence copies this directory. It stores the directory path in `$TELEPRESENCE_ROOT`, under the Telepresence shell. The `$TELEPRESENCE_ROOT` variable unwinds to `/tmp/...`. Move it to `/var/run/secrets`, where the service expects it. To move it there, create a symlink:
	```
	sudo ln -s $TELEPRESENCE_ROOT/var/run/secrets /var/run/secrets
	```

6. Run `CGO_ENABLED=0 go build ./cmd/{COMPONENT-NAME}` to build the component and give all Kubernetes services that call the component access to this process. The process runs locally on your machine. Use the same command to run various Application Connector services.
