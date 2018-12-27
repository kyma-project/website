const linksToRewrite = {
  "0.4": {
    components: {
      "service-catalog": {
        Details: {
          "Provisioning and binding": {
            "#delete-a-servicebinding":
              "#details-provisioning-and-binding-delete-a-servicebinding",
            "013-details-unbinding-corner-case.md":
              "#details-unbinding-corner-case",
          },
        },
        "Custom Resource": {
          ServiceBindingUsage: {
            "041-cr-usage-kind.md": "#custom-resource-usagekind",
          },
        },
      },
      "service-brokers": {
        Configuration: {
          "Binding bundles": {
            "#credential": "#configuration-binding-bundles-credential",
            "#credentialfrom": "#configuration-binding-bundles-credentialfrom",
            "#valuefrom": "#configuration-binding-bundles-valuefrom",
            "#configmapkeyref":
              "#configuration-binding-bundles-configmapkeyref",
            "#secretkeyref": "#configuration-binding-bundles-secretkeyref",
            "#serviceref": "#configuration-binding-bundles-serviceref",
            "#configmapref": "#configuration-binding-bundles-configmapref",
            "#secretref": "#configuration-binding-bundles-secretref",
          },
        },
        Architecture: {
          "The Remote Environment Broker architecture": {
            "#provisioning-and-binding-for-an-api-serviceclass":
              "#architecture-the-remote-environment-broker-architecture-provisioning-and-binding-for-an-api-serviceclass",
            "#provisioning-and-binding-for-an-event-serviceclass":
              "#architecture-the-remote-environment-broker-architecture-provisioning-and-binding-for-an-event-serviceclass",
          },
        },
      },
      serverless: {
        "CLI reference": {
          "CLI reference": {
            "../../service-catalog/docs/001-overview-service-catalog.md":
              "/docs/0.4/components/service-catalog#overview-overview",
          },
        },
      },
      "event-bus": {
        Overview: {
          Overview: {
            "013-details-service-programming-model.md":
              "#details-service-programming-model",
            "../../serverless/docs/035-programming-model.md":
              "/docs/0.4/components/serverless#details-the-node.js-programming-model",
          },
        },
        Details: {
          "Event flow requirements": {
            "#activate-events":
              "#details-event-flow-requirements-activate-events",
            "#consume-events":
              "#details-event-flow-requirements-consume-events",
            "#event-publishing":
              "#details-event-flow-requirements-event-publishing",
          },
        },
        Architecture: {
          Architecture: {
            "#event-validation": "#architecture-architecture-event-validation",
          },
        },
      },
    },
  },
  "0.5": {
    root: {
      kyma: {
        Overview: {
          "How to start": {
            "https://kyma-project.io/docs/latest/root/kyma#getting-started-local-kyma-installation":
              "#installation-install-kyma-locally-from-the-release",
            "https://kyma-project.io/docs/latest/root/kyma#getting-started-cluster-kyma-installation":
              "#installation-install-kyma-on-a-gke-cluster",
            "https://kyma-project.io/docs/latest/root/kyma#getting-started-sample-service-deployment-on-local":
              "#getting-started-sample-service-deployment-on-local",
            "https://kyma-project.io/docs/latest/root/kyma#getting-started-install-kyma-on-a-gke-cluster":
              "#getting-started-sample-service-deployment-on-a-cluster",
            "https://kyma-project.io/docs/latest/root/kyma#getting-started-develop-a-service-locally-without-using-docker":
              "#getting-started-develop-a-service-locally-without-using-docker",
            "https://kyma-project.io/docs/latest/root/kyma#getting-started-publish-a-service-docker-image-and-deploy-it-to-kyma":
              "#getting-started-publish-a-service-docker-image-and-deploy-it-to-kyma",
            "https://kyma-project.io/docs/latest/components/application-connector#getting-started-set-up-a-remote-environment-on-local-kyma-installation":
              "/docs/0.5/components/application-connector#getting-started-create-a-new-remote-environment",
            "https://kyma-project.io/docs/latest/components/application-connector#getting-started-activate-a-remoteenvironment-using-environmentmapping":
              "/docs/0.5/components/application-connector#getting-started-bind-a-remote-environment-to-an-environment",
            "https://kyma-project.io/docs/latest/components/monitoring#getting-started-expose-custom-metrics-in-kyma":
              "/docs/0.5/components/monitoring#getting-started-expose-custom-metrics-in-kyma",
          },
        },
      },
    },
    components: {
      "application-connector": {
        API: {
          "Connector Service": {
            "https://github.com/kyma-project/kyma/blob/master/docs/application-connector/docs/assets/connectorapi.yaml":
              "./assets/connectorapi.yaml",
          },
          "Event Service": {
            "https://github.com/kyma-project/kyma/blob/master/docs/application-connector/docs/assets/eventsapi.yaml":
              "./assets/eventsapi.yaml",
          },
        },
      },
      "service-catalog": {
        Details: {
          "Provisioning and binding": {
            "#delete-a-servicebinding":
              "#details-provisioning-and-binding-delete-a-servicebinding",
          },
        },
      },
      "service-brokers": {
        Configuration: {
          "Binding bundles": {
            "#credential": "#configuration-binding-bundles-credential",
            "#credentialfrom": "#configuration-binding-bundles-credentialfrom",
            "#valuefrom": "#configuration-binding-bundles-valuefrom",
            "#configmapkeyref":
              "#configuration-binding-bundles-configmapkeyref",
            "#secretkeyref": "#configuration-binding-bundles-secretkeyref",
            "#serviceref": "#configuration-binding-bundles-serviceref",
            "#configmapref": "#configuration-binding-bundles-configmapref",
            "#secretref": "#configuration-binding-bundles-secretref",
          },
        },
        Architecture: {
          "The Remote Environment Broker architecture": {
            "#provisioning-and-binding-for-an-api-serviceclass":
              "#architecture-the-remote-environment-broker-architecture-provisioning-and-binding-for-an-api-serviceclass",
            "#provisioning-and-binding-for-an-event-serviceclass":
              "#architecture-the-remote-environment-broker-architecture-provisioning-and-binding-for-an-event-serviceclass",
          },
        },
      },
      serverless: {
        "CLI reference": {
          "CLI reference": {
            "../../service-catalog/docs/001-overview-service-catalog.md":
              "/docs/0.5/components/service-catalog#overview-overview",
          },
        },
      },
      "event-bus": {
        Overview: {
          Overview: {
            "013-details-service-programming-model.md":
              "#details-service-programming-model",
            "../../serverless/docs/035-programming-model.md":
              "/docs/0.5/components/serverless#details-the-node.js-programming-model",
          },
        },
        Details: {
          "Event flow requirements": {
            "#activate-events":
              "#details-event-flow-requirements-activate-events",
            "#consume-events":
              "#details-event-flow-requirements-consume-events",
            "#event-publishing":
              "#details-event-flow-requirements-event-publishing",
          },
        },
        Architecture: {
          Architecture: {
            "#event-validation": "#architecture-architecture-event-validation",
          },
        },
      },
    },
  },
};

const kymaProjectIoRegexp = /<a(.*?)href=\"https:\/\/kyma-project\.io(.*?)>/g;
const hrefRegexp = /href=\"(.*?)\"/g;

function fixVersion(source, version, contentType, id, docType, docTitle) {
  if (!linksToRewrite[version]) return source;
  if (!docType) docType = docTitle;

  source = source.replace(kymaProjectIoRegexp, occurrence =>
    occurrence.replace('target="_blank"', ""),
  );
  source = source.replace(hrefRegexp, occurrence => {
    // for the main docs page
    if (!contentType) contentType = "root";

    hrefRegexp.lastIndex = 0;
    let href = hrefRegexp.exec(occurrence);

    if (!href || !href[1]) return occurrence;
    href = href[1];

    if (
      linksToRewrite[version][contentType] &&
      linksToRewrite[version][contentType][id] &&
      linksToRewrite[version][contentType][id][docType] &&
      linksToRewrite[version][contentType][id][docType][docTitle] &&
      linksToRewrite[version][contentType][id][docType][docTitle][href]
    ) {
      return occurrence.replace(
        href,
        linksToRewrite[version][contentType][id][docType][docTitle][href],
      );
    }
    return occurrence;
  });
  return source;
}

module.exports = fixVersion;
