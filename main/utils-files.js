"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var fs = __importStar(require("fs"));
var FileUtils = /** @class */ (function () {
    function FileUtils() {
    }
    FileUtils.registerFileEvents = function () {
        electron_1.ipcMain.on('process-json-file', function (event, filePath) {
            var fileContents = FileUtils.readJsonFile(filePath);
            console.log(fileContents);
        });
        electron_1.ipcMain.on('reveal-file', function (event, location) {
            electron_1.shell.showItemInFolder(location);
        });
    };
    FileUtils.readJsonFile = function (filePath) {
        if (fs.existsSync(filePath)) {
            var fileContents = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(fileContents);
        }
        else {
            return null;
        }
    };
    FileUtils.getExtension = function (filename) {
        return filename.split('.').pop();
    };
    // get deep value from JSON
    FileUtils.getValueFromPath = function (pathDot, object) {
        var p = pathDot.split('.');
        return p.reduce(function (xs, x) { return (xs && xs[x]) ? xs[x] : null; }, object);
    };
    FileUtils.getJsonFilesInPath = function (filesPath) {
        var files = fs.readdirSync(__dirname + "/" + filesPath);
        return files.filter(function (filename) { return FileUtils.getExtension(filename) === 'json'; });
    };
    FileUtils.saveJsonFile = function (destination, jsonObj) {
        try {
            fs.writeFileSync(destination, JSON.stringify(jsonObj));
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    };
    FileUtils.createDirSync = function (createDirPath) {
        var dirExists = false;
        try {
            var stats = fs.lstatSync(createDirPath);
            if (stats.isDirectory()) {
                dirExists = true;
            }
        }
        catch (e) {
            // eat the error because you'll get an error if the dir doesn't exists,
            // in which case we should create the dir
            // logger.warn(e);
        }
        if (!dirExists) {
            try {
                fs.mkdirSync(createDirPath);
            }
            catch (e) {
                // eat the error
                // logger.warn(e);
            }
        }
    };
    FileUtils.createFileSync = function (createFilePath, fileData) {
        var fileExists = false;
        fileData = fileData || '';
        try {
            var stats = fs.lstatSync(createFilePath);
            if (stats.isFile()) {
                fileExists = true;
            }
        }
        catch (e) {
            // eat the error because you'll get an error if the dir doesn't exists,
            // in which case we should create the dir
        }
        if (!fileExists) {
            try {
                fs.writeFileSync(createFilePath, fileData);
            }
            catch (e) {
                // eat the error
                // logger.warn(e);
            }
        }
    };
    return FileUtils;
}());
exports.FileUtils = FileUtils;
//# sourceMappingURL=utils-files.js.map