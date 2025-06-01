import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderEditorComponent } from './pages/order-editor/order-editor.component';


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent,
    OrderEditorComponent
    
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class OrderModule { }



export interface Project {
  id?: string;
  orderId: string;
  projectName: string;
  description: string;
  projectManager: string;
  price: number;
  packageDemand: 'Boxed' | 'Foiled' | 'Stocked';
}


export interface SignDesign {
  id?: string;
  orderId: string;
  description: string;
  fixing: string;
  decor: string;
  width: number;
  height: number;
  material: 'Steel' | 'Aluminium' | 'StainlessSteel' | 'Plastic';
  brightness: 'Low' | 'Medium' | 'High';
  lightings: 'LED' | 'Neon' | 'Halogen';
}




export interface Order {
  id: string;
  orderName: string;
  installationAdress: string;
  phoneNumber: string;
  email: string;
  deadline: string;     // Date string (ISO formátumú), pl. "2025-05-18T00:00:00"
  startDate: string;
  projects?: Project[];     // Később lecseréljük pontosabb típusra
  designs?: any[];
}

