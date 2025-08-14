"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
// Keep a global reference of the window object
let mainWindow = null;
function createWindow() {
  // Create the browser window optimized for kiosk/tablet use
  mainWindow = new electron_1.BrowserWindow({
    width: 1024,
    height: 768,
    fullscreen: true, // Start in fullscreen for kiosk mode
    kiosk: true, // Enable kiosk mode
    autoHideMenuBar: true, // Hide menu bar
    frame: false, // Remove window frame for clean kiosk look
    resizable: false, // Prevent resizing
    webPreferences: {
      nodeIntegration: false, // Security: disable node integration
      contextIsolation: true, // Security: enable context isolation
      preload: (0, path_1.join)(__dirname, "preload.js"), // Load preload script
      webSecurity: true, // Keep web security enabled
      allowRunningInsecureContent: false, // Security
      experimentalFeatures: false, // Disable experimental features
    },
    show: false, // Don't show until ready
    titleBarStyle: "hidden", // Hide title bar
    backgroundColor: "#000000", // Black background while loading
  });
  // Load the app
  const startUrl = electron_is_dev_1.default
    ? "http://localhost:3000"
    : `file://${(0, path_1.join)(__dirname, "../dist/index.html")}`;
  mainWindow.loadURL(startUrl);
  // Show window when ready to prevent visual flash
  mainWindow.once("ready-to-show", () => {
    if (mainWindow) {
      mainWindow.show();
      // Focus the window for kiosk mode
      mainWindow.focus();
      // Optional: Open DevTools in development
      if (electron_is_dev_1.default) {
        mainWindow.webContents.openDevTools();
      }
    }
  });
  // Handle window closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  // Prevent new window creation (security)
  mainWindow.webContents.setWindowOpenHandler(() => {
    return { action: "deny" };
  });
  // Handle navigation for security
  mainWindow.webContents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (parsedUrl.origin !== "http://localhost:3000" && !navigationUrl.startsWith("file://")) {
      event.preventDefault();
    }
  });
}
// App event handlers
electron_1.app.whenReady().then(() => {
  // Hide menu bar completely
  electron_1.Menu.setApplicationMenu(null);
  createWindow();
  // Disable keyboard shortcuts that could exit kiosk mode
  electron_1.globalShortcut.register("Alt+F4", () => {
    return false; // Prevent Alt+F4
  });
  electron_1.globalShortcut.register("Ctrl+Shift+I", () => {
    return false; // Prevent DevTools shortcut in production
  });
  // Handle app activation (macOS)
  electron_1.app.on("activate", () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
// Quit when all windows are closed (except on macOS)
electron_1.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron_1.app.quit();
  }
});
// Security: Prevent new window creation
electron_1.app.on("web-contents-created", (_, contents) => {
  contents.setWindowOpenHandler(() => {
    return { action: "deny" };
  });
});
// Clean up global shortcuts when app is quitting
electron_1.app.on("will-quit", () => {
  electron_1.globalShortcut.unregisterAll();
});
// Handle certificate errors for offline operation
electron_1.app.on("certificate-error", (event, webContents, url, error, certificate, callback) => {
  // For offline operation, we might need to handle local certificates
  // In production, implement proper certificate validation
  if (electron_is_dev_1.default) {
    event.preventDefault();
    callback(true);
  } else {
    callback(false);
  }
});
//# sourceMappingURL=main.js.map
