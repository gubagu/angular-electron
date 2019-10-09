import {Injectable} from '@angular/core';
import {ipcMain, shell} from 'electron';
import * as fs from 'fs';
import {ElectronService} from './electron.service';
import {DomSanitizer} from '@angular/platform-browser';
import * as FileSaver from 'file-saver'; // npm i --save file-saver


@Injectable({
  providedIn: 'root'
})
export class FileUtilsService extends ElectronService {
  constructor(private sanitizer: DomSanitizer) {
    super();

  }

  registerFileEvents() {
    this.ipcMain.on('process-json-file', (event, filePath) => {
      const fileContents = this.readJsonFile(filePath);
    });

    this.ipcMain.on('reveal-file', (event, location) => {
      this.shell.showItemInFolder(location);
    });
  }

  readJsonFile(filePath) {
    if (this.fs.existsSync(filePath)) {
      const fileContents = this.fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents);
    } else {
      return null;
    }
  }

  getExtension(filename) {
    return filename.split('.').pop();
  }

  /**
   * Get values from deep JSON object without nasty errors.
   * @param pathDot provide the path to the object
   * @param object provide the object that should be dug.
   */
  getValueFromPath(pathDot, object): (any | null) {
    const p = pathDot.split('.');
    return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, object);
  }

  getJsonFilesInPath(filesPath) {
    const files = this.fs.readdirSync(this.path.join(__dirname, filesPath));
    return files.filter(filename => this.getExtension(filename) === 'json');
  }

  saveJsonFile(destination: string, jsonObj) {
    try {
      const path = this.path.join(this.app.getAppPath(), destination);
      console.log();
      this.fs.writeFileSync(path, JSON.stringify(jsonObj));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  createDirSync(createDirPath) {
    let dirExists = false;

    try {
      const stats = this.fs.lstatSync(createDirPath);

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
        this.fs.mkdirSync(createDirPath);
      } catch (e) {
        // eat the error
        // logger.warn(e);
      }
    }
  }

  createFileSync(createFilePath, fileData) {
    let fileExists = false;
    fileData = fileData || '';

    try {
      const stats = this.fs.lstatSync(createFilePath);
      if (stats.isFile()) {
        fileExists = true;
      }
    } catch (e) {
      // eat the error because you'll get an error if the dir doesn't exists,
      // in which case we should create the dir
    }

    if (!fileExists) {
      try {
        this.fs.writeFileSync(createFilePath, fileData);
      } catch (e) {
        // eat the error
      }
    }
  }


  getDirectoryFiles(directory = '/') {
    return this.fs.readdirSync(directory);
  }

  openFileManager() {
    this.shell.showItemInFolder(this.os.homedir());
  }

  downloadFile(data, filename, options?): void {
    const blobOpts = Object.assign({}, {type: 'application/json'}, options);
    const blob = new Blob([data], blobOpts);
    FileSaver.saveAs(blob, filename);
  }
}
