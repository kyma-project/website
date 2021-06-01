---
title: Style and terminology
---

These are the guidelines for the grammar, preferred word choices, and the list of terms to capitalize when writing Kyma documentation. The goal of these guidelines is to have all contributors write in the same way to ensure a uniform flow throughout the whole Kyma documentation.

## Grammar

These are the generally accepted grammar rules for writing Kyma documentation.

### Active voice

Use active voice whenever possible. Active voice is clear, concise, and it avoids misinterpretation. It is also easier for non-native speakers to understand. Passive voice is indirect, uses more words, and can be misleading because it reverses the logical order of events.

✅ The endpoint path includes your service name.   
⛔️ Your service name is to be included in the endpoint path.

### Voice and tone

There are different tones for different types of technical documentation. The documentation can range from instructional to somewhat conversational, but always with the goal of helping users understand how to use the product for practical purposes and, in blogs and release notes, also helping business users understand changes. While writing Kyma documentation, use semi-formal style and imperative mood. The imperative mood tells the reader directly to do something. Use the imperative mood to write instructional documentation such as procedures and tutorials. Other moods can imply optional behavior.

> **NOTE:** Avoid using unnecessary words such as "please" or "remember."

✅ Click **Add**.  
✅ Click the **Add** button.  
⛔️ Please, click **Add**.    
⛔️ Remember to click **Add**.

✅ Click **Upload** and select one or more documents.  
⛔️ If you want to upload a document, you can click **Upload**.


### Tenses

Use present tense. In technical writing, present tense is easier to read than past or future tense. Simple verbs are easier to read and understand than complex verbs, such as verbs in the progressive or perfect tense. The more concise and straightforward you are, the better.

✅ If the information does not match, an error message **appears**.  
⛔️ If the information does not match, an error **will appear**.

### Pronouns

Use the second person and the pronouns "you," "your," and "yours" to speak directly to the reader. Do not use the first person pronouns "we," "us," or "let's."

### Contractions

Do not use contractions in the documentation. They may be difficult for non-native English speakers to understand. Specifically, do not use the following:

⛔️ Any "will" contractions, such as "you’ll" or "we’ll."  
⛔️ Any "would" contractions, such as "we’d" or "you’d."   
⛔️ Any contractions that sound like other words, such as "they’re" (there), "it’s" (its), or "you’re" (your).   
⛔️ Avoid using contractions for negative imperatives such as "don’t." Instead, use "do not," which has more power.

### Articles

Always verify the use of the articles "a", "an", and "the" where appropriate. Use "the" when you refer to a specific example. Use "a" when you refer to something non-specific or hypothetical.

> **NOTE:** Use `Kyma` whenever you refer to the name of our product:   
✅ Kyma is awesome.  
⛔️ The Kyma is not awesome.

### Punctuation

Use colons and semicolons sparingly. Use the colon ( : ) to introduce a list of things. The semicolon ( ; ) separates two distinct clauses within one sentence. The phrase after a semicolon is a complete sentence. However, the preferred method is without a colon or semicolon.

Use serial commas. A missing serial comma can create confusion about whether the statement applies to each list item individually, or whether the last two items are connected.

✅ In your request, include the values for the request date, name, and ID.   
⛔️ In your request, include the values for the request date, name and ID.

Avoid using parenthesis. Use lists instead, to make your sentences as simple as possible.

✅ Consider which tasks, such as unit tests, linting, and compilation, are relevant and necessary for your example.  
⛔️ The author of each example should consider which tasks (i.e. unit tests, linting and compilation) are relevant and necessary for their example.

## Terminology

Here is the preferred terminology to use in the Kyma documentation:

* Use American English spelling, not British English.   
  ✅ The **color** of the message changes from blue to red if there are errors.  
  ⛔️ The **colour** of the message changes from blue to red if there are errors.

* "application," not "app"
* "repository," not "repo"
* "document," not "doc"
* "as shown in the example," not "below," nor "above"  
✅ In your request, supply the values as shown in the example:   
✅ In your request, supply the values for the following parameters:    
⛔️ In your request, supply the values as shown below:

* "backend,"  not "back end" or "back-end"
* "frontend," not "front end" or "front-end"
* “micro frontend,” not “microfrontend” or “micro front-end”
* "email," not "e-mail"
* "fill in," not "complete"
* "ID," not "id"
* "for example," not "e.g."    
Don't use "e.g." in documentation. Use the words "for example" or "such as" instead. Don't use "for example" in the middle of the sentence.   
✅ There are many variables in the file. For example, you can configure the host ID.   
✅ There are some variables that are inherited from the parent process, such as user ID, date, and permissions.   
⛔️ There are many variables in the file, for example, user ID, that can be configured.  

* "key-value," not "key/value," nor "key:value"
* "YAML" (file formats) or "`.yaml`" (file extensions), not "yaml"
* "can," not "it is possible"
* "must," not "should"
* "single sign on (SSO)," not "single sign-on"
* "typically," not "usually"
* "using," not "via"
* "run," not "execute"
* "API Micro Gateway," not "API Gateway"
* "connect/connection," not "integrate/integration"
* "custom resource," not "Custom Resource" nor "CustomResource"
* "Application" to describe an external solution connected to Kyma through the Application Connector, "application" to describe software
* "cloud-native" (adjective), not "cloud native"
* "ProwJob" (resource) or "Prow job" (process), not "Prowjob/prowjob"

> **NOTE:** Do not use words such as "currently" or "now" to indicate that something is in the transitional phase of development. Avoid promising anything and mention only those components and functionalities that are already in use.

### Command line arguments

Use short command line arguments whenever possible.

* `-n`, not `--namespace`

 Short command line arguments can differ between the tools as shown in the following example:

* Kubernetes: `kubectl -n` equals `kubectl --namespace`
* Helm: `helm -n` equals `helm --name`, not `helm --namespace`

In such a case, explain the context in the document.

## Capitalized terms

This is the list of the Kubernetes resources capitalized in Kyma documentation. However, if these words are not used in relation to Kubernetes resources, do not capitalize them.

- ConfigMap
- CronJob
- CustomResourceDefinition
- Deployment
- Function
- Event
- Ingress
- Namespace
- Node
- PodPreset
- Pod
- ProwJob
- Secret
- Service
- ServiceBinding
- ServiceClass
- ServiceInstance

All of the Kyma components, such as the Service Catalog or Service Brokers, are capitalized as well. Whenever you point to the outside sources, do some search to check whether the name of the source starts with a capital letter or not.

>**NOTE:** Kubernetes itself is also capitalized. Do not write it in lowercase or in the abbreviated version.       
  ✅ Kubernetes  
  ⛔️ kubernetes   
  ⛔️ k8s

In case of any further doubts concerning the style and standards of writing, see [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/welcome/).
