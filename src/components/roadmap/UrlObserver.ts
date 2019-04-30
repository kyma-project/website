import { useEffect, useContext } from "react";
import createContainer from "constate";

import RoadmapService from "@components/roadmap/service";

const UrlObserver = () => {
  const {
    isInitialRenderComplete,
    scrollToTickets,
    scrollToTicketsReference,
  } = useContext(RoadmapService);

  useEffect(() => {
    if (scrollToTickets()) {
      scrollToTicketsReference({ smooth: false });
    }
  }, []);
};

const { Provider } = createContainer(UrlObserver);
export { Provider };
