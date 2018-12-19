import React from "react";
import styled from "styled-components";
import ui from "../../../locales/en/UI.json";

const Wrapper = styled.div`
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #e5e5e5;
`;

const Label = styled.label`
  display: inline-block;
`;

const SelectWrapper = styled.div`
  display: block;
  float: right;
  position: relative;
  top: 0;
  cursor: pointer;

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-top: 5px solid #0b74de;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    right: 5px;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
  }
`;

const VersionSelect = styled.select`
  font-size: 16px;
  color: #0b74de;
  font-weight: 600;
  background: inherit;
  border: none;
  padding: 3px 30px 3px 3px;
  appearance: none;
  z-index: 100;
  cursor: pointer;

  &::-ms-expand {
    display: none;
  }
`;

const VersionSwitcher = ({ versions = [], currentVersion, onChange }) => (
  <Wrapper>
    <Label>{ui.docs.version}</Label>
    <SelectWrapper>
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
    </SelectWrapper>
  </Wrapper>
);

export default VersionSwitcher;
