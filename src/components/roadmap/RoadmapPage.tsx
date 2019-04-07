import React from "react";

import { RoadmapPageContext } from "./types";

interface RoadmapPageProps {
  pageContext: RoadmapPageContext;
}

const RoadmapPage: React.FunctionComponent<RoadmapPageProps> = ({
  pageContext: { capability },
}) => {
  return (
    <div>dupa</div>
  );
};

export default RoadmapPage;
