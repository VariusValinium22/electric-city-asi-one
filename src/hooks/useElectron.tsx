import { useEffect, useState } from "react";

/**
 * Hook to safely access Electron API
 * Returns null if not running in Electron environment
 */
export const useElectron = () => {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    // Check if we're running in Electron
    setIsElectron(typeof window !== "undefined" && window.electronAPI !== undefined);
  }, []);

  return isElectron ? window.electronAPI : null;
};

/**
 * Hook to detect if the app is running offline
 */
export const useOfflineStatus = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const electronAPI = useElectron();

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return {
    isOffline,
    isOnline: !isOffline,
    isElectron: !!electronAPI,
  };
};
