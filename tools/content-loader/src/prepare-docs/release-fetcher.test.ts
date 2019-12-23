import { ReleaseFetcher } from "./release-fetcher";

describe("ReleaseFetcher", () => {
  describe("extractTags", () => {
    test("should extract all tags given no second parameter", () => {
      const { expected, releases } = prepareTestDataExtractTags();

      const tags = new ReleaseFetcher().extractTags(releases);
      expect(tags).toEqual(expected);
    });
  });
});

const prepareTestDataExtractTags = () => {
  const testData = [];

  const releases = new Map();

  for (let i = 0; i < 20; i++) {
    testData.push([`key-${i}`, `value-${i}`]);
    releases.set(`key-${i}`, { tag_name: `value-${i}` });
  }
  const expected = new Map(testData as any);

  return {
    expected,
    releases,
  };
};
