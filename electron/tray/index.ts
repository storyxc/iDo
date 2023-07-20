import { Tray, BrowserWindow, Menu, MenuItem, globalShortcut } from 'electron';

class TrayGenerator {

    tray: Tray | null;
    window: BrowserWindow | null;

    constructor(window: BrowserWindow) {
        this.tray = null;
        this.window = window
    }

    getWindowPosition() {
        const windowBounds = this.window?.getBounds();
        const trayBounds = this.tray?.getBounds();
        const x = Math.round(trayBounds?.x! + (trayBounds?.width! / 2) - (windowBounds?.width! / 2));
        const y = Math.round(trayBounds?.y! + trayBounds?.height!);
        return { x, y };
    }

    /**
     * Note that although mainWindow is visible by default, we will set it to be invisible later since we don’t want it to appear when the menu bar application runs.
     *
     * In macOS, there are multiple desktops (workspaces), so if you click the Tray icon and show the window, then switch to another desktop and click the icon there again, you should make sure that it does not focus the previously opened window.
     *
     * In order to handle this, we make it visible on all desktops by using the setVisibleOnAllWorkspaces method, then focus the one visible on the active desktop.
     *
     * We hide the rest by passing false to same method:
     */
    showWindow() {
        const position = this.getWindowPosition();
        this.window?.setPosition(position.x, position.y, false);
        this.window?.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
        this.window?.show();
        this.window?.focus();
    }

    toggleWindow() {
        if (this.window?.isVisible()) {
            this.window?.hide();
        } else {
            this.showWindow();
        }
    }

    rightClickMenu() {
        const menu = [
            new MenuItem({
                label: 'Quit',
                click: () => {
                    this.window?.destroy();
                    this.tray?.destroy();
                }
            })
        ]
        this.tray?.popUpContextMenu(Menu.buildFromTemplate(menu));
    }

    /**
     *
     * This final method eventually creates a Tray instance by passing the path to the Tray icon.
     *
     * Create a folder named assets under /server and put your icon file in PNG format there.
     *
     * It’s a rule for macOS that the icon file name should end with Template, hence the name selection of IconTemplate.
     *
     * You need two versions with the @1x and @2x suffixes, which corresponds to 16×16 and 32×32 pixels in size.
     *
     * It is required to enable the setIgnoreDoubleClickEvents method on macOS so that double click events are ignored and every individual click is registered as a single click.
     *
     * Now we need to use the toggleWindow() function to toggle mainWindow whenever the Tray icon is clicked.
     *
     * Likewise, we need to call rightClickMenu when the Tray icon is right clicked in order to display the contextMenu.
     *
     * So we use click and right-click event listeners on our tray object:
     */
    createTray(icon: Electron.NativeImage) {
        this.tray = new Tray(icon);
        this.tray.setIgnoreDoubleClickEvents(true);
        this.tray.on('click', () => {
            this.toggleWindow();
        });
        this.tray.on('right-click', () => {
            this.rightClickMenu();
        });
        this.window?.on('blur', () => {
            this.window?.hide();
        });
    }

    /**
     * We need to register a global shortcut to toggle the window.
     */
    initShortcut(): void {
        const ret = globalShortcut.register('Control+Command+T', () => {
            this.toggleWindow();
        });
        if (!ret) {
            console.log('registration failed')
        }
        // 检查快捷键是否注册成功
        // console.log(globalShortcut.isRegistered('Control+Command+T'))
    }
}

export default TrayGenerator;