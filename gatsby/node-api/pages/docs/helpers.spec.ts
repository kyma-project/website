import { sortGroupOfNavigation } from "./helpers";
import { DocsNavigation } from "../utils";

describe("sortGroupOfNavigation", () => {
  it("success sort with root group", () => {
    const navigation: DocsNavigation = {
      components: [
        {
          id: "a",
          displayName: "a",
        },
      ],
      root: [
        {
          id: "a",
          displayName: "a",
        },
      ],
    };

    const sortedNavigation = {
      root: [
        {
          id: "a",
          displayName: "a",
        },
      ],
      components: [
        {
          id: "a",
          displayName: "a",
        },
      ],
    };

    expect(sortGroupOfNavigation(navigation)).toStrictEqual(sortedNavigation);
  });
});
