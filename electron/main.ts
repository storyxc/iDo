import { app, nativeImage, BrowserWindow } from 'electron';
import path from 'path';
import TrayGenerator from './tray';


process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let window: BrowserWindow | null = null;

const createWindow = () => {
    window = new BrowserWindow({
        width: 400,
        height: 400,
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            webviewTag: true,
        },
    });

    if (process.env.VITE_DEV_SERVER_URL) {
        window.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        window.loadFile(path.join(process.env.DIST, 'index.html'));
    }
};

app.whenReady().then(() => {
    createWindow();
    const icon = nativeImage.createFromPath(path.join(process.env.PUBLIC, 'icon.png'));
    const tray = new TrayGenerator(window!);
    tray.createTray(icon);

});

app.dock.hide();