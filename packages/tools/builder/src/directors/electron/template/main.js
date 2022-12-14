const electron = require("electron");
const path = require("path");
const url = require("url");
const logger = require("./logger");

const { app, BrowserWindow, dialog } = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// The server process
const MAX_CHECK_COUNT = 100;
let serverProcess;

function startServer() {
  // const server = `${path.join(app.getAppPath(), "..", "..", JAR)}`;
  // logger.info(`Launching server with jar ${server} at port ${port}...`);

  serverProcess = require("child_process").spawn("npm", ["run","start-server"], {
    cwd: process.cwd()
  });

  serverProcess.stdout.on("data", logger.server);
  serverProcess.stderr.on("data", logger.server);

  if (serverProcess.pid) {
    logger.info("Server PID: " + serverProcess.pid);
  } else {
    logger.error("Failed to launch server process.");
  }
}

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false
    }
  });

  // and load the splash screen of the app
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "splash.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function loadHomePage(baseUrl) {
  logger.info(`Loading home page at ${baseUrl}`);
  // check server health and switch to main page
  checkCount = 0;
  const axios = require("axios");
  setTimeout(function cycle() {
    axios
      .get(`${baseUrl}`)
      .then(response => {
        mainWindow.loadURL(`${baseUrl}?_=${Date.now()}`);
      })
      .catch(e => {
        if (e.code === "ECONNREFUSED") {
          if (checkCount < MAX_CHECK_COUNT) {
            checkCount++;
            setTimeout(cycle, 1000);
            logger.info(checkCount)
          } else {
            dialog.showErrorBox(
              "Server timeout",
              `UI does not receive server response for ${MAX_CHECK_COUNT} seconds.`
            );
            app.quit();
          }
        } else {
          logger.error(e);
          dialog.showErrorBox(
            "Server error",
            "UI receives an error from server."
          );
          app.quit();
        }
      });
  }, 200);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", function() {
  logger.info("###################################################");
  logger.info("#                Application Start                #");
  logger.info("###################################################");
  // Create window first to show splash before starting server
  createWindow();

  // if (isDev) {
  //   // Assume the webpack dev server is up at port 9000
  //   loadHomePage("http://localhost:3000");
  // } else {
  // Start server at an available port (prefer 8080)
  // findPort(8080, function(err, port) {
  // logger.info(`Starting server at port ${port}`);
  startServer();
  loadHomePage(`http://localhost:3001`);
  // });
  // }
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

app.on("will-quit", event => {
  if (serverProcess) {
    logger.info(`Killing server process ${serverProcess.pid}`);
    const kill = require("tree-kill");
    event.preventDefault();
    kill(serverProcess.pid, "SIGTERM", function(err) {
      if (err) {
        logger.error(err);
      } else {
        logger.info("Server process killed");
        serverProcess = null;
        app.quit();
      }
    });
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
