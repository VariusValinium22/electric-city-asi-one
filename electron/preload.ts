import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// Define types for touch events
interface TouchEvent {
  type: string;
  x: number;
  y: number;
  timestamp: number;
}

// Define types for storage values
type StorageValue = string | number | boolean | object | null;

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App info
  getVersion: () => ipcRenderer.invoke('app:getVersion'),
  
  // Touch/interaction events for kiosk
  onTouchEvent: (callback: (event: TouchEvent) => void) => {
    ipcRenderer.on('touch-event', (_event: IpcRendererEvent, touchEvent: TouchEvent) => {
      callback(touchEvent);
    });
  },
  
  // Remove listeners
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },

  // Kiosk controls (if needed for admin interface)
  exitKiosk: () => ipcRenderer.invoke('kiosk:exit'),
  
  // Offline storage helpers
  storage: {
    set: (key: string, value: StorageValue) => ipcRenderer.invoke('storage:set', key, value),
    get: (key: string) => ipcRenderer.invoke('storage:get', key),
    remove: (key: string) => ipcRenderer.invoke('storage:remove', key),
    clear: () => ipcRenderer.invoke('storage:clear'),
  }
});

// Add type definitions for TypeScript
declare global {
  interface Window {
    electronAPI: {
      getVersion: () => Promise<string>;
      isOnline: () => boolean;
      onTouchEvent: (callback: (event: TouchEvent) => void) => void;
      removeAllListeners: (channel: string) => void;
      exitKiosk: () => Promise<void>;
      storage: {
        set: (key: string, value: StorageValue) => Promise<void>;
        get: (key: string) => Promise<StorageValue>;
        remove: (key: string) => Promise<void>;
        clear: () => Promise<void>;
      };
    };
  }
}

// Make this a module
export {}; 