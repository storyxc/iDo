import { app, BrowserWindow, globalShortcut, nativeImage } from "electron";
import path from "path";
import TrayGenerator from "./tray";
import ipcMainHandler from "./ipcMainHandler";

process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
    ? process.env.DIST
    : path.join(process.env.DIST, "../public");

let window: BrowserWindow | null = null;

const createWindow = () => {
    window = new BrowserWindow({
        width: 350,
        height: 500,
        frame: false,
        show: false,
        webPreferences: {
            spellcheck: false,
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        // window.webContents.openDevTools();
        window
            .loadURL(process.env.VITE_DEV_SERVER_URL)
            .then(() => console.log("DEV"));
    } else {
        window
            .loadFile(path.join(process.env.DIST, "index.html"))
            .then(() => console.log("PROD"));
    }
};

app.whenReady().then(() => {
    ipcMainHandler.startListen();
    createWindow();
    const icon = nativeImage.createFromPath(
        path.join(process.env.PUBLIC, "iconTemplate.png")
    );
    const tray = new TrayGenerator(window!);
    tray.createTray(icon);
    tray.initShortcut();
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

app.dock.hide();
