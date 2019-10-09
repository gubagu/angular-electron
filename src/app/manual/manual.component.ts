import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.sass']
})
export class ManualComponent implements OnInit {
  reportType = 'manual';
  constructor() { }

  ngOnInit() {
  }

}


