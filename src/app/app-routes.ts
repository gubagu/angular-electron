import {Routes} from '@angular/router';
import {BeheerComponent} from './beheer/beheer.component';
import {DienstenComponent} from './diensten/diensten.component';
import {CombinedComponent} from './combined/combined.component';
import {ManualComponent} from './manual/manual.component';
import {TestsComponent} from './tests/tests.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {FramelessComponent} from './frameless/frameless.component';


export const routes: Routes = [
  {
    path: 'report-combined',
    component: CombinedComponent,
    data: {
      linkText: 'Combined'
    }
  },
  {
    path: 'report-manual',
    component: ManualComponent,
    data: {
      linkText: 'Manual'
    }
  },
  {
    path: 'report-beheer',
    component: BeheerComponent,
    data: {
      linkText: 'Beheer'
    }
  },
  {
    path: 'report-diensten',
    component: DienstenComponent,
    data: {
      linkText: 'Diensten'
    }
  },
  {
    path: 'tests',
    component: TestsComponent,
    data: {
      linkText: 'Electron API tests'
    }
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    data: {
      linkText: 'Invoice preview',
      windowName: 'invoiceWindow',
    },
    outlet: 'noshell'
  },
  {
    path: 'frameless',
    component: FramelessComponent,
    data: {
      linkText: 'Frameless',
      windowName: 'framelessWindow',
    },
    outlet: 'noshell'
  },
  {
    path: '',
    redirectTo: 'tests',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: TestsComponent
  }
];
