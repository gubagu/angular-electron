import {BrowserWindow, ipcMain, shell} from 'electron';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import appConfig from 'electron-settings';

export class PdfUtils {

  static registerPdfEvents() {

    ipcMain.on('save-pdf', (event, docId) => {
      // const exportDir = appConfig.get('invoice.exportDir');
      const exportDir = os.homedir();
      const pdfPath = path.join(exportDir, `${docId}.pdf`);
      const win = BrowserWindow.fromWebContents(event.sender);

      let printOptions;
      if (appConfig.has('general.printOptions')) {
        printOptions = appConfig.get('general.printOptions');
      } else {
        printOptions = {
          landscape: false,
          marginsType: 0,
          printBackground: true,
          printSelectionOnly: false,
        };
        appConfig.set('general.printOptions', printOptions);
        console.log(appConfig.get('general.printOptions'));
      }

      win.webContents.printToPDF(printOptions, (error, data) => {
        if (error) {
          throw error;
        }

        fs.writeFile(pdfPath, data, errFileWrite => {
          if (errFileWrite) {
            throw errFileWrite;
          }
          if (true) {
            // if (appConfig.get('general.previewPDF')) {
            // Open the PDF with default Reader
            const externalPath = 'file://' + pdfPath;
            shell.openExternal(externalPath);
          } else {
            // Show notification
            // revealFileArgs = {
            //   title: 'PDF Exported',
            //   body: 'Click to reveal file.',
            //   location: pdfPath,
            // };
            shell.showItemInFolder(pdfPath);
          }

        });
      });
    });
  }

}



