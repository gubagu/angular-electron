import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {AppConfig} from './environments/environment';
import 'hammerjs';


if (AppConfig.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {preserveWhitespaces: true})
  .catch(err => console.error(err));
