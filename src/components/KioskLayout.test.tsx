import { describe, vi, beforeEach, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
//import { KioskLayout } from "./KioskLayout";

const mockUseOfflineStatus = vi.fn();

vi.mock("../hooks/useElectron", () => ({
  useOfflineStatus: () => mockUseOfflineStatus(),
}));

describe("KioskLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });
});
/*
describe("Online Mode", () => {
  it("renders online status correctly when online and in Electron", () => {
    mockUseOfflineStatus.mockReturnValue({
      isOffline: false,
      isOnline: true,
      isElectron: true,
    });

    render(
      <KioskLayout title="Test title">
        <div>Test content</div>
      </KioskLayout>
    );

    expect(screen.getByText("Test title")).toBeInTheDocument();

    expect(screen.queryByText("KIOSK MODE")).toBeInTheDocument();

    const onlineStatus = screen.getByText("ONLINE");
    expect(onlineStatus).toHaveClass("bg-green-500");
  });
});

describe("Offline Mode", () => {
  it("renders offline status correctly when offline and not in Electron", () => {
    mockUseOfflineStatus.mockReturnValue({
      isOffline: true,
      isOnline: false,
      isElectron: false,
    });

    render(
      <KioskLayout title="Test title">
        <div>Test content</div>
      </KioskLayout>
    );

    expect(screen.getByText("Test title")).toBeInTheDocument();

    expect(screen.queryByText("KIOSK MODE")).not.toBeInTheDocument();

    const onlineStatus = screen.getByText("OFFLINE");
    expect(onlineStatus).toHaveClass("bg-red-500");
  });
});*/
