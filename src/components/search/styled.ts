import styled from "@styled";

export const SearchWrapper = styled.div`
  margin: 75px 0;
`;

export const GoogleCustomSearchElementWrapper = styled.div`
  > div {
    .gsc-search-box table {
      margin-bottom: 0;

      .gsc-input {
        padding: 0 0 16px;
      }

      .gsc-search-button {
        display: none;
      }
    }

    .gsc-tabsAreaInvisible,
    .gsc-tabsAreaInvisible,
    .gsc-above-wrapper-area,
    .gsc-adBlockInvisible,
    .gsc-adBlock {
      display: none;
    }

    .gsc-resultsRoot > table {
      display: none;
    }
  }
`;
