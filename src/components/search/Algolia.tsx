import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";

import Icon from "@components/shared/Icon";

import AlgoliaWrapper from "./AlgoliaWrapper";

const Algolia: React.FunctionComponent = () => {
  const [initial, setInitial] = useState<boolean>(false);
  const [loadedAlgolia, setLoadedAlgolia] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  const autocompleteSelected = (event: any) => {
    event.stopPropagation();
    const a = document.createElement(`a`);
    a.href = event._args[0].url;

    const paths = a.pathname.split(`/`).filter(el => el !== ``);
    const slug = paths[paths.length - 1];
    const path =
      `#${slug}` === a.hash ? `${a.pathname}` : `${a.pathname}${a.hash}`;

    navigate(path);
  };

  const init = (): void => {
    if (initial || !window || !(window as any).docsearch) return;

    window.addEventListener(
      `autocomplete:selected`,
      autocompleteSelected,
      true,
    );

    (window as any).docsearch({
      apiKey: `25626fae796133dc1e734c6bcaaeac3c`,
      indexName: `docsearch`,
      inputSelector: `#algolia-search`,
      debug: true,
      autocompleteOptions: {
        openOnFocus: true,
        autoselect: true,
        hint: false,
        keyboardShortcuts: [`s`],
      },
    });

    setInitial(true);
  };

  const loadJS = () => import(`@static/js/docsearch.min.js`);
  const mount = (): void => {
    if (!loadedAlgolia) {
      loadJS().then(a => {
        setLoadedAlgolia(true);
        (window as any).docsearch = a.default;
        init();
      });
    } else {
      init();
    }
  };

  const unmount = (): void => {
    window.removeEventListener(
      `autocomplete:selected`,
      autocompleteSelected,
      true,
    );
  };

  useEffect(() => {
    mount();
    return () => {
      unmount();
    };
  });

  return (
    <AlgoliaWrapper focused={focused}>
      <div>
        <form
          onSubmit={e => e.preventDefault()}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <span>
            <Icon iconName="search" iconPrefix="fas" />
          </span>
          <input
            id="algolia-search"
            type="search"
            placeholder="Search"
            aria-label="Search docs"
          />
        </form>
      </div>
    </AlgoliaWrapper>
  );
};

export default Algolia;
