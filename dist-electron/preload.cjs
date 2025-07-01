"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contextBridge, ipcRenderer } = require('electron');
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    // App info
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
    // Touch/interaction events for kiosk
    onTouchEvent: (callback) => {
        ipcRenderer.on('touch-event', callback);
    },
    // Remove listeners
    removeAllListeners: (channel) => {
        ipcRenderer.removeAllListeners(channel);
    },
    // Kiosk controls (if needed for admin interface)
    exitKiosk: () => ipcRenderer.invoke('kiosk:exit'),
    // Offline storage helpers
    storage: {
        set: (key, value) => ipcRenderer.invoke('storage:set', key, value),
        get: (key) => ipcRenderer.invoke('storage:get', key),
        remove: (key) => ipcRenderer.invoke('storage:remove', key),
        clear: () => ipcRenderer.invoke('storage:clear'),
    }
});
//# sourceMappingURL=preload.js.map