import {Injectable} from '@angular/core';
// the resulting javascript file will look as if you never imported the module at all.
import {
  ipcRenderer,
  webFrame,
  remote,
  shell,
  clipboard,
  ipcMain,
  desktopCapturer,
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions
} from 'electron';

import * as childProcess from 'child_process';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import electronSettings from 'electron-settings';
import * as url from 'url';

import {AppConfig} from '../../environments/environment';
import {ElectronService} from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class WindowService extends ElectronService {


  constructor() {
    super();
  }


  windowStateKeeper(windowName) {
    let window, windowState;

    function setBounds() {
      // Restore from appConfig
      if (this.settings.has(`${windowName}.state`)) {
        windowState = this.settings.get(`${windowName}.state`);
        return;
      }
      // Default
      windowState = {
        x: undefined,
        y: undefined,
        width: 800,
        height: 600,
      };
    }

    function saveState() {
      if (!windowState.isMaximized) {
        windowState = window.getBounds();
      }
      windowState.isMaximized = window.isMaximized();
      this.settings.set(`${windowName}.state`, windowState);
    }

    function track(win: BrowserWindow) {
      window = win;
      ['resize', 'move'].forEach((event: any) => {
        win.on(event, saveState);
      });
    }

    setBounds();

    return {
      x: windowState.x,
      y: windowState.y,
      width: windowState.width,
      height: windowState.height,
      isMaximized: windowState.isMaximized,
      track,
    };
  }


  setWindow(windowName: string, id: string): number {
    const windowId = parseInt(id, 10);
    this.settings.set(`${windowName}.id`, windowId);
    return windowId;
  }

  getWindow(windowName: string): BrowserWindow {
    return this.BrowserWindow.fromId(this.settings.get(`${windowName}.id`));
  }

  createWindowFromRoute(windowName: string, route: string, windowOptions: BrowserWindowConstructorOptions = null): BrowserWindow {

    const defaultWindowOptions = Object.assign({},
        {
          x: undefined,
          y: undefined,
          width: 1000,
          height: 800,
          frame: true,
          center: true,
          webPreferences: {
            nodeIntegration: true
          },
          show: false,
          icon: path.join(__dirname, '../../../../../../src/assets/app-icon/favicon.512x512.png')
        },
        windowOptions
    );

    const createdWindow: any = new this.BrowserWindow(defaultWindowOptions);
    this.setWindow(windowName, createdWindow.id);

    const urlObject = {
      pathname: '',
      protocol: '',
      slashes: true,
      hash: route
    };

    if (this.devMode) {
      urlObject.pathname = 'localhost:4000/';
      urlObject.protocol = 'http';
      return createdWindow.loadURL(url.format(urlObject));
    } else {
      urlObject.pathname = this.path.join(__dirname, 'index.html');
      urlObject.protocol = 'file';
      return createdWindow.loadURL(url.format(urlObject));
    }
  }

  createShowWindow(windowName: string, route: string, windowOptions: BrowserWindowConstructorOptions) {
    if (isNaN(this.settings.get(`${windowName}.id`))) {
      this.createWindowFromRoute(windowName, route, windowOptions);
      this.getWindow(windowName).show();
    } else {
      this.getWindow(windowName).focus();
    }
  }

}
