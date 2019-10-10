import { memoizeRead } from "./memoize-read";

describe("product of memoizeLoad", () => {
  test("should reject load error", () => {
    expect(
      memoizeRead(p => {
        throw "test error";
      })("test"),
    ).rejects.toEqual("test error");
  });
  test("should memoize", async () => {
    const read = memoizeRead(async () => {
      await new Promise(r => setTimeout(r, 100));
    });
    await read("test");
    await read("test");
  }, 110);
});
