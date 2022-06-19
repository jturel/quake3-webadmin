const path = require('path');
const { app, BrowserWindow } = require('electron');
const server = require('./src/server/Server.js');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreference: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    (app.isPackaged) ? `file://${path.join(__dirname, './index.html')}`
    : 'http://localhost:3000'
  );

  //win.webContents.openDevTools({ mode: 'detach' });
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => app.quit());
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
