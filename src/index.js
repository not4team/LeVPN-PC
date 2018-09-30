import { app, BrowserWindow, Menu, Tray, shell } from "electron";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + "/ico.png"
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on("close", e => {
    // e.preventDefault();
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  let tray = new Tray(__dirname + "/ico.png");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "使用说明",
      type: "normal",
      click: (menuItem, browserWindow, event) => {
        //https://notfour.blogspot.com
        shell.openExternal("https://notfour.blogspot.com");
      }
    },
    { label: "退出", type: "normal", role: "quit" }
  ]);
  tray.setToolTip("LeVPN");
  tray.setContextMenu(contextMenu);
  tray.on("double-click", () => {
    mainWindow.show();
  });

  // let pName = process.platform == "win32" ? "ss-local-x64.exe" : "ss-local";
  // Util.killByName(pName);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
