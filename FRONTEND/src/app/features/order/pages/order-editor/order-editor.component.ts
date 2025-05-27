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
  form!: FormGroup;
  orderIdToEdit: string | null = null;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', Validators.required],
      orderName: ['', Validators.required],
      installationAdress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      deadline: ['', Validators.required]
    });

    this.orderIdToEdit = this.route.snapshot.paramMap.get('id');

    if (this.orderIdToEdit) {
      this.orderService.getOrderById(this.orderIdToEdit).subscribe(order => {
        this.form.patchValue(order);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (!this.orderIdToEdit) {
      this.orderService.createOrder(formValue).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    } else {
      this.orderService.updateOrder(this.orderIdToEdit, formValue).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    }
  }
}

