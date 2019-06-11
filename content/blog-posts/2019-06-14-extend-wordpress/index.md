---
title: "How to build cloud-native extension for Wordpress - part 1"
author:
  name:  "Piotr Bochynski, Product Owner @Kyma"
tags:
  - release
redirectFrom:
  - "/blog/2019-06-14-extend-wordpress"
---

Cloud Native application development is now the hot topic in the industry. Developers want to use modern languages, write micro-services or even serverless functions. They want easy scalability with modern monitoring tools like Prometheus and Grafana. Kubernetes and CNCF landscape projects are no longer perceived as a hype for early adopters. This is the mainstream now.

If you start a new, green field project you are lucky - you can dive into the great variety of tools and frameworks and use them. But how to pick the right tools? At the moment of writing this post, there is 686 projects registered in the [CNCF landscape](https://landscape.cncf.io/).

We have also less lucky developers, that still has to deal with the applications designed when monoliths where cool. What about them? Can they benefit from Cloud Native patterns? Yes, they can!
<!-- overview -->

# Imagine your legacy application
You probably have some applications you have to integrate with or extend it features, but you are not happy with it.You can have different reasons:
- it requires writing code in the language you don't know, and you want to use only Golang or JavaScript
- it is possible to add new feature to the application but requires complex redeployment process which is risky
- you just don't want to touch it because it is fragile and adding anything can make it unstable
- you want to write extension which can be scaled independently of the application

# Wordpress as an example
I prepared some example to help your imagination. The simple scenario with Wordpress as a legacy application. Imagine you are running some commerce site and you created a blog with product reviews and tests based on Wordpress. Now you want to engage your customers and you enabled comments in your blog posts. Users should see their comments immediately published, but you don't have time to moderate the content. The idea is to publish only positive comments automatically, and send send other comments to some channel where customer service can react (slack channel will be used for that).

You could use Wordpress hook `comment_post` and implement a plugin in PHP. But it won't work for me. I don't know PHP, and my team mates don't either. I would like to use external systems (text analytics, slack, maybe more int he future), and I don't want to deal with secrets and authorization flows in Wordpress side. Additionally, I want to utilize all modern DevOps practices and patterns, like [12 Factor App](https://12factor.net). In other words: me and my team want to do cool, cloud native stuff on top of Kubernetes, instead of be wordpress maintainers.

Of course in this simple scenario, microservices, Kubernetes, service mesh, and other tools would be overkill, but real world use cases are more complex, and you can imagine how this initial flow can grow in the future.

# Implementation plan

Let's implement and deploy our example. I will use:
- Kubernetes cluster from Google Kubernetes Engine to deploy both Wordpress and my code.
- KNative eventing and NATS as a messaging middleware to decouple Wordpress from my extension
- Istio service mesh together with Prometheus, Grafana and Jaeger to get monitoring and tracing
- Kubeless as serverless engine for my code
- Grafana Loki for keeping logs
- Service Catalog, Wordpress Connector for Kyma and Kyma Application Broker to bind Wordpress API and Events to my code

# Installation
From the list above you can expect long installation process, but I will use Kyma operator that will do it for me. All you need before, is Google Account and GCP Project. If you don't have one you can create it and additionally Google will give you $300 credit for running your cluster.

## Prepare the GKE cluster with Kyma
Follow the [installation guide](https://kyma-project.io/docs/1.2/root/kyma/#installation-install-kyma-on-a-cluster) for GKE or just execute the following commands (replace placeholders with proper values):

```sh
# Set ENV variables, see sample values in comments:
export KYMA_VERSION={KYMA_RELEASE_VERSION}      # 1.2.0-rc1
export CLUSTER_NAME={CLUSTER_NAME_YOU_WANT}     # kyma-cluster
export GCP_PROJECT={YOUR_GCP_PROJECT}           # myproject
export GCP_ZONE={GCP_ZONE_TO_DEPLOY_TO}         # europe-west1-b

# Create cluster
gcloud container --project "$GCP_PROJECT" clusters \
create "$CLUSTER_NAME" --zone "$GCP_ZONE" \
--cluster-version "1.12" --machine-type "n1-standard-4" \
--addons HorizontalPodAutoscaling,HttpLoadBalancing

# Add current user as admin
gcloud container clusters get-credentials $CLUSTER_NAME --zone $GCP_ZONE --project $GCP_PROJECT
kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value account)

# Install tiller
kubectl apply -f https://raw.githubusercontent.com/kyma-project/kyma/$KYMA_VERSION/installation/resources/tiller.yaml

# Install Kyma
kubectl apply -f https://github.com/kyma-project/kyma/releases/download/$KYMA_VERSION/kyma-installer-cluster.yaml

# Show Kyma installation progress (stop the script with Ctrl+C, when installation is done)
while true; do \
  kubectl -n default get installation/kyma-installation -o jsonpath="{'Status: '}{.status.state}{', description: '}{.status.description}"; echo; \
  sleep 5; \
done
```

## Access Kyma

The simple installation guide we followed uses self-signed certificates and xip.io domain. Such certificate will be rejected by your browser so you have to set it as trusted. 
```sh
# After the installation, add Kyma self-signed certificate to the trusted certificates (MacOS):
tmpfile=$(mktemp /tmp/temp-cert.XXXXXX) \
&& kubectl get configmap net-global-overrides -n kyma-installer -o jsonpath='{.data.global\.ingress\.tlsCrt}' | base64 --decode > $tmpfile \
&& sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $tmpfile \
&& rm $tmpfile
```

Then you can go to Kyma Console URL, and login with the provided credentials:
```sh
echo 'Kyma Console Url:'
echo `kubectl get virtualservice core-console -n kyma-system -o jsonpath='{ .spec.hosts[0] }'`

echo 'User admin@kyma.cx, password:'
echo `kubectl get secret admin-user -n kyma-system -o jsonpath="{.data.password}" | base64 --decode`
```
The result should be something like this:
```console
Kyma Console Url:
console.1.2.3.4.xip.io
User admin@kyma.cx, password:
Eca23NyShqwK
```
## Wordpress installation
If you already have wordpress installed you can go to the next step. If not you can easily deploy wordpress with few clicks in Kyma console.
First, create namespace for wordpress.  Then download the wordpress deployment file: [wordpress-deployment.yaml](wordpress-deployment.yaml) (it is recommended to change the `mysql-pass` secret). Then go to the namespace wordpress and click **Deploy new resource to the namespace** link, and select wordpress-deployment.yaml file from your disk.

If you prefer you can do the same from command line (assuming that your current Kubernetes context is set to the Kyma cluster):
```sh
# Create namespace
kubectl create namespace wordpress

# Deploy wordpress (master)
kubectl -n wordpress apply -f https://raw.githubusercontent.com/kyma-project/website/master/content/blog-posts/2019-06-14-extend-wordpress/wordpress-deployment.yaml

```
Wait few seconds until wordpress starts. You can check the status in Deployments section:

When all deployments are in the running state navigate to [https://wordpress.1.2.3.4.xip.io]() (replace IP 1.2.3.4 with the one for your cluster), and finish installation wizard. 

## Kyma plugin for Wordpress

Before you install plugins ensure that you have proper configuration of Permalinks. Log into Wordpress as admin, go to Settings -> Permalinks, select `Post name` option and save changes.
Now download and install (Plugins -> Add new -> Upload plugin), and activate these 2 plugins:
- [Basic Auth](https://github.com/WP-API/Basic-Auth/archive/master.zip) - for more details go for [GitHub repository](https://github.com/WP-API/Basic-Auth)
- [Kyma Connector](https://github.com/kyma-incubator/wordpress-connector/archive/master.zip) - for more details go for [GitHub repository](https://github.com/kyma-incubator/wordpress-connector)

Go to Settings -> Kyma Connector, uncheck Verify SSL option (you need it because default Kyma installation uses self-signed certificates), and provide username and password you created during installation, and save changes. 

# Connect Wordpress to Kyma

In this step you will establish trusted connection between Wordpress instance and your Kubernetes cluster. You will also register Wordpress API and Wordpress Events in Service Catalog, and enable both in selected namespace.

In Kyma console navigate back to home and go to Applications, and create new one named `wordpress`.

Open it and press Connect Application link. Copy connection token URL to the clipboard. Go to wordpress Kyma Connector Settings, and paste token URL in Kyma Connection field, and press Connect button. You should see the success message in wordpress and you should see new entry inside Provided Services & Events section of worpdress application in Kyma.

## Diasable SSL for Kyma->Wordpress

Wordpress installed in cluster also uses self-signed SSL certificate. Kyma default settings will not allow for such connection. You need to turn it on explicitly:

  1. Edit the `wordpress-application-gateway` Deployment in the `kyma-integration` Namespace. Run:
      ```
      kubectl -n kyma-integration edit deployment wordpress-application-gateway
      ```
  2. Edit the Deployment in Vim. Select `i` to start editing.
  3. Find the **skipVerify** parameter and change its value to `true`.
  4. Select `esc`, type `:wq`, and select `enter` to write and quit.

One command to do it:
```sh
# Update kyma installer image to 1.1.0
kubectl -n kyma-integration \
  patch deployment wordpress-application-gateway --type=json \
  -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/args/6", "value": "--skipVerify=true"}]'
```
*Be careful! The command assumes that skipVerify is the argument with index 6 (0-based).*

# Enable Wordpress Events and APIs in default namespace

Application connector can expose APIs and Events (Async API) of the application in Service Catalog. To show Wordpress in the Service Catalog you need to first bind application to selected namespace. In the wordpress application create binding and select default namespace. Now you can go to the default namespace and open Catalog - you should see Wordpress API in the Services tab. Open it and have a look at API console and Events specification. We will react on `comment.post.v1` event and will interact with `/wp/v2/comments/{id}` API. To make them available in the default  namespace click **Add once** button and create instance of wordpress Service Class. Application Connector behind the scenes creates application gateway (kind of proxy) that is forwarding requests from bounded services or functions to the Wordpress instance. 

# Write your code
You did the wiring, so let's write some code. In the default namespace create new Lambda named local-review and paste in the editor following code:
``` javascript
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const axios = require("axios");

module.exports = {
    main: async function (event, context) {
        let status = "hold";
        console.log("Event data: %s",JSON.stringify(event.data));
        let comment = await getComment(event.data.commentId);
        console.log("Comment: %s",comment.content.raw);
        let result = sentiment.analyze(comment.content.raw);
        console.log("Sentiment: %s",JSON.stringify(result));
        let score = result.comparative;
        if (score>0.2) {
            status = "approved"
        } 
        updateComment(comment.id, status, comment.content.raw, score);
    }
};

async function getComment(id) {
    let commentUrl = `${process.env.WP_GATEWAY_URL}/wp/v2/comments/${id}?context=edit`
    let response = await axios.get(commentUrl);
    return response.data;
}

async function updateComment(id, status, comment, score) {
    let commentUrl = `${process.env.WP_GATEWAY_URL}/wp/v2/comments/${id}`;
    const update = await axios.post(commentUrl,{status:status, content:comment+"\n--\nscore:"+score});
    return update;
}
```

In the dependencies section add:
```json
{
  "dependencies": {
    "axios": "^0.19.0",
    "sentiment": "^5.0.1"
  }
}
```
Select trigger for your function - event `comment.post`, and save the function (the trigger is available because you have Wordpress Service Instance in the default namespace)

# Binding

Go to Service Management -> Instances, open wordpress instance in the Services tab. Click *Bind Application*, select *local-review* function, set namespace prefix to `WP_`, and confirm.
You can now open again local-review lambda and check if there is a new entry in Service Bindings section with WP_GATEWAY_URL environment variable.

# Test it

Go to Wordpress main site and open *Hello World!* blog post. Add there 2 comments:
- I love it!
- I hate it!
Refresh the page and you should see that both comments have score footer with the sentiment value (1 for positive and -1 for negative comment), and negative comment is waiting for moderation.

# Explore the benefits

Your code is running in Istio service mesh with the network secured by mutual TLS. You can see the metrics from your function (latency, responses, errors and memory usage) with one click on Grafana Dashboard. You can trace your requests using Jaeger. And you can scale your functions independently from Wordpress.

# Summary
Why should you try Kyma? If you start a new project on Kubernetes, you will get carefully selected, best tools from Cloud Native landscape, already configured and integrated. If you want to move only part of your project to the cloud and you have to keep legacy application around, Kyma will help you to build extension for them using modern tools on top of Kuberbetes.
Please remember that Kyma is actively developed open source project (~80 contributors and ~600 github stars) with the support from such big company as SAP. 

# Next steps

In the next blog post I will show you how use services from cloud providers using Open Service Broker API. 
