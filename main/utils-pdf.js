"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var os = __importStar(require("os"));
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var electron_settings_1 = __importDefault(require("electron-settings"));
var PdfUtils = /** @class */ (function () {
    function PdfUtils() {
    }
    PdfUtils.registerPdfEvents = function () {
        electron_1.ipcMain.on('save-pdf', function (event, docId) {
            // const exportDir = appConfig.get('invoice.exportDir');
            var exportDir = os.homedir();
            var pdfPath = path.join(exportDir, docId + ".pdf");
            var win = electron_1.BrowserWindow.fromWebContents(event.sender);
            var printOptions;
            if (electron_settings_1.default.has('general.printOptions')) {
                printOptions = electron_settings_1.default.get('general.printOptions');
            }
            else {
                printOptions = {
                    landscape: false,
                    marginsType: 0,
                    printBackground: true,
                    printSelectionOnly: false,
                };
                electron_settings_1.default.set('general.printOptions', printOptions);
                console.log(electron_settings_1.default.get('general.printOptions'));
            }
            win.webContents.printToPDF(printOptions, function (error, data) {
                if (error) {
                    throw error;
                }
                fs.writeFile(pdfPath, data, function (errFileWrite) {
                    if (errFileWrite) {
                        throw errFileWrite;
                    }
                    if (true) {
                        // if (appConfig.get('general.previewPDF')) {
                        // Open the PDF with default Reader
                        var externalPath = 'file://' + pdfPath;
                        electron_1.shell.openExternal(externalPath);
                    }
                    else {
                        // Show notification
                        // revealFileArgs = {
                        //   title: 'PDF Exported',
                        //   body: 'Click to reveal file.',
                        //   location: pdfPath,
                        // };
                        electron_1.shell.showItemInFolder(pdfPath);
                    }
                });
            });
        });
    };
    return PdfUtils;
}());
exports.PdfUtils = PdfUtils;
//# sourceMappingURL=utils-pdf.js.map