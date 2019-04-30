import { useState, useEffect, useContext } from "react";
import qs from "qs";
import { navigate } from "gatsby";
import createContainer from "constate";

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

  const prepareReleases = (): ReleaseWithNumber[] => {
    const releases: Release[] = [];

    Object.keys(tickets).map(release => {
      releases.push({
        displayName: release,
        capabilities: tickets[release],
      });
    });

    const filteredReleases = releases
      .sort((a, b) =>
        a.displayName > b.displayName
          ? 1
          : b.displayName > a.displayName
          ? -1
          : 0,
      )
      // filter capabilities by query params
      .map(release => {
        if (!filters.capabilities.length) return release;

        return {
          displayName: release.displayName,
          capabilities: Object.keys(release.capabilities)
            .filter(capability =>
              filters.capabilities.includes(
                capabilities.find(
                  cap => cap.frontmatter.displayName === capability,
                )!.frontmatter.id,
              ),
            )
            .reduce(
              (res: any, key) => ((res[key] = release.capabilities[key]), res),
              {},
            ),
        };
      })
      // filter capabilities without tickets
      .map(release => ({
        displayName: release.displayName,
        capabilities: Object.keys(release.capabilities)
          .filter(key => release.capabilities[key].length)
          .reduce(
            (res: any, key) => ((res[key] = release.capabilities[key]), res),
            {},
          ),
      }))
      // filter release without capabilities
      .filter(release =>
        Object.keys(release.capabilities).some(
          capability => release.capabilities[capability].length > 0,
        ),
      );

    let order = 0;
    const releasesWithOrder: ReleaseWithNumber[] = filteredReleases.map(
      release => {
        const r = {
          release,
          orderNumber: order,
        };
        order += Object.keys(release.capabilities).length;

        return r;
      },
    );

    return releasesWithOrder;
  };

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
      navigate(pathname, { replace: true });
      return;
    }

    if (
      !initial &&
      search.replace(/^\?/, ``) !== queryString &&
      !/roadmap\/[a-z]/.test(pathname)
    ) {
      navigate(`${pathname}?${queryString}`, { replace: true });
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
