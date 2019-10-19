import React, { FC } from "react";
import { SlidesBanner as Banner } from "./SlidesBanner";
import { useStaticQuery, graphql } from "gatsby";
import { SlidesBannerProps } from "@typings/landingPage";

interface QueryShape {
  allBannerYaml: {
    nodes: SlidesBannerProps[];
  };
}

export const SlidesBanner: FC = () => {
  const data = useStaticQuery<QueryShape>(graphql`
    {
      allBannerYaml {
        nodes {
          bannerDuration
          slides {
            endDate
            startDate
            text
            url
          }
        }
      }
    }
  `);

  return (
    <Banner
      bannerDuration={data.allBannerYaml.nodes[0].bannerDuration}
      slides={data.allBannerYaml.nodes[0].slides}
    />
  );
};
