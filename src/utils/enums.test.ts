import { describe, it, expect } from "vitest";
import { enumKeys } from "./enum";

describe("enumKeys", () => {
  it("returns an array of object keys", () => {
    expect(
      enumKeys({
        cat: "cat",
        dog: "dog",
      })
    ).toMatchObject(["cat", "dog"]);
  });

  it("omits object keys that don't match their values", () => {
    expect(
      enumKeys({
        cat: "cat",
        dog: 1,
      })
    ).toMatchObject(["cat"]);
  });
});
