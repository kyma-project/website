import React, { useState, useEffect, useRef } from "react";
import qs from "qs";
import { navigate } from "gatsby";

import Grid from "@styled/Grid";

import Header from "@components/roadmap/Tickets/Header";
import ReleaseComponent from "@components/roadmap/Tickets/Release";

import { Location } from "@common/types";
import { Release, Capability, Tickets as TicketsType } from "../types";

import { scrollToAnchor } from "@common/utils/index";

import { Wrapper } from "./styled";

import tickets from "../../../../content/roadmap/tickets.json";

interface TicketsWrapperProps {
  capabilities: Capability[];
  checkedCapabilities: string[];
  setCapability: (capability: string) => void;
  clearFilters: () => void;
}

export const TicketsWrapper: React.FunctionComponent<TicketsWrapperProps> = ({
  capabilities,
  checkedCapabilities,
  setCapability,
  clearFilters,
  children,
}) => (
  <Wrapper>
    <Grid.Container>
      <Grid.Row>
        <Grid.Unit df={12} md={0}>
          <Header
            capabilities={capabilities}
            checkedCapabilities={checkedCapabilities}
            setCapability={setCapability}
            clearFilters={clearFilters}
          />
        </Grid.Unit>
        <Grid.Unit df={12} md={12}>
          {children}
        </Grid.Unit>
      </Grid.Row>
    </Grid.Container>
  </Wrapper>
);

interface TicketsProps {
  capabilities: Capability[];
  location: any;
}

const Tickets: React.FunctionComponent<TicketsProps> = ({
  capabilities,
  location,
}) => {
  interface ReleaseWithNumber {
    release: Release;
    orderNumber: number;
  }

  const roadmap = useRef(null);
  const [state, setState] = useState<{
    capabilities: string[];
    initial: boolean;
  }>({
    capabilities: [],
    initial: true,
  });

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
        if (!state.capabilities.length) return release;

        return {
          displayName: release.displayName,
          capabilities: Object.keys(release.capabilities)
            .filter(capability =>
              state.capabilities.includes(
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
    const { pathname, search = `` } = location;
    // tslint:disable-next-line
    const { capabilities } = qs.parse(search.replace(`?`, ``));

    if (capabilities && capabilities.length) {
      setState({
        capabilities,
        initial: false,
      });

      scrollToAnchor(roadmap.current)();
    }
  }, []);

  useEffect(() => {
    const { pathname, search } = location;
    const queryString = qs.stringify({ capabilities: state.capabilities });

    if (!state.initial && search.replace(/^\?/, ``) !== queryString) {
      navigate(`${pathname}?${queryString}`, { replace: true });
    }
  }, [state.capabilities]);

  const setCapability = (capability: string) => {
    let filteredCapabilities: string[];
    if (state.capabilities.includes(capability)) {
      filteredCapabilities = state.capabilities.filter(
        cap => cap !== capability,
      );
    } else {
      filteredCapabilities = [...state.capabilities, capability];
    }

    setState({
      capabilities: filteredCapabilities,
      initial: false,
    });

    scrollToAnchor(roadmap.current)();
  };

  const clearFilters = () => {
    setState({
      capabilities: [],
      initial: false,
    });
  };

  return (
    <div ref={roadmap}>
      <TicketsWrapper
        capabilities={capabilities}
        checkedCapabilities={state.capabilities}
        setCapability={setCapability}
        clearFilters={clearFilters}
      >
        {prepareReleases().map((release, idx) => (
          <ReleaseComponent
            key={idx}
            release={release.release}
            orderNumber={release.orderNumber}
          />
        ))}
      </TicketsWrapper>
    </div>
  );
};

export default Tickets;
