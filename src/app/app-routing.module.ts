import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {NasaAPODComponent} from './nasa-apod.component';
import {CameraComponent} from './camera.component';
import {PaymentComponent} from './payment.component';
import {TransferComponent} from './transfer.component';
import {CashSendComponent} from './cash-send.component';
import {AccountComponent} from './account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'apod',
    component: NasaAPODComponent
  },
  {
    path: 'camera',
    component: CameraComponent
  },
  {
    path: 'pay',
    component: PaymentComponent
  },
  {
    path: 'transfer',
    component: TransferComponent
  },
  {
    path: 'cashsend',
    component: CashSendComponent
  },
  {
    path: 'acc/:id',
    component: AccountComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
