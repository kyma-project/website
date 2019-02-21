import React from "react";

import { Wrapper, Label, SelectWrapper, VersionSelect } from "./styled";

import ui from "../../../../../locales/en/UI.json";

const VersionSwitcher = ({ versions = [], currentVersion, onChange }) => (
  <Wrapper>
    <Label>{ui.docs.version}</Label>
    <SelectWrapper>
      <VersionSelect onChange={onChange} defaultValue={currentVersion}>
        {Object.keys(versions).map((key, id) => {
          return (
            <optgroup key={key} label={ui.docs[key]}>
              {versions[key].map((version, idx) => {
                const isLatestVersion = id === 0 && idx === 0;

                return (
                  <option key={version} value={version}>
                    {version} {isLatestVersion && `(${ui.docs.latest})`}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </VersionSelect>
    </SelectWrapper>
  </Wrapper>
);

export default VersionSwitcher;
