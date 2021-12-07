const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    // frame: false,
    // fullscreen:true,
    autoHideMenuBar :true,
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      partition: "persist:QCPRO", //
    },
  });

  mainWindow.loadURL("https://trangnguyen.edu.vn/");
  // mainWindow.loadURL("https://tiemchungcovid19.moh.gov.vn/");
  //   mainWindow.loadURL("https://yte-nghean.vnpthis.vn/")

  //   mainWindow.webContents.on('did-finish-load', function() {
  //     mainWindow.webContents.executeJavaScript(`document.getElementById("tendangnhap").value ="Nan_ttyt_quychau"`);
  //   });

  mainWindow.once("ready-to-show", () => {
    //   mainWindow.webContents.openDevTools();
    mainWindow.maximize();
    mainWindow.show();
    mainWindow.setFullScreen(true);// .fullscreen=true;
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
