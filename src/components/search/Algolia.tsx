import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";

import { AlgoliaWrapper } from "./styled";

const Algolia: React.FunctionComponent = () => {
  const [initial, setInitial] = useState<boolean>(false);
  const [loadedAlgolia, setLoadedAlgolia] = useState<boolean>(false);

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
      debug: false,
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
  const loadDocSearch = (): void => {
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

  useEffect(() => () => {
    unmount();
  });

  return (
    <AlgoliaWrapper>
      <form
        style={{
          display: "flex",
          flex: "0 0 auto",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: "0.25rem",
          paddingRight: "0.25rem",
        }}
        onSubmit={e => e.preventDefault()}
        onClick={loadDocSearch}
        onMouseEnter={loadDocSearch}
      >
        <input
          id="algolia-search"
          type="search"
          placeholder="Search"
          aria-label="Search docs"
        />
      </form>
    </AlgoliaWrapper>
  );
};

export default Algolia;
