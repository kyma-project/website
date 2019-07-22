# Threat Modeling
This document presents the results of the threat modeling sessions.

The threat modeling was done in October 2018 in three sessions with Suleyman Akbas, Andreas Thaler, and a representative of the Kyma security team.

# Discussed topics
- Bringing the different systems into one picture
- Discussing every communication channel
- Identifying the assets that are worth protecting
- Identifying the required Secrets

# Assumptions
There is only one Prow cluster. If there are to be more installations, they need to be protected in a similar way.

# Working picture
The diagram presents an overview of the Prow architecture derived in the session:
![Working Picture](assets/landscape.JPG)

# Findings
- No blockers were identified.
- A dedicated cluster for job execution is recommended but not required for the first setup.
- Any external communication must be secured from the beginning, mainly the Ingress for Deck access and webhook calls.
- Secured internal communication is recommended but not required for the first setup.
- Secret management is fine using KMS.
- The `hmac` token needs to be increased to 32 bytes.
- Tokens should be rotated at least at the stage of the offboarding. It is required to prepare the offboarding checklist.
- Do not use a single technical service account for the Google Cloud access, but introduce dedicated service accounts for different scenarios.
- There should be only a few admin users mainly for operations, and no other roles or any kind of other access.
     - It requires that all configuration is done in the source code triggering the provisioning.
       - No backup of configuration is required by that and no access for developers is needed.
       - Anyone who is not an admin is treated as an anonymous user.
- Use a dedicated Google project to avoid access to Prow resources for project owners that are not related to the Prow topic.
      - By default, the project owners have access to the Prow cluster itself. That can be avoided by the proper RBAC setup.
   - Project owners will have access to the Secrets in Google Cloud Storage.
      - Project owners will have access to the build logs.
       - Project owners will have access to the dynamically created K8s clusters and VMs.
       - VMs might have network access to other VMs not related to the Prow setup. If we are not using own project, we need to create VMs in a dedicated network.
- Enable audit logs on the Prow cluster with storage on Google Cloud Storage.
- Assure that jobs have no access to the API server.
- Try not to inject any Secrets to the jobs, for example, to avoid having them in logs. Use at least the dedicated logic (plugins, a script library, or a buildpack) to process Secrets so that risk of exposure can be lower. Alternatively, you could find a way to post-process the logs like it is done in Jenkins.
- A dynamic cluster and VMs must be of the temporary nature. Make sure they are cleaned up, even if a related job gets killed unexpectedly. For example, you can have a periodic job running for the cleanup.
- As Docker-in-Docker gets used for the jobs, a cleanup is required for images and containers. Make sure they are cleaned up, even if a related job gets killed unexpectedly. For example, you can have a periodic job running for the cleanup.
- Assure that the port exposure for a job Pod is not supported to reduce the attack vector.
- Assure that the used Google service account has minimal privileges.
