import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";

import Icon from "@components/shared/Icon";

import { ALGOLIA } from "@common/constants";

import AlgoliaWrapper from "./AlgoliaWrapper";

const Algolia: React.FunctionComponent = () => {
  const [initial, setInitial] = useState<boolean>(false);
  const [loadedAlgolia, setLoadedAlgolia] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  const handleSelected = (
    input: HTMLInputElement,
    event: Event & { _args: any },
  ) => {
    if (
      !event ||
      !event._args ||
      !Array.isArray(event._args) ||
      !event._args[0] ||
      !event._args[0].url
    ) {
      return;
    }
    const url = new URL(event._args[0].url);

    const paths = url.pathname.split(`/`).filter(el => el !== ``);
    const slug = paths[paths.length - 1];
    const path =
      `#${slug}` === url.hash
        ? `${url.pathname}`
        : `${url.pathname}${url.hash}`;

    navigate(path);
  };

  const algoliaOptions = {
    apiKey: ALGOLIA.API_KEY,
    indexName: ALGOLIA.INDEX_NAME,
    inputSelector: `#algolia-search`,
    autocompleteOptions: {
      openOnFocus: true,
      autoselect: true,
      hint: true,
      keyboardShortcuts: [`s`],
    },
    algoliaOptions: {
      hitsPerPage: 7,
      facetFilters: [`language:en`, `version:master`],
    },
    handleSelected,
  };

  const init = (): void => {
    if (initial || !window || !(window as any).docsearch) return;

    (window as any).docsearch(algoliaOptions);
    setInitial(true);
  };

  const loadJS = () => import(`@static/js/docsearch.min.js`);
  const loadAlgolia = (): void => {
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

  useEffect(() => {
    loadAlgolia();
  }, []);

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
            aria-label="Search content on website"
          />
        </form>
      </div>
    </AlgoliaWrapper>
  );
};

export default Algolia;
