import React, { ChangeEvent } from "react";
import { navigate } from "gatsby";

import { injectIntl, FunctionComponentIntl } from "@common/i18n";

import { getDocsPath } from "@components/generic-documentation/helpers";
import { DocsVersions } from "@typings/docs";

import { Wrapper, Label, SelectWrapper, VersionSelect } from "./styled";

interface VersionSwitcherProps {
  versions: DocsVersions;
  version: string;
  docsType: string;
  topic: string;
}

const VersionSwitcher: FunctionComponentIntl<VersionSwitcherProps> = ({
  versions = [],
  version,
  docsType,
  topic,
  formatMessage,
}) => {
  const changeDocsVersion = (e: ChangeEvent<HTMLSelectElement>) => {
    const newVersion = e.target.value;
    const { hash } = window.location;
    const path = getDocsPath(newVersion, {
      id: topic,
      type: docsType,
      hash: hash.substring(1),
    });
    navigate(path);
  };

  return (
    <Wrapper>
      <Label>{formatMessage({ id: "version" })}:</Label>
      <SelectWrapper>
        <VersionSelect onChange={changeDocsVersion} defaultValue={version}>
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
        </VersionSelect>
      </SelectWrapper>
    </Wrapper>
  );
};
export default injectIntl("docs")(VersionSwitcher);
