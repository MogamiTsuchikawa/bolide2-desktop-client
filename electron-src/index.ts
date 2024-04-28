// Native
import { join } from "path";
import { format } from "url";
// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, screen } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";

const isMac = process.platform === "darwin";

if (isMac) {
  app.dock.hide();
}

let settingWindow: BrowserWindow | null = null;
let flowTextWindow: BrowserWindow | null = null;

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");

  settingWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  const url = isDev
    ? "http://localhost:8000/setting"
    : format({
        pathname: join(__dirname, "../renderer/out/setting/index.html"),
        protocol: "file:",
        slashes: true,
      });

  settingWindow.loadURL(url);
});

const openFlowTextWindow = (option: FlowTextOption) => {
  settingWindow?.hide();

  flowTextWindow = new BrowserWindow({
    transparent: true,
    frame: false,
    resizable: false,
    hasShadow: false,
    width: screen.getPrimaryDisplay().workAreaSize.width,
    height: screen.getPrimaryDisplay().workAreaSize.height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });
  flowTextWindow.setIgnoreMouseEvents(true);
  flowTextWindow.setAlwaysOnTop(true, "screen-saver"); // 常に最前面に表示する
  flowTextWindow.setVisibleOnAllWorkspaces(true);
  flowTextWindow.setPosition(0, 0);
  const queryStr = new URLSearchParams({
    fontSize: option.fontSize.toString(),
    fontColors: option.fontColors.join(","),
    flowAreas: option.flowAreas.join(","),
    testMode: option.testMode ? "true" : "false",
    windowHight: screen.getPrimaryDisplay().workAreaSize.height.toString(),
    windowWidth: screen.getPrimaryDisplay().workAreaSize.width.toString(),
  }).toString();
  const url = isDev
    ? "http://localhost:8000/flow-text?" + queryStr
    : format({
        pathname: join(__dirname, "../renderer/out/flow-text.html?" + queryStr),
        protocol: "file:",
        slashes: true,
      });
  flowTextWindow.loadURL(url);
};

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, anyMessage: any) => {
  const message = anyMessage as Message;
  switch (message.type) {
    case "exit":
      app.quit();
      break;
    case "startFlowText":
      const flowTextMessage = anyMessage as FlowTextMessage;

      openFlowTextWindow(flowTextMessage.payload);
      break;
    case "backToSetting":
      flowTextWindow?.close();
      settingWindow?.show();
      break;
  }
  console.log(event);
});
