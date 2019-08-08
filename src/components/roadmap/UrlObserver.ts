import { useEffect, useContext } from "react";
import createContainer from "constate";

import RoadmapService from "@components/roadmap/service";
import { Location } from "@reach/router";

const UrlObserver = () => {
  const {
    isInitialRenderComplete,
    scrollToTickets,
    scrollToTicketsReference,
    location,
  } = useContext(RoadmapService);

  useEffect(() => {
    if (scrollToTickets()) {
      scrollToTicketsReference({ smooth: false });
    }
  }, []);
};

const { Provider } = createContainer(UrlObserver);
export { Provider };
