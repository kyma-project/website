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
  includeVersionInPath,
  versions,
  location,
}) => {
  const changeVersion = async e => {
    const optionIndex = e.target.selectedIndex;
    const newVersion = e.target.value;
    const isLatestVersion = optionIndex === 0;
    const path = getDocsPath(newVersion, {}, !isLatestVersion);
    window.location.replace(path);
  };

  return (
    <MainPage
      topics={navigation}
      manifest={manifest.spec}
      currentVersion={currentVersion}
      includeVersionInPath={includeVersionInPath}
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
