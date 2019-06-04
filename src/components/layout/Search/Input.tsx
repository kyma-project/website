import React, { useState, useEffect, useRef } from "react";

import useToggle from "@common/hooks/useToggle";

import Icon from "@components/shared/Icon";

import { InputWrapper } from "./styled";

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
