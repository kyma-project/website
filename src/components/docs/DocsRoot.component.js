import React from "react";
import MainPage from "./external/MainPage/MainPage.component";
import VersionSwitcher from "./navigation/VersionSwitcher";
import BackToTop from "./navigation/BackToTop";
import { getDocsPath } from "../../helpers/docsPath";

const DocsRoot = ({
  navigation,
  manifest,
  content,
  currentVersion,
  versions,
  location,
}) => {
  const changeVersion = async e => {
    const newVersion = e.target.value;
    const path = getDocsPath(newVersion);
    window.location.replace(path);
  };

  return (
    <MainPage
      topics={navigation}
      manifest={manifest.spec}
      currentVersion={currentVersion}
      location={location}
      versions={versions}
      content={content}
      topNavComponent={
        <>
          <BackToTop />
          <VersionSwitcher
            versions={versions}
            currentVersion={currentVersion}
            onChange={changeVersion}
          />
        </>
      }
    />
  );
};

export default DocsRoot;
