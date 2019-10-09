import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-combined',
  templateUrl: './combined.component.html',
  styleUrls: ['./combined.component.sass']
})
export class CombinedComponent implements OnInit {

  reportType = 'combined';
  constructor() { }

  ngOnInit() {
  }

}
