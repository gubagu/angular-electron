import {app, BrowserWindow, screen} from 'electron';
import * as path from 'path';
import * as url from 'url';

import {PdfUtils} from './main/utils-pdf';
import {FileUtils} from './main/utils-files';
import appConfig from 'electron-settings';

let mainAppWindow, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createMainWindow() {
  appConfig.deleteAll();
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  const windowOptions: any = {
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, 'src/assets/app-icon/png/512.png')
  };

  PdfUtils.registerPdfEvents();
  FileUtils.registerFileEvents();

  // Create the browser window.
  mainAppWindow = new BrowserWindow(windowOptions);
  appConfig.set('mainAppWindow.id', parseInt(mainAppWindow.id, 10));

  loadWindowUrl(mainAppWindow);

  // Emitted when the window is closed.
  mainAppWindow.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainAppWindow = null;
  });

}

function loadWindowUrl(win, hash = null, devToolsMode = 'right') {
  if (serve) {

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });

    win.loadURL('http://localhost:4000');
    win.webContents.openDevTools({mode: devToolsMode});

  } else {

    const urlObject = {
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true,
      hash: hash
    };

    win.loadURL(url.format(urlObject));
  }
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => createMainWindow());

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainAppWindow === null) {
      createMainWindow();
    }
  });

} catch (e) {
  // Catch Error
  throw e;
}
