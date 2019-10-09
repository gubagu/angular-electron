import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


import all from '../../../assets/reports-data/combined.json';
import beheer from '../../../assets/reports-data/beheer.json';
import diensten from '../../../assets/reports-data/diensten.json';
import manual from '../../../assets/reports-data/manual.json';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {
  }

  getReportDataHttp(report: string) {
    return this.http.get(`/assets/reports-data/${report}.json`);
  }

  getReportData(report) {
    switch (report) {
      case 'all':
        return all;
      case 'beheer':
        return beheer;
      case 'diensten':
        return diensten;
      case 'manual':
        return manual;
    }
  }

  generateReportData(report: string) {
    console.log(`generate ${report}`);
    return this.http.post('/rest/v1/reports', {generate: report});
  }

}
