import React, { useState, useEffect, useRef } from "react";

import { useToggle } from "@common/hooks/useToggle";
import { FormattedMessage, injectIntl, IntlInterface } from "@common/i18n";

import Icon from "@components/shared/Icon";
import Tooltip from "@components/shared/Tooltip";

import { InputWrapper, TooltipContent } from "./styled";

interface Props {
  search?: any;
}

const Input: React.FunctionComponent<Props & IntlInterface> = ({
  search,
  formatMessage,
}) => {
  const iconEl = useRef<HTMLInputElement>(null);
  const inputEl = useRef<HTMLInputElement>(null);
  const [inputActive, setInputActive] = useToggle<
    HTMLInputElement,
    HTMLInputElement
  >(inputEl, iconEl, false);

  useEffect(() => {
    focusSearch();
  }, [inputActive]);

  const focusSearch = () => {
    if (
      !inputEl ||
      !inputEl.current ||
      typeof inputEl.current.focus !== "function"
    ) {
      return;
    }

    if (inputActive) {
      inputEl.current.focus();
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
        setInputActive();
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
          setInputActive();
        }
      }}
      active={inputActive ? 1 : 0}
    >
      <form onSubmit={e => e.preventDefault()}>
        <input
          id="algolia-search"
          type="search"
          placeholder={formatMessage({ id: "placeholder" })}
          aria-label={formatMessage({ id: "ariaLabel" })}
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

export default injectIntl("search")(Input);
