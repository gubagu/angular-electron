import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// NG Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// Electron
import {ElectronService} from './shared/electron.service';
import {DbService} from './shared/db.service';

// Material Design
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select'
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatOption} from '@angular/material/core';
import {LayoutModule} from '@angular/cdk/layout';

// Vendor packages
import {NgxDatatableModule} from '@swimlane/ngx-datatable';



// Application
import {ReportComponent} from './shared/report/report.component';
import {ReportService} from './shared/report/report.service';
import {BeheerComponent} from './beheer/beheer.component';
import {DienstenComponent} from './diensten/diensten.component';
import {CombinedComponent} from './combined/combined.component';
import {ManualComponent} from './manual/manual.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MomentModule} from 'ngx-moment';
import { TestsComponent } from './tests/tests.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FramelessComponent } from './frameless/frameless.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const APP_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'l',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const MATERIAL_MODULES = [
  MatInputModule,
  MatSelectModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  LayoutModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatChipsModule,
  MatPaginatorModule,
];

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    ReportComponent,
    BeheerComponent,
    DienstenComponent,
    CombinedComponent,
    ManualComponent,
    TestsComponent,
    InvoiceComponent,
    FramelessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    NgxDatatableModule,
    MomentModule,
    ...MATERIAL_MODULES
  ],
  providers: [
    ElectronService,
    ReportService,
    DbService,
    {provide: MAT_DATE_LOCALE, useValue: 'nl-NL'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: APP_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
