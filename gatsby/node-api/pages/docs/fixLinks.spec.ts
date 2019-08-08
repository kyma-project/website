import { changeVersion } from "./fixLinks";

describe("changeVersion", () => {
  it("change version with docs/ prefix", () => {
    const md = `[foo bar](/docs/components/service-catalog)`;
    const expectedMd = `[foo bar](/docs/master/components/service-catalog)`;

    expect(changeVersion({ source: md, version: "master" })).toEqual(
      expectedMd,
    );
  });

  it("change version with components/ prefix", () => {
    const md = `[foo bar](/components/service-catalog)`;
    const expectedMd = `[foo bar](/docs/master/components/service-catalog)`;

    expect(changeVersion({ source: md, version: "master" })).toEqual(
      expectedMd,
    );
  });

  it("change version with root/ prefix", () => {
    const md = `[foo bar](/root/kyma)`;
    const expectedMd = `[foo bar](/docs/master/root/kyma)`;

    expect(changeVersion({ source: md, version: "master" })).toEqual(
      expectedMd,
    );
  });
});
