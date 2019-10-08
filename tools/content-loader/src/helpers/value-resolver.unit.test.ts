import { parentDir, valueTplGenerator } from "./value-resolver";

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

describe("template regexp", () => {
  const cases = [
    [
      "https://github.com/{{ .Values.global.kymaOrgName }}/kyma/archive/{{ .Values.global.docs.clusterDocsTopicsVersion }}.zip",
      [
        {
          match: "{{ .Values.global.kymaOrgName }}",
          value: "global.kymaOrgName",
        },
        {
          match: "{{ .Values.global.docs.clusterDocsTopicsVersion }}",
          value: "global.docs.clusterDocsTopicsVersion",
        },
      ],
    ],
    [
      "https://{{.Values.global.kymaOrgName }}",
      [
        {
          match: "{{.Values.global.kymaOrgName }}",
          value: "global.kymaOrgName",
        },
      ],
    ],
    [
      "https://{{  .Values.global.kymaOrgName }}",
      [
        {
          match: "{{  .Values.global.kymaOrgName }}",
          value: "global.kymaOrgName",
        },
      ],
    ],
    [
      "https://github.com/{{ .Values.global.kymaOrgName }}/{{ .Values.global.kymaOrgName }}.zip",
      [
        {
          match: "{{ .Values.global.kymaOrgName }}",
          value: "global.kymaOrgName",
        },
        {
          match: "{{ .Values.global.kymaOrgName }}",
          value: "global.kymaOrgName",
        },
      ],
    ],
    ["https://github.com", []],
  ];
  describe("matches", () => {
    test.each(cases)("%s", (url, expected) => {
      const generator = valueTplGenerator(<string>url);
      expect(Array.from(generator)).toEqual(expected);
    });
  });
});
