import React, { useContext } from "react";

import { useScrollPosition } from "@common/hooks";

import { Specification } from "@typings/docs";

import L from "@components/shared/Link";

import { GenericDocsContext } from "../../../services/GenericDocs.service";
import { LayoutType } from "../../../index";

const getAssetName = (path: string): [string, string] => {
  const fileNameRegex = /(.*?)\/(.*?).(jpeg|jpg|gif|png|svg|json|yaml|yml)$/;
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
}

export const Link: React.FunctionComponent<LinkProps> = ({
  href,
  specifications = [],
  layout,
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

  return (
    <L.Internal to={href} underline={true}>
      {children}
    </L.Internal>
  );
};
