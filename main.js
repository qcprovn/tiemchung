const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("https://tiemchungcovid19.moh.gov.vn/");
  //   mainWindow.loadURL("https://yte-nghean.vnpthis.vn/")

  //   mainWindow.webContents.on('did-finish-load', function() {
  //     mainWindow.webContents.executeJavaScript(`document.getElementById("tendangnhap").value ="Nan_ttyt_quychau"`);
  //   });
  mainWindow.once("ready-to-show", () => {
    //   mainWindow.webContents.openDevTools();
    mainWindow.maximize();
    mainWindow.show();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
