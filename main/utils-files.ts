import {ipcMain, shell} from 'electron';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import * as appConfig from 'electron-settings';

export class FileUtils {

  static registerFileEvents() {
    ipcMain.on('process-json-file', (event, filePath) => {
      const fileContents = FileUtils.readJsonFile(filePath);
      console.log(fileContents);
    });

    ipcMain.on('reveal-file', (event, location) => {
      shell.showItemInFolder(location);
    });
  }

  static readJsonFile(filePath) {
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents);
    } else {
      return null;
    }
  }

  static getExtension(filename) {
    return filename.split('.').pop();
  }

  // get deep value from JSON
  static getValueFromPath(pathDot, object) {
    const p = pathDot.split('.');
    return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, object);
  }



  static getJsonFilesInPath(filesPath) {
    const files = fs.readdirSync(`${__dirname}/${filesPath}`);
    return files.filter(filename => FileUtils.getExtension(filename) === 'json');
  }

  static saveJsonFile(destination, jsonObj) {
    try {
      fs.writeFileSync(destination, JSON.stringify(jsonObj));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }


  static createDirSync(createDirPath) {
    let dirExists = false;

    try {
      const stats = fs.lstatSync(createDirPath);

      if (stats.isDirectory()) {
        dirExists = true;
      }
    } catch (e) {
      // eat the error because you'll get an error if the dir doesn't exists,
      // in which case we should create the dir
      // logger.warn(e);
    }

    if (!dirExists) {
      try {
        fs.mkdirSync(createDirPath);
      } catch (e) {
        // eat the error
        // logger.warn(e);
      }
    }
  }

  static createFileSync(createFilePath, fileData) {
    let fileExists = false;
    fileData = fileData || '';

    try {
      const stats = fs.lstatSync(createFilePath);

      if (stats.isFile()) {
        fileExists = true;
      }
    } catch (e) {
      // eat the error because you'll get an error if the dir doesn't exists,
      // in which case we should create the dir
    }

    if (!fileExists) {
      try {
        fs.writeFileSync(createFilePath, fileData);
      } catch (e) {
        // eat the error
        // logger.warn(e);
      }
    }
  }

}
