import React from "react";

import { injectIntl, FunctionComponentIntl } from "@common/i18n";

import { DocsVersions } from "@components/docs/types";

import { Wrapper, Label, SelectWrapper, VersionSelect } from "./styled";

interface VersionSwitcherProps {
  versions: DocsVersions;
  version: string;
  onChange: (e: any) => Promise<void>;
}

const VersionSwitcher: FunctionComponentIntl<VersionSwitcherProps> = ({
  versions = [],
  version,
  onChange,
  formatMessage,
}) => (
  <Wrapper>
    <Label>{formatMessage({ id: "version" })}:</Label>
    <SelectWrapper>
      <VersionSelect onChange={onChange} defaultValue={version}>
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

export default injectIntl("docs")(VersionSwitcher);
