import {Injectable} from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
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
  NotificationConstructorOptions,
  BrowserWindowConstructorOptions
} from 'electron';

import * as childProcess from 'child_process';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import electronSettings from 'electron-settings';
import * as url from 'url';

import {AppConfig} from '../../environments/environment';




// declare global {
//   interface Window { window: any; }
// }

interface Notification {
  title: string;
  body: string;
}


@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  shell: typeof shell;
  clipboard: typeof clipboard;
  ipcMain: typeof ipcMain;
  desktopCapturer: typeof desktopCapturer;
  screen: typeof screen;
  BrowserWindow: typeof BrowserWindow;
  settings: typeof electronSettings;

  childProcess: typeof childProcess;
  os: typeof os;
  fs: typeof fs;
  path: typeof path;
  devMode: boolean;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.shell = window.require('electron').shell;
      this.clipboard = window.require('electron').clipboard;
      this.ipcMain = window.require('electron').ipcMain;
      this.desktopCapturer = window.require('electron').desktopCapturer;
      this.screen = window.require('electron').remote.screen;
      this.BrowserWindow = window.require('electron').remote.BrowserWindow;
      this.settings = window.require('electron-settings');

      this.childProcess = window.require('child_process');
      this.os = window.require('os');
      this.fs = window.require('fs');
      this.path = window.require('path');
      this.devMode = !AppConfig.production;
    }
  }

  isElectron() {
    return window && window.process && window.process.type;
  }

  getDirectoryFiles(directory = '/') {
    return this.fs.readdirSync(directory);
  }

  openFileManager() {
    this.shell.showItemInFolder(this.os.homedir());
  }

  openExternalLink(externalUrl: string) {
    return this.shell.openExternal(externalUrl);
  }

  showNotification(notification: NotificationConstructorOptions) {
    const myNotification = new (<any>window).Notification(notification.title, notification);
  }


}
