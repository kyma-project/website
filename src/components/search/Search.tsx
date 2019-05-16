import React from "react";

import Grid from "@styled/Grid";

import Algolia from "@components/search/Algolia";
import GoogleCustomSearchElement from "@components/search/GoogleCustomSearchElement";

import { SearchWrapper } from "./styled";

const Search: React.FunctionComponent = ({}) => (
  <SearchWrapper>
    <Grid.Container>
      <Grid.Row>
        <Grid.Unit df={12}>
          {/* <Algolia /> */}
          <GoogleCustomSearchElement />
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </SearchWrapper>
);

export default Search;
