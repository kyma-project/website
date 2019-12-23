import { Release, Tickets } from "@typings/roadmap";
import { TicketsProcessor } from "./TicketsProcessor";

describe("TicketsProcessor", () => {
  test("should return sorted releases", () => {
    const tickets: Tickets = {
      "1.10": {},
      "1.1": {},
      Future: {},
      "2.0": {},
      "2020-Q2": {},
    };
    const expected: Release[] = [
      {
        displayName: "1.1",
        capabilities: {},
      },
      {
        displayName: "1.10",
        capabilities: {},
      },
      {
        displayName: "2.0",
        capabilities: {},
      },
      {
        displayName: "2020-Q2",
        capabilities: {},
      },
      {
        displayName: "Future",
        capabilities: {},
      },
    ];

    const actual = new TicketsProcessor(tickets)
      .sortReleases()
      .returnFilteredReleases();
    expect(actual).toEqual(expected);
  });
});
