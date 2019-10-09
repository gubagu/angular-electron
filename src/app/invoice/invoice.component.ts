import {Component, OnInit} from '@angular/core';
import {ElectronService} from '../shared/electron.service';
import {ActivatedRoute} from '@angular/router';
import {BrowserWindow} from 'electron';
import {Title} from '@angular/platform-browser';
import {WindowService} from '../shared/window.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
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

  savePDF() {
    this.winSvc.ipcRenderer.send('save-pdf', 'ugabuga');
  }

  closeWindow() {
    this.browserWindow.close();
    this.winSvc.settings.delete(`${this.browserWindowName}.id`);
  }

}
