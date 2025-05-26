import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-editor',
  standalone: false,
  templateUrl: './order-editor.component.html',
  styleUrl: './order-editor.component.sass'
})
export class OrderEditorComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) 
  {
    this.form = this.fb.group({
      id:['',Validators.required],
      orderName: ['', Validators.required],
      installationAdress: [''],
      phoneNumber: [''],
      email: ['', [Validators.email]],
      deadline: [new Date().toISOString().substring(0, 10), Validators.required],
    });
  }

  orderIdToEdit: string | null = null;


  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      this.orderIdToEdit = id;
      this.orderService.getOrderById(id).subscribe(order => {
        this.form.patchValue(order);
      });
    }
  });
}

  onSubmit() {
  if (this.form.valid) {
    if (this.orderIdToEdit) {
      // Szerkesztés
      this.orderService.updateOrder(this.orderIdToEdit, this.form.value).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    } else {
      // Új rendelés
      this.orderService.createOrder(this.form.value).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    }
  }
}
}