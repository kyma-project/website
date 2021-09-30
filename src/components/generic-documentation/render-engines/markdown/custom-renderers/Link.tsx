import React, { useContext } from "react";
import { join, normalize } from "path";
import { useScrollPosition } from "@common/hooks";

import { Specification } from "@typings/docs";

import L from "@components/shared/Link";

import { GenericDocsContext } from "../../../services/GenericDocs.service";
import { LayoutType } from "../../../index";

const getAssetName = (path: string): [string, string] => {
  const fileNameRegex = /(.*?)\/(.*?).(jpeg|jpg|gif|png|svg|json|yaml|yml|pdf)$/;
  const match = fileNameRegex.exec(path);

  if (match && match[2]) {
    const splitName = match[2].split("/");
    const name = splitName.reverse()[0];
    const extension = match[3];

    return [name, `${name}.${extension}`];
  }
  return ["", ""];
};

interface LinkProps {
  href: string;
  specifications?: Specification[];
  layout?: LayoutType;
  pagePath: string;
  topic: string;
}

export const Link: React.FunctionComponent<LinkProps> = ({
  href,
  specifications = [],
  layout,
  pagePath: pagePath,
  topic,
  children,
}) => {
  const scrollPosition = useScrollPosition();
  const { assetsPath } = useContext(GenericDocsContext);

  if (href.startsWith("http")) {
    return (
      <L.External to={href} externalIcon={true} underline={true}>
        {children}
      </L.External>
    );
  }

  if (href.includes("mailto:")) {
    return <a href={href.slice(href.indexOf("mailto:"))}>{children}</a>;
  }

  const onClickHash = (e: any) => {
    e.preventDefault();
    window.history.pushState(null, "", href);
  };

  if (href.startsWith("#")) {
    return (
      <L.Hash to={href} underline={true} onClick={onClickHash}>
        {children}
      </L.Hash>
    );
  }

  const [assetName, assetNameWithExtension] = getAssetName(href);
  if (assetName && assetNameWithExtension) {
    const spec = specifications.find(
      specification => specification.id === assetName,
    );
    if (!spec) {
      return <a href={`${assetsPath}${assetNameWithExtension}`}>{children}</a>;
    }

    return (
      <L.Internal
        to={spec.pageUrl}
        underline={true}
        state={{
          scrollPosition,
        }}
      >
        {children}
      </L.Internal>
    );
  }

  const destination = determineDestination(topic, href);
  const finalDestination = join(pagePath, destination);
  return (
    <L.Internal to={finalDestination} underline={true}>
      {children}
    </L.Internal>
  );
};

const determineDestination = (source: string, destination: string): string => {
  let newDestination = destination;
  if (destination.endsWith("README")) {
    newDestination = destination.substring(
      0,
      destination.length - "README".length,
    );
  }

  if (!source.endsWith("README")) {
    newDestination = join("../", newDestination);
  }

  return newDestination;
};
