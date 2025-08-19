import { describe, it, expect } from "vitest";
import { getSeconds, getMinutes } from "./timeConversion";

describe("getSeconds", () => {
  it("gets the amount of milliseconds", () => {
    expect(getSeconds(1)).toBe(1000);
  });
});

describe("getMinutes", () => {
  it("gets the amount of minutes", () => {
    expect(getMinutes(1)).toBe(60000);
  });
});
