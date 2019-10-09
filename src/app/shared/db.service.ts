import {Injectable} from '@angular/core';
import {ElectronService} from './electron.service';
import Datastore from 'nedb';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  db: any;
  docById$: Subject<any> = new Subject();
  allDocs$: Subject<any> = new Subject();
  clearedDocs$: Subject<any> = new Subject();
  docByType$: Subject<any> = new Subject();

  constructor(public elecSvc: ElectronService) {
    if (this.elecSvc.isElectron()) {
    const electronRemote = this.elecSvc.remote;
    const databasePath = this.elecSvc.path.join(electronRemote.app.getPath('userData'), 'library.db');
    this.db = new Datastore({
      filename: databasePath,
      autoload: true
    });
    }
  }

  insert(doc) {
    this.db.insert(doc, (err, newDoc) => {
      if (err) {
        console.log(err);
      }
      console.log(newDoc);
    });
  }

  getDocById(id) {
    this.db.findOne({_id: id}, (err, doc) => {
      if (err) {
        console.log(err);
      }
      this.docById$.next(doc);
    });
    return this.docById$;
  }

  getDocByReportType(reportType: string) {
    this.db.find({reportType: reportType}, (err, docs) => {
      if (err) {
        console.log(err);
      }

      this.docByType$.next(docs);
    });
    return this.docByType$;
  }

  getAllDdDocs() {
    this.db.find({}, (err, docs) => {
      if (err) {
        console.log(err);
      }
      this.allDocs$.next(docs);
    });
    return this.allDocs$;
  }

  clearAllDdDocs() {
    this.db.remove({}, { multi: true }, (err, numRemoved) => {
      if (err) {
        console.log(err);
      }
      this.clearedDocs$.next(numRemoved);
    });
    return this.clearedDocs$;
  }

}
