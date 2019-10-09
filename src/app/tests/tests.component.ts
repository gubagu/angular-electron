import {Component, OnDestroy} from '@angular/core';
import {DbService} from '../shared/db.service';
import {ElectronService} from '../shared/electron.service';
import {WindowService} from '../shared/window.service';
import {Subject} from 'rxjs';
import {first} from 'rxjs/operators';


import * as allData from '../../assets/reports-data/all.json';
import * as beheerData from '../../assets/reports-data/beheer.json';
import * as dienstenData from '../../assets/reports-data/diensten.json';
import * as manualData from '../../assets/reports-data/manual.json';



@Component({
  selector: 'app-home',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnDestroy {
  result: any;
  allDocs: any;
  allDocsByType: any;

  fileToUpload: File = null;

  private readonly ngUnsubscribe: Subject<any> = new Subject();

  constructor(private dbSvc: DbService,
              private winSvc: WindowService,
              public elSvc: ElectronService) {
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  insertDoc(doc) {
    this.dbSvc.insert(JSON.parse(doc));
  }

  getDbRecordById(id) {
    this.dbSvc.getDocById(id)
        .pipe(first())
        .subscribe((doc) => {
          console.log(doc);
          this.result = doc;
        });
  }

  getAllRecors() {
    this.dbSvc.getAllDdDocs()
        .pipe(first())
        .subscribe(docs => {
          console.log(docs);
          this.allDocs = docs;
        });
  }

  getDocByReportType(reportType) {
    this.dbSvc.getDocByReportType(reportType)
        .pipe(first())
        .subscribe(docs => {
          console.log(docs);
          this.allDocsByType = docs;
        });
  }

  removeAllRecors() {
    this.dbSvc.clearAllDdDocs()
        .pipe(first())
        .subscribe(numRemoved => {
          console.log('Removed documents', numRemoved);
          this.result = null;
          this.allDocs = null;
        });
  }

  insertRepportsInDb() {
    const combined = (<any>allData).report.map((row) => Object.assign({}, row, {reportType: 'combined'}));

    const beheer = (<any>beheerData).report.map((row) => Object.assign({}, row, {reportType: 'beheer'}));

    const diensten = (<any>dienstenData).report.map((row) => Object.assign({}, row, {reportType: 'diensten'}));

    const manual = (<any>manualData).report.map((row) => Object.assign({}, row, {reportType: 'manual'}));

    const allArr = [combined, beheer, diensten, manual];

    allArr.forEach(reportType => {
      this.dbSvc.insert(reportType);
    });

  }

  openFileManager() {
    this.elSvc.openFileManager();
  }

  openExternalLink($event) {
    $event.preventDefault();
    this.elSvc.openExternalLink($event.target.href);
  }

  showNotification(title: string, body: string) {
    console.log('show notification');
    const note = {
      title: title || 'This is the title of the Notification',
      body: body || 'Here comes the lil bit longer text with explanation about the situation'
    };
    this.elSvc.showNotification(note);
  }

  openFramelessWindow() {
    const windowOptions = {
      x: undefined,
      y: undefined,
      width: 800,
      height: 600,
      kiosk: true,
      frame: false,
      center: false,
      resizable: false,
      movable: false,
      icon: this.winSvc.path.join(__dirname, '../../../../../../src/assets/app-icon/png/512.png'),
      backgroundColor: '#6fba69',
    };
    this.winSvc.createShowWindow('framelessWindow', '(noshell:frameless)', windowOptions);
  }

  openNgWindow() {
    const windowName = 'invoiceWindow';
    this.winSvc.createWindowFromRoute(windowName, '(noshell:invoice)');
    const win = this.winSvc.getWindow(windowName);
    win.once('ready-to-show', () => {
      win.show();
      win.webContents.openDevTools();
    });

  }

  processFiles($event) {
    this.fileToUpload = $event.target.files.item(0);
    this.elSvc.ipcRenderer.send('process-json-file', this.fileToUpload.path);
  }

  getAllSettings() {
   console.log(this.winSvc.settings.getAll());
  }

  deleteAllSettings() {
    this.winSvc.settings.deleteAll();
    console.log('deleted all electron settings');
  }

}
