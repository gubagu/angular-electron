import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ReportService} from './report.service';
import {Subscription} from 'rxjs';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {DbService} from '../db.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit, OnDestroy {

  @Input() report: string;

  reportData$: Subscription;

  rows: Array<any> = [];
  reportDate: string;
  reorderable = true;
  temp: Array<any> = [];
  expanded: any = {};

  @ViewChild(DatatableComponent, {static: true}) table: DatatableComponent;

  constructor(private reportSvc: ReportService, private dbSvc: DbService) {
  }

  ngOnInit() {
    // this.reportData$ = this.reportSvc.getReportDataHttp(this.report).subscribe((data: any) => {
    //   this.temp = [...data.report];
    //   this.rows = data.report;
    //   this.reportDate = data.reportDate;
    // });

    // const data: any = this.reportSvc.getReportData(this.report);
    // this.temp = [...data.report];
    // this.rows = data.report;
    // this.reportDate = data.reportDate;
    console.log('getting report type ' + this.report + ' from nedb');
    console.log(this.report);
    this.dbSvc.getDocByReportType(this.report).pipe(first())
      .subscribe(docs => {
        this.temp = [...docs];
        this.rows = docs;
      });
  }

  ngOnDestroy(): void {
    // this.reportData$.unsubscribe();
  }

  // getUnique() {
  //   let unique = [...new Set(myArray)];
  // }


  updateFilter(event) {
    const val = event.target.value.trim().toLowerCase();
    // update the rows
    this.rows = this.temp.filter((row) => {
      return this.replaceMissing(row.useCase).toLowerCase().indexOf(val) !== -1 ||
        this.replaceMissing(row.ltcKey).toLowerCase().indexOf(val) !== -1 ||
        this.replaceMissing(row.testName).toLowerCase().indexOf(val) !== -1 ||
        !val;
    });
    this.table.offset = 0;
  }

  private replaceMissing(prop) {
    return prop ? prop : '';
  }


  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Details Toggled', event);
  }

  // generateReport() {
  //   this.temp = [];
  //   this.rows = [];
  //   this.reportDate = '';
  //   this.reportSvc.generateReportData(this.report).subscribe((data: any) => {
  //     this.temp = [...data.report];
  //     this.rows = data.report;
  //     this.reportDate = data.reportDate;
  //     this.table.offset = 0;
  //   });
  // }
}
