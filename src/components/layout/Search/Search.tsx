import React, { useState, useEffect, useContext } from "react";
import { navigate } from "gatsby";

import Button from "@components/shared/Button";

import Input from "@components/layout/Search/Input";

import LayoutService from "@components/layout/service";

import { ALGOLIA } from "@common/constants";
import { isDevelopmentMode, isProductionMode } from "@common/utils";

import { AlgoliaWrapper } from "./styled";

let search: any;

const Search: React.FunctionComponent = () => {
  const {
    docsMetadata: { version },
  } = useContext(LayoutService);

  const [initial, setInitial] = useState<boolean>(false);
  const [loadedAlgolia, setLoadedAlgolia] = useState<boolean>(false);

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

  const createAlgoliaOptions = (): any => {
    const algoliaOptions: any = {
      hitsPerPage: 10,
    };

    if (isProductionMode()) {
      algoliaOptions.facetFilters = [`version:${version}`];
    }

    return {
      apiKey: ALGOLIA.API_KEY,
      indexName: ALGOLIA.INDEX_NAME,
      inputSelector: `#algolia-search`,
      autocompleteOptions: {
        debug: isDevelopmentMode(),
        openOnFocus: true,
        autoselect: true,
        hint: true,
        keyboardShortcuts: [`s`],
      },
      algoliaOptions,
      handleSelected,
    };
  };

  const loadOptions = (): void => {
    if (initial || !window || !window.docsearch) return;

    search = window.docsearch(createAlgoliaOptions());
    setInitial(true);
  };

  const loadJS = () => import(`@static/js/docsearch.min.js`);
  const loadAlgolia = (): void => {
    if (!loadedAlgolia) {
      loadJS().then(a => {
        setLoadedAlgolia(true);
        window.docsearch = a.default;
        loadOptions();
      });
    } else {
      loadOptions();
    }
  };

  useEffect(() => {
    loadAlgolia();
  }, []);

  return (
    <AlgoliaWrapper>
      <Button.Light iconName="search" iconPrefix="fas" />
      <Input search={search} />
    </AlgoliaWrapper>
  );
};

export default Search;
