import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diensten',
  templateUrl: './diensten.component.html',
  styleUrls: ['./diensten.component.sass']
})
export class DienstenComponent implements OnInit {
  reportType = 'diensten';
  constructor() { }

  ngOnInit() {
  }

}
