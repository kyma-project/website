import React from "react";
import L from "@components/shared/Link";
import { LayoutType } from "../../../index";

interface LinkProps {
  href: string;
  assetsPath?: string;
  layout?: LayoutType;
}

export const Link: React.FunctionComponent<LinkProps> = ({
  href,
  assetsPath = "",
  layout,
  children,
}) => {
  const getAssetName = (path: string): string => {
    const fileNameRegex = /(.*?)\/(.*?).(jpeg|jpg|gif|png|svg|json|yaml|yml)$/;
    const match = fileNameRegex.exec(path);

    if (match && match[2]) {
      const splitedName = match[2].split("/");
      return `${splitedName[splitedName.length - 1]}.${match[3]}`;
    }
    return "";
  };

  if (href.startsWith("http")) {
    return (
      <L.External to={href} externalIcon={true} underline={true}>
        {children}
      </L.External>
    );
  }
  if (href.startsWith("#")) {
    return (
      <L.Hash to={href} underline={true}>
        {children}
      </L.Hash>
    );
  }

  const assetName = getAssetName(href);
  if (assetName) {
    return <a href={`${assetsPath}${assetName}`}>{children}</a>;
  }

  if (layout === LayoutType.COMMUNITY) {
    href = `community/${href.startsWith("/") ? href.substring(1) : href}`;
  }
  return (
    <L.Internal to={href} underline={true}>
      {children}
    </L.Internal>
  );
};
