import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderEditorComponent } from './features/order/pages/order-editor/order-editor.component';
import { OrderDetailsComponent } from './features/order/pages/order-details/order-details.component';
import { StatisticsComponent } from './features/statistics/pages/statistics/statistics.component';

const routes: Routes = [
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/order/order.module').then(m => m.OrderModule)
  },
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  {
  path: 'orders/new',
  component: OrderEditorComponent
  },
  {
    path: 'orders/edit/:id',
    component: OrderEditorComponent
  },

  
  { path: 'orders/:id/details', component: OrderDetailsComponent },

  {path:'statistics', component: StatisticsComponent},

  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
