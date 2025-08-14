// Type definitions for Electron API exposed to renderer process

// Define types for touch events
interface TouchEvent {
  type: string;
  x: number;
  y: number;
  timestamp: number;
}

// Define types for storage values
type StorageValue = string | number | boolean | object | null;

export interface ElectronAPI {
  getVersion: () => Promise<string>;
  onTouchEvent: (callback: (event: TouchEvent) => void) => void;
  removeAllListeners: (channel: string) => void;
  exitKiosk: () => Promise<void>;
  storage: {
    set: (key: string, value: StorageValue) => Promise<void>;
    get: (key: string) => Promise<StorageValue>;
    remove: (key: string) => Promise<void>;
    clear: () => Promise<void>;
  };
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
