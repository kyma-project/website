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

const VersionSwitcher = ({ versions, currentVersion, onChange }) => {
  // TODO: Uncomment commented code to enable versioning
  // const latestVersion = "latest";
  return (
    <Wrapper>
      <Label>{ui.docs.version}</Label>
      <VersionSelect onChange={onChange} defaultValue={currentVersion}>
        {/* <option key={latestVersion} value={latestVersion}>
          {ui.docs.latest}
        </option> */}
        {versions.map(version => (
          <option key={version} value={version}>
            {version}
          </option>
        ))}
      </VersionSelect>
    </Wrapper>
  );
};

export default VersionSwitcher;
