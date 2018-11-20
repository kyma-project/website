import React from "react";
import styled from "styled-components";
import ui from "../../../locales/en/UI.json";

const Wrapper = styled.div`
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #e5e5e5;
`;

const Label = styled.label`
  display: inline-block;
`;

const VersionSelect = styled.select`
  display: block;
  float: right;
  position: relative;
  top: 3px;
  font-size: 16px;
`;

const VersionSwitcher = ({ versions = [], currentVersion, onChange }) => (
  <Wrapper>
    <Label>{ui.docs.version}</Label>
    <VersionSelect onChange={onChange} defaultValue={currentVersion}>
      {versions.map((version, idx) => {
        const isLatestVersion = idx === 0;

        return (
          <option key={version} value={version}>
            {version} {isLatestVersion && `(${ui.docs.latest})`}
          </option>
        );
      })}
    </VersionSelect>
  </Wrapper>
);

export default VersionSwitcher;
