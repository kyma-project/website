import React from "react";
import { graphql, StaticQuery } from "gatsby";
import NavigationComponent from "./Navigation.component";

const NavigationContainer = ({ props }) => (
  <StaticQuery
    query={graphql`
    query NavigationQuery {
      site {
        siteMetadata {
          navigation {
            id
            path
          }
        }
      }
    }
  `}
    render={data => {
      const languages =
        (data.site &&
          data.site.siteMetadata &&
          data.site.siteMetadata.navigation) ||
        [];
      return <NavigationComponent items={languages} {...props} />;
    }}
  />
);

export default NavigationContainer;