import React from "react";

import RootDocs from "./root/RootDocs";

import { DocsPageContext } from "./types";

import { getDocsPath } from "@components/docs/helpers";

interface DocsPageProps {
  pageContext: DocsPageContext;
}

const DocsPage: React.FunctionComponent<DocsPageProps> = ({
  pageContext: { navigation, ...props },
}) => {
  const changeDocsVersion = async (e: any) => {
    const newVersion = e.target.value;
    const path = getDocsPath(newVersion);
    window.location.replace(path); // shouldn't it be changed to navigate?
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
