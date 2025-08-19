import { describe, it, expect } from "vitest";
import { enumKeys } from "./index";

describe("index", () => {
  it("imports enum globally", () => {
    expect(enumKeys).toBeDefined();
  });
});
