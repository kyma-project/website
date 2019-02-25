export default {
  plain: {
    backgroundColor: "rgb(250, 250, 250)",
    color: "rgb(80, 161, 79)",
  },
  styles: [
    {
      types: ["string"],
      style: {
        color: "rgb(80, 161, 79)",
      },
    },
    {
      types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
      style: {
        color: "rgb(160, 161, 167)",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["tag", "operator", "number"],
      style: {
        color: "#063289",
      },
    },
    {
      types: ["property", "function"],
      style: {
        color: "#b29762",
      },
    },
    {
      types: ["tag-id", "selector", "atrule-id"],
      style: {
        color: "#2d2006",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#896724",
      },
    },
    {
      types: ["key"],
      style: {
        color: "rgb(152, 104, 1)",
      },
    },
    {
      types: [
        "boolean",
        "entity",
        "url",
        "attr-value",
        "keyword",
        "control",
        "directive",
        "unit",
        "statement",
        "regex",
        "at-rule",
      ],
      style: {
        color: "#728fcb",
      },
    },
    {
      types: ["placeholder", "variable"],
      style: {
        color: "#93abdc",
      },
    },
    {
      types: ["deleted"],
      style: {
        textDecorationLine: "line-through",
      },
    },
    {
      types: ["inserted"],
      style: {
        textDecorationLine: "underline",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["important"],
      style: {
        color: "#896724",
      },
    },
  ],
};
