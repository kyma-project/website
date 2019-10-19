import React, { FC } from "react";
import { SlidesBanner as Banner } from "./SlidesBanner";
import { useStaticQuery, graphql } from "gatsby";
import { SlidesBannerProps } from "@typings/landingPage";

interface QueryShape {
  allBannerJson: {
    nodes: SlidesBannerProps[];
  };
}

export const SlidesBanner: FC = () => {
  const data = useStaticQuery<QueryShape>(graphql`
    {
      allBannerJson {
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
      bannerDuration={data.allBannerJson.nodes[0].bannerDuration}
      slides={data.allBannerJson.nodes[0].slides}
    />
  );
};
