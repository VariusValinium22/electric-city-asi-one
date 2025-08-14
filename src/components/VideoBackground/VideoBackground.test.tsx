import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import VideoBackground from "./VideoBackground";

describe("VideoBackground", () => {
  afterEach(() => cleanup());

  it("renders a video element", () => {
    render(<VideoBackground />);
    const video = document.querySelector("video");
    expect(video).toBeTruthy();
  });
});
