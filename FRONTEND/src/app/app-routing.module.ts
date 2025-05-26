import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderEditorComponent } from './features/order/pages/order-editor/order-editor.component';

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
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
