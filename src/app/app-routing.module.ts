import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import * as AppRoutes from './app-routes';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes.routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

