import React, { useState, useEffect, useRef } from "react";

import useToggle from "@common/hooks/useToggle";

import Icon from "@components/shared/Icon";

import { InputWrapper } from "./styled";

const Input: React.FunctionComponent = () => {
  const [search, setSearch] = useState<string>("");
  const iconEl = useRef(null);
  const inputEl = useRef(null);
  const [inputActive, searchFocus] = useToggle(inputEl, iconEl, false);

  useEffect(() => {
    setSearch("");
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
    return;
  };

  return (
    <InputWrapper
      iconName="search"
      iconPrefix="fas"
      reference={iconEl}
      onClick={searchFocus}
      active={inputActive as boolean}
    >
      <form onSubmit={e => e.preventDefault()}>
        <input
          id="algolia-search"
          type="search"
          placeholder="Search"
          aria-label="Search content on website"
          ref={inputEl}
          value={search ? search : ""}
          onChange={e => {
            setSearch(e.target.value);
          }}
        />
      </form>
      <Icon
        iconName="times"
        iconPrefix="fas"
        onClick={() => {
          setSearch("");
          focusSearch();
        }}
      />
    </InputWrapper>
  );
};

export default Input;
