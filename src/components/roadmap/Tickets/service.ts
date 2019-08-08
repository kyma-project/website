import { useState, useEffect, useContext } from "react";
import qs from "qs";
import createContainer from "constate";

import TicketsProcessor from "@components/roadmap/Tickets/TicketsProcessor";
import RoadmapService from "@components/roadmap/service";

import { Release } from "../types";

import tickets from "../../../../content/roadmap/tickets.json";

interface State {
  filters: {
    capabilities: string[];
  };
  initial: boolean;
}

const initialState: State = {
  filters: {
    capabilities: [],
  },
  initial: true,
};

const TicketsService = () => {
  const {
    capabilities,
    scrollToTicketsReference,
    scrollToTickets,
    location,
  } = useContext(RoadmapService);
  const [{ filters, initial }, setState] = useState<State>(initialState);

  interface ReleaseWithNumber {
    release: Release;
    orderNumber: number;
  }

  const prepareReleases = (): ReleaseWithNumber[] =>
    new TicketsProcessor(tickets)
      .sortReleases()
      .filterCapabilitiesByQueryParams(filters, capabilities)
      .filterCapabilitiesWithoutCapabilities()
      .removeCapabilitiesWithoutTickets()
      .createReleasesWithNumber()
      .returnReleasesWithNumber();

  useEffect(() => {
    const { pathname, search = ``, state } = location;
    const { capabilities: caps } = qs.parse(search.replace(`?`, ``), {
      comma: true,
    });

    let formattedCapabilities: string[] | null = null;
    if (Array.isArray(caps)) {
      formattedCapabilities = caps;
    } else {
      if (caps) {
        formattedCapabilities = [caps];
      }
    }

    if (formattedCapabilities && formattedCapabilities.length) {
      setState({
        filters: {
          capabilities: formattedCapabilities,
        },
        initial: false,
      });
      return;
    }

    if (
      state &&
      state.filters &&
      state.filters.capabilities &&
      Object.keys(state.filters.capabilities).length
    ) {
      setState({
        filters: {
          capabilities: state.filters.capabilities,
        },
        initial: false,
      });
      return;
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
      clearFilters();
    }
  }, [location.hash]);

  useEffect(() => {
    const { pathname, search, hash } = location;
    const queryString = qs.stringify(
      { capabilities: filters.capabilities },
      { arrayFormat: "comma", encode: false },
    );

    if (!filters.capabilities.length && hash) return;

    if (!initial && queryString === "capabilities=") {
      window.history.pushState(null, "", pathname);
      return;
    }

    if (
      !initial &&
      search.replace(/^\?/, ``) !== queryString &&
      !/roadmap\/[a-z]/.test(pathname)
    ) {
      window.history.pushState(null, "", `${pathname}?${queryString}`);
    }
  }, [filters.capabilities]);

  const setCapability = (capability: string) => {
    let filteredCapabilities: string[];
    if (filters.capabilities.includes(capability)) {
      filteredCapabilities = filters.capabilities.filter(
        cap => cap !== capability,
      );
    } else {
      filteredCapabilities = [...filters.capabilities, capability];
    }

    setState({
      filters: {
        capabilities: filteredCapabilities,
      },
      initial: false,
    });

    scrollToTicketsReference({});
  };

  const clearFilters = () => {
    setState({
      ...initialState,
      initial: false,
    });
  };

  return {
    filters,
    prepareReleases,
    setCapability,
    clearFilters,
  };
};

const { Provider, Context } = createContainer(TicketsService);
export { Provider };
export default Context;
