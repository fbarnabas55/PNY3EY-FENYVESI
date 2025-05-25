import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { OrderEditorComponent } from './pages/order-editor/order-editor.component';

const routes: Routes = [
  {path: '', component:OrderListComponent},
  {path:':id', component:OrderDetailsComponent},
  {path:'new', component:OrderEditorComponent},
  {path:'edit/:id',component:OrderEditorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
