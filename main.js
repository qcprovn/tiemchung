const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      partition: "QCPRO", //persist:
    },
  });

  mainWindow.loadURL(
    "https://bachngocsach.com/reader/vu-luyen-dien-phong-convert/cqki"
  );
  // mainWindow.loadURL("https://tiemchungcovid19.moh.gov.vn/");
  //   mainWindow.loadURL("https://yte-nghean.vnpthis.vn/")

  //   mainWindow.webContents.on('did-finish-load', function() {
  //     mainWindow.webContents.executeJavaScript(`document.getElementById("tendangnhap").value ="Nan_ttyt_quychau"`);
  //   });

  app.on("login", (event, webContents, request, authInfo, cb) =>
    tryProxyLogin(webContents, event, request, authInfo, cb)
  );

  /**
   *
   * @param {Electron.webContents} webContents
   * @param {Electron.Event} event
   * @param {Electron.Request} request
   * @param {Electron.AuthInfo} authInfo
   * @param {(username:string,password:string)=>void} cb
   */
  const tryProxyLogin = (webContents, event, request, authInfo, cb) => {
    try {
      const contentId = webContents.id;

      const { username, password } = {
        username: XXXXX,
        password: XXXXX,
      };

      if (authInfo.isProxy && username && password) {
        //temp solution about this issue
        //https://github.com/electron/electron/issues/16010

        if (!authInfo.realm) {
          setTimeout(() => {
            webContents.reload();
          }, 500);
          return;
        }

        const { country, sessionId } = {
          country: "XXXXX",
          sessionID: "xxxxxxx-xxxxxxx",
        };

        if (country && sessionId) {
          event.preventDefault();
          console.debug(
            "proxy ready to login",
            `customer-${username}-cc-${country}-sessid-${sessionId}`
          );

          cb(
            `customer-${username}-cc-${country}-sessid-${sessionId}-${Date.now()}`,
            password
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
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
