import {Component, OnInit} from '@angular/core';
import {ElectronService} from './shared/electron.service';
import {TranslateService} from '@ngx-translate/core';

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as AppRoutes from './app-routes';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  showShell: boolean;
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute) {

    translate.setDefaultLang('en');

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
  menus: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));


  ngOnInit(): void {
    this.menus = AppRoutes.routes.filter(menu => (menu.path !== '' && menu.path !== '**' && !menu.outlet));
    this.showShell =  true;
  }

  onPrimaryDeactivate($event) {
    console.log('onPrimaryDeactivate', $event);
  }
  onPrimaryActivate($event) {
    console.log('onPrimaryActivate', $event);
  }

  onNoShellActivate($event) {
    this.showShell = false;
  }
  onNoShellDeactivate($event) {
    this.showShell = true;
  }

}
