/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { contextBridge, ipcRenderer } from "electron";
import { IpcRendererEvent } from "electron/main";

// We are using the context bridge to securely expose NodeAPIs.
// Please note that many Node APIs grant access to local system resources.
// Be very cautious about which globals and APIs you expose to untrusted remote content.
contextBridge.exposeInMainWorld("electron", {
  sayHello: () => ipcRenderer.send("message", "hi from next"),
  receiveHello: (handler: (event: IpcRendererEvent, ...args: any[]) => void) =>
    ipcRenderer.on("message", handler),
  stopReceivingHello: (
    handler: (event: IpcRendererEvent, ...args: any[]) => void
  ) => ipcRenderer.removeListener("message", handler),
  exitApp: () => ipcRenderer.send("message", { type: "exit" }),
  backToSetting: () => ipcRenderer.send("message", { type: "backToSetting" }),
  startFlowText: (option: FlowTextOption) =>
    ipcRenderer.send("message", { type: "startFlowText", payload: option }),
  receiveMessage: (func: any) => {
    ipcRenderer.on("message-from-websocket", (event, ...args) => {
      console.log(event);
      func(args);
    });
    return () => ipcRenderer.removeListener("message-from-websocket", func);
  },
  sendError: (error: any) =>
    ipcRenderer.send("message", { type: "error", payload: error }),
});
