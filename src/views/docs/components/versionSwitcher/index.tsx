import React, { ChangeEvent } from "react";
import { navigate } from "gatsby";

import { injectIntl, FunctionComponentIntl } from "@common/i18n";

import { getDocsPath } from "@components/generic-documentation/helpers";
import { DocsVersions } from "@typings/docs";

import { Wrapper, Label, SelectWrapper, VersionSelect } from "./styled";

interface VersionSwitcherProps {
  versions: DocsVersions;
  version: string;
  repoName: string;
  topic: string;
}

const VersionSwitcher: FunctionComponentIntl<VersionSwitcherProps> = ({
  versions = [],
  version,
  repoName,
  topic,
  formatMessage,
}) => {
  const [ver, setVersion] = React.useState(version)
  const changeDocsVersion = (e: ChangeEvent<HTMLSelectElement>) => {
    const newVersion = e.target.value; 
    if (newVersion === 'kyma 1.x') {
      window.open('https://kyma-project-old.netlify.app/docs/', '_blank');
    } else {
      const { hash } = window.location;
      const path = getDocsPath(newVersion, {
        id: topic,
      repoName,
        hash: hash.substring(1),
      });
      navigate(path);
      setVersion(newVersion);
    }
  };
  const htmlID = "docs-version";

  return (
    <Wrapper>
      <Label htmlFor={htmlID}>{formatMessage({ id: "version" })}:</Label>
      <SelectWrapper>
        <VersionSelect
          id={htmlID}
          onChange={changeDocsVersion}
          value={ver}
        >
          {Object.keys(versions).map((key: string, id: number) => (
            <optgroup key={key} label={formatMessage({ id: key })}>
              {(versions as any)[key].map((element: string, index: number) => {
                const isLatestVersion = id === 0 && index === 0;

                return (
                  <option key={element} value={element}>
                    {element}{" "}
                    {isLatestVersion && `(${formatMessage({ id: "latest" })})`}
                  </option>
                );
              })}
            </optgroup>
          ))}
          <optgroup key="Archive" label="Archive">
            <option key="kyma 1.x" value="kyma 1.x">
              {"kyma 1.x"}
            </option>
          </optgroup>
        </VersionSelect>
      </SelectWrapper>
    </Wrapper>
  );
};
export default injectIntl("docs")(VersionSwitcher);
