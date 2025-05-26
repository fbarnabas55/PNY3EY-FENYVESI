import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.form = this.fb.group({
      id:['',Validators.required],
      orderName: ['', Validators.required],
      installationAdress: [''],
      phoneNumber: [''],
      email: ['', [Validators.email]],
      deadline: [new Date().toISOString().substring(0, 10), Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.orderService.createOrder(this.form.value).subscribe({
        next: () => this.router.navigate(['/orders']),
        error: (err) => console.error('Rendelés mentési hiba:', err)
      });
    }
  }
}