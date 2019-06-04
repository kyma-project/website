import React, { useState, useEffect, useRef } from "react";

import useToggle from "@common/hooks/useToggle";
import { FormattedMessage } from "@common/i18n";

import Icon from "@components/shared/Icon";
import Tooltip from "@components/shared/Tooltip";

import { InputWrapper, TooltipContent } from "./styled";

interface Props {
  search?: any;
}

const Input: React.FunctionComponent<Props> = ({ search }) => {
  const iconEl = useRef(null);
  const inputEl = useRef(null);
  const [inputActive, searchFocus] = useToggle(inputEl, iconEl, false);

  useEffect(() => {
    focusSearch();
  }, [inputActive]);

  const focusSearch = () => {
    if (
      !inputEl ||
      !inputEl.current ||
      typeof (inputEl.current as any).focus !== "function"
    ) {
      return;
    }

    if (inputActive) {
      (inputEl.current as any).focus();
    }
  };

  const clearValue = () => {
    if (
      search &&
      search.autocomplete &&
      search.autocomplete.autocomplete &&
      typeof search.autocomplete.autocomplete.setVal === "function"
    ) {
      search.autocomplete.autocomplete.setVal("");
    }
  };

  if (
    search &&
    search.autocomplete &&
    typeof search.autocomplete.on === "function"
  ) {
    search.autocomplete.on("autocomplete:opened", () => {
      if (!inputActive) {
        (searchFocus as any)();
      }
    });
  }

  const tooltipContent = (
    <TooltipContent>
      <FormattedMessage id="search.description" />
      <ul>
        <li>
          <FormattedMessage id="search.filters.logicOperator" />
        </li>
        <li>
          <FormattedMessage id="search.filters.numberOperator" />
        </li>
        <li>
          <FormattedMessage id="search.filters.limitOperator" />
        </li>
        <li>
          <FormattedMessage id="search.filters.doubleQuotes" />
        </li>
      </ul>
    </TooltipContent>
  );

  return (
    <InputWrapper
      iconName="search"
      iconPrefix="fas"
      reference={iconEl}
      onClick={() => {
        focusSearch();
        if (!inputActive) {
          (searchFocus as any)();
        }
      }}
      active={inputActive as boolean}
    >
      <form onSubmit={e => e.preventDefault()}>
        <input
          id="algolia-search"
          type="search"
          placeholder="Search"
          aria-label="Search content on website"
          ref={inputEl}
        />
      </form>
      <Tooltip content={tooltipContent} placement="bottom">
        <Icon iconName="question-circle" iconPrefix="fas" />
      </Tooltip>
      <Icon
        iconName="times"
        iconPrefix="fas"
        onClick={() => {
          clearValue();
          focusSearch();
        }}
      />
    </InputWrapper>
  );
};

export default Input;
