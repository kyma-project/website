import { Tickets, Release, Capability } from "@typings/roadmap";

interface ReleaseWithNumber {
  release: Release;
  orderNumber: number;
}

export class TicketsProcessor {
  private tickets: Tickets;
  private releases: Release[] = [];
  private filteredReleases: Release[] = [];
  private releasesWithNumber: ReleaseWithNumber[] = [];

  constructor(tickets: Tickets = {}) {
    this.tickets = JSON.parse(JSON.stringify(tickets)) as Tickets;

    Object.keys(tickets).map(release => {
      this.releases.push({
        displayName: release,
        capabilities: tickets[release],
      });
    });

    this.filteredReleases = JSON.parse(
      JSON.stringify(this.releases),
    ) as Release[];
  }

  sortReleases() {
    this.filteredReleases = this.filteredReleases.sort((a, b) =>
      a.displayName.localeCompare(b.displayName, undefined, { numeric: true }),
    );

    return this;
  }

  filterCapabilitiesByQueryParams(filters: any, capabilities: Capability[]) {
    this.filteredReleases = this.filteredReleases.map(release => {
      if (!filters.capabilities.length) return release;

      return {
        displayName: release.displayName,
        capabilities: Object.keys(release.capabilities)
          .filter(capability => {
            const searchedCapability = capabilities.find(
              cap => cap.frontmatter.displayName === capability,
            );

            if (searchedCapability) {
              return filters.capabilities.includes(
                searchedCapability.frontmatter.id,
              );
            }

            return false;
          })
          .reduce(
            (res: any, key) => ((res[key] = release.capabilities[key]), res),
            {},
          ),
      };
    });

    return this;
  }

  removeCapabilitiesWithoutTickets() {
    this.filteredReleases = this.filteredReleases.map(release => ({
      displayName: release.displayName,
      capabilities: Object.keys(release.capabilities)
        .filter(key => release.capabilities[key].length)
        .reduce(
          (res: any, key) => ((res[key] = release.capabilities[key]), res),
          {},
        ),
    }));

    return this;
  }

  filterCapabilitiesWithoutCapabilities() {
    this.filteredReleases = this.filteredReleases.filter(release =>
      Object.keys(release.capabilities).some(
        capability => release.capabilities[capability].length > 0,
      ),
    );

    return this;
  }

  createReleasesWithNumber() {
    let order = 0;
    this.releasesWithNumber = this.filteredReleases.map(release => {
      const r = {
        release,
        orderNumber: order,
      };
      order += Object.keys(release.capabilities).length;

      return r;
    });

    return this;
  }

  returnTickets(): Tickets {
    return this.tickets;
  }

  returnReleases(): Release[] {
    return this.releases;
  }

  returnFilteredReleases(): Release[] {
    return this.filteredReleases;
  }

  returnReleasesWithNumber(): ReleaseWithNumber[] {
    return this.releasesWithNumber;
  }
}

export default TicketsProcessor;
