import React, { ReactNode } from "react";
// import { useOfflineStatus } from "../hooks/useElectron";

interface KioskLayoutProps {
  children: ReactNode;
  title?: string;
}

export const KioskLayout: React.FC<KioskLayoutProps> = ({ children /*, title = "" */}) => {
  // const { isOffline, isElectron } = useOfflineStatus();

  return (
    <div className="min-h-screen text-white">
      {/* Status Bar */}
      {/* <div className="bg-(--color-biscay) bg-opacity-20 px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex items-center space-x-4">
          {isElectron && <span className="bg-(--color-shamrock) text-xs px-2 py-1 rounded">KIOSK MODE</span>}
          <span
            className={`text-xs px-2 py-1 rounded ${isOffline ? "bg-red-500" : "bg-(--color-shamrock)"}`}
          >
            {isOffline ? "OFFLINE" : "ONLINE"}
          </span>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1">{children}</div>

      {/* Footer */}
      {/* <div className="bg-(--color-biscay) bg-opacity-20 px-4 py-2 text-center text-sm">
        <p>Electric City Aquarium</p>
      </div> */}
    </div>
  );
};
