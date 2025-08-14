import React from "react";
import { useElectron } from "../hooks/useElectron";

interface EnvironmentDetectorProps {
  children: React.ReactNode;
}

export const EnvironmentDetector: React.FC<EnvironmentDetectorProps> = ({ children }) => {
  const electronAPI = useElectron();
  const isElectron = !!electronAPI;

  // add environment-specific classes or behavior
  React.useEffect(() => {
    if (isElectron) {
      document.body.classList.add("electron-app", "kiosk-mode");
    } else {
      document.body.classList.add("web-app");
    }
  }, [isElectron]);

  return (
    <div className={`app-container ${isElectron ? "electron" : "web"}`}>
      {children}

      {/* show environment indicator in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {isElectron ? "Electron" : "Web"}
        </div>
      )}
    </div>
  );
};
