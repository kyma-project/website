import styled from "@styled";

import Button from "@components/shared/Button";

export const FiltersList = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 16px 0 32px 0;
  border-bottom: solid 1px #d5dce3;
  margin-bottom: 32px;
`;

export const Filter = styled.li`
  list-style: none;
  display: inline-block;
  padding: 0;
  margin: 6px;
`;

export const FilterButton = styled(Button.Normal)`
  line-height: 28px;
  font-size: 12px;
  position: relative;

  > svg {
    font-size: 12px;
    margin-left: 12px;
    line-height: 28px;
    margin-right: 0;
    top: 50%;
  }
`;
