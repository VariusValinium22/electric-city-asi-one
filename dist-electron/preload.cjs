"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    // App info
    getVersion: () => electron_1.ipcRenderer.invoke("app:getVersion"),
    // Touch/interaction events for kiosk
    onTouchEvent: (callback) => {
        electron_1.ipcRenderer.on("touch-event", (_event, touchEvent) => {
            callback(touchEvent);
        });
    },
    // Remove listeners
    removeAllListeners: (channel) => {
        electron_1.ipcRenderer.removeAllListeners(channel);
    },
    // Kiosk controls (if needed for admin interface)
    exitKiosk: () => electron_1.ipcRenderer.invoke("kiosk:exit"),
    // Offline storage helpers
    storage: {
        set: (key, value) => electron_1.ipcRenderer.invoke("storage:set", key, value),
        get: (key) => electron_1.ipcRenderer.invoke("storage:get", key),
        remove: (key) => electron_1.ipcRenderer.invoke("storage:remove", key),
        clear: () => electron_1.ipcRenderer.invoke("storage:clear"),
    },
});
//# sourceMappingURL=preload.js.map