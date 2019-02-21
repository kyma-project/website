import React from "react";

import RootDocs from "./root/RootDocs";

import { DocsPageContext } from "./types";

import { getDocsPath } from "@common/utils";

interface DocsPageProps {
  pageContext: DocsPageContext;
}

const DocsPage: React.FunctionComponent<DocsPageProps> = ({
  pageContext: { navigation, ...props },
}) => {
  const changeDocsVersion = async (e: any) => {
    const optionIndex = e.target.selectedIndex;
    const newVersion = e.target.value;
    const isLatestVersion = optionIndex === 0;
    const path = getDocsPath(newVersion);
    window.location.replace(path);
  };

  return (
    <RootDocs
      {...props}
      topics={navigation.topics}
      changeDocsVersion={changeDocsVersion}
    />
  );
};

export default DocsPage;
