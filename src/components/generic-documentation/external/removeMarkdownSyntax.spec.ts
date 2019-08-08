import { removeMarkdownSyntax } from "./removeMarkdownSyntax";

describe("remove Markdown", () => {
  describe("removeMd", () => {
    it("should leave a string alone without markdown", () => {
      const str = "Javascript Developers are the best.";
      expect(removeMarkdownSyntax(str)).toEqual(str);
    });

    it("should strip out remaining markdown", () => {
      const str = "*Javascript* developers are the _best_.";
      const expected = "Javascript developers are the best.";
      expect(removeMarkdownSyntax(str)).toEqual(expected);
    });

    it("should leave non-matching markdown markdown", () => {
      const str = "*Javascript* developers* are the _best_.";
      const expected = "Javascript developers* are the best.";
      expect(removeMarkdownSyntax(str)).toEqual(expected);
    });

    it("should leave non-matching markdown, but strip empty anchors", () => {
      const str = "*Javascript* [developers]()* are the _best_.";
      const expected = "Javascript developers* are the best.";
      expect(removeMarkdownSyntax(str)).toEqual(expected);
    });

    it("should strip HTML", () => {
      const str = "<p>Hello World</p>";
      const expected = "Hello World";
      expect(removeMarkdownSyntax(str)).toEqual(expected);
    });

    it("should strip anchors", () => {
      const str =
        "*Javascript* [developers](https://engineering.condenast.io/)* are the _best_.";
      const expected = "Javascript developers* are the best.";
      expect(removeMarkdownSyntax(str)).toEqual(expected);
    });

    it("should strip img tags", () => {
      const str =
        "![](https://placebear.com/640/480)*Javascript* developers are the _best_.";
      const expected = "Javascript developers are the best.";
      expect(removeMarkdownSyntax(str)).toEqual(expected);
    });

    it("should strip code tags", () => {
      const str = "In `Getting Started` we set up `something` foo.";
      const expected = "In Getting Started we set up something foo.";
      expect(removeMarkdownSyntax(str)).toEqual(expected);
    });

    it("should remove emphasis", () => {
      const str = "I italicized an *I* and it _made_ me *sad*.";
      const expected = "I italicized an I and it made me sad.";
      expect(removeMarkdownSyntax(str)).toEqual(expected);
    });

    it("should remove double emphasis", () => {
      const str = "**this sentence has __double styling__**";
      const expected = "this sentence has double styling";
      expect(removeMarkdownSyntax(str)).toEqual(expected);
    });

    it("should remove blockquotes", () => {
      const str = ">I am a blockquote";
      const expected = "I am a blockquote";
      expect(removeMarkdownSyntax(str)).toEqual(expected);
    });

    it("should remove blockquotes with spaces", () => {
      const str = "> I am a blockquote";
      const expected = "I am a blockquote";
      expect(removeMarkdownSyntax(str)).toEqual(expected);
    });

    it("should remove indented blockquotes", () => {
      const tests = [
        { str: " > I am a blockquote", expected: "I am a blockquote" },
        { str: "  > I am a blockquote", expected: "I am a blockquote" },
        { str: "   > I am a blockquote", expected: "I am a blockquote" },
      ];
      tests.forEach(test => {
        expect(removeMarkdownSyntax(test.str)).toEqual(test.expected);
      });
    });

    it("should not remove greater than signs", () => {
      const tests = [
        { str: "100 > 0", expected: "100 > 0" },
        { str: "100 >= 0", expected: "100 >= 0" },
        { str: "100>0", expected: "100>0" },
        { str: "> 100 > 0", expected: "100 > 0" },
        { str: "1 < 100", expected: "1 < 100" },
        { str: "1 <= 100", expected: "1 <= 100" },
      ];
      tests.forEach(test => {
        expect(removeMarkdownSyntax(test.str)).toEqual(test.expected);
      });
    });
  });
});
