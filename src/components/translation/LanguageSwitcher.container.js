import React from "react";
import { graphql, StaticQuery } from "gatsby";
import LanguageSwitcher from "./LanguageSwitcher.component";

const LanguageSwitcherContainer = ({ props }) => (
  <StaticQuery
    query={graphql`
      query LanguageQuery {
        site {
          siteMetadata {
            languages {
              code
              label
            }
          }
        }
      }
    `}
    render={data => {
      const languages =
        (data.site &&
          data.site.siteMetadata &&
          data.site.siteMetadata.languages) ||
        [];
      return <LanguageSwitcher items={languages} {...props} />;
    }}
  />
);

export default LanguageSwitcherContainer;
