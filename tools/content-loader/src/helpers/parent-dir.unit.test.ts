import { parentDir } from "./parent-dir";

describe("parentDir", () => {
  const cases = [
    [
      "/test/me", // path
      "/test", // expected
    ],
    [
      "/Applications/Visual Studio Code - Insiders.app/Contents/Frameworks", // path
      "/Applications/Visual Studio Code - Insiders.app/Contents", // expected
    ],
    [
      "/Applications/Visual Studio Code - Insiders.app", // path
      "/Applications", // expected
    ],
  ];
  test.each(cases)('it should resolve "%s" to "%s"', (path, expected) => {
    const actual = parentDir(path);
    expect(actual).toEqual(expected);
  });
});
