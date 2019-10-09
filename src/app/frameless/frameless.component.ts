import {Component, OnInit} from '@angular/core';
import {ElectronService} from '../shared/electron.service';
import {ActivatedRoute} from '@angular/router';
import {BrowserWindow} from 'electron';
import {Title} from '@angular/platform-browser';
import {WindowService} from '../shared/window.service';

@Component({
  selector: 'app-frameless',
  templateUrl: './frameless.component.html',
  styleUrls: ['./frameless.component.scss']
})
export class FramelessComponent implements OnInit {

  browserWindow: BrowserWindow;
  browserWindowName: string;

  constructor(private route: ActivatedRoute,
              private winSvc: WindowService,
              private titleService: Title) {
    this.browserWindowName = this.route.snapshot.data.windowName;
    this.browserWindow = this.winSvc.getWindow(this.browserWindowName);
    this.titleService.setTitle(this.route.snapshot.data.linkText);
  }

  ngOnInit() {
    this.browserWindow.on('close', () => {
      this.closeWindow();
    });
  }


  closeWindow() {
    this.browserWindow.close();
    this.winSvc.settings.delete(`${this.browserWindowName}.id`);
  }

}
