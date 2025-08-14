# Debugging Guide

## Vite Development Server Debugging

### Quick Start

1. **Start the dev server**: `npm run dev`
2. **Open browser**: The server will automatically open at `http://localhost:3000`
3. **Enable source maps**: Source maps are now enabled by default for better debugging

### VS Code Debugging

#### Option 1: Debug Vite Dev Server

1. Open VS Code
2. Go to Run and Debug (Ctrl+Shift+D)
3. Select "Debug Vite" from the dropdown
4. Press F5 to start debugging

#### Option 2: Debug Renderer Process (Browser)

1. Start the dev server: `npm run dev`
2. In VS Code, select "Debug Renderer Process"
3. Press F5 - this will launch Chrome with debugging enabled
4. Set breakpoints in your React components

#### Option 3: Attach to Existing Browser

1. Start the dev server: `npm run dev`
2. Open Chrome and navigate to `http://localhost:3000`
3. In VS Code, select "Attach to Renderer Process"
4. Press F5 to attach the debugger

### Electron Debugging

#### Debug Main Process

1. In VS Code, select "Debug Main Process"
2. Press F5 - this will build Electron and start debugging

#### Debug All (Main + Renderer)

1. In VS Code, select "Debug All"
2. Press F5 - this will debug both the main process and renderer process

### Browser Developer Tools

#### Chrome DevTools

- **Sources Tab**: Set breakpoints in your TypeScript/React code
- **Console**: View logs and errors
- **Network Tab**: Monitor API calls and resource loading
- **React DevTools**: Install the React Developer Tools extension

#### Firefox DevTools

- Similar functionality to Chrome DevTools
- Better source map support in some cases

### Common Debugging Issues

#### Source Maps Not Working

1. Ensure `sourcemap: true` is set in `vite.config.js`
2. Check that TypeScript is generating source maps
3. Clear browser cache and reload

#### Breakpoints Not Hitting

1. Verify the file path in the debugger matches your source files
2. Check that you're debugging the correct process (main vs renderer)
3. Ensure the dev server is running on the correct port

#### Hot Reload Issues

1. Check the browser console for errors
2. Verify that the Vite dev server is running
3. Try refreshing the page manually

### Tips for Better Debugging

1. **Use console.log strategically**: Add temporary logs to track execution flow
2. **Set breakpoints in React components**: You can debug JSX and component logic
3. **Use the React DevTools**: Inspect component state and props
4. **Monitor network requests**: Use the Network tab to debug API calls
5. **Check the terminal**: Vite provides helpful error messages in the terminal

### Environment Variables

The debugging configuration sets `NODE_ENV=development` automatically, which enables:

- Better error messages
- Development-specific features
- Hot reloading
- Source maps
