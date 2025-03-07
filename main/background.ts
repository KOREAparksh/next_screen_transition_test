import { app, BrowserWindow, ipcMain } from "electron";
import serve from "electron-serve";
import { CONFIG, getAssetPath, RESOURCES } from "./helpers/static";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = new BrowserWindow({
    width: CONFIG.defaultWidth,
    height: CONFIG.defaultHeight,
    icon: getAssetPath("icon.png"),
    webPreferences: {
      preload: RESOURCES.preload,
      // ...
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);

    // 개발 환경에서만 개발자 도구 표시
    if (CONFIG.enableDevTools) {
      mainWindow.webContents.openDevTools();
    }
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});
