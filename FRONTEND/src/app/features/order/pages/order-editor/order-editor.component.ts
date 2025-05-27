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
  orderIdToEdit: string | null = null;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      orderName: ['', Validators.required],
      installationAdress: [''],
      phoneNumber: [''],
      email: ['', [Validators.email]],
      deadline: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');

    if (id) {
      this.orderIdToEdit = id;

      this.orderService.getOrderById(id).subscribe({
        next: (order) => {
          // Feltöltjük a formot az adatokkal
          this.form.patchValue({
            id: order.id,
            orderName: order.orderName,
            installationAdress: order.installationAdress,
            phoneNumber: order.phoneNumber,
            email: order.email,
            deadline: order.deadline?.substring(0, 16), // csak ha datetime-local input!
          });
        },
        error: (err) => {
          console.error('Hiba az adatok betöltésekor:', err);
        }
      });
    }
  });
}


  onSubmit(): void {
  if (this.form.invalid) {
    alert('❗ Kérlek tölts ki minden kötelező mezőt!');
    return;
  }

  const order = this.form.value;

  if (!this.orderIdToEdit) {
    // Új rendelés létrehozása
    this.orderService.createOrder(order).subscribe({
      next: () => {
        console.log('✅ Sikeres rendelés létrehozás');
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('❌ Hiba a rendelés létrehozásakor:', err);
        alert('❌ Nem sikerült létrehozni a rendelést. Próbáld újra.');
      }
    });
  } else {
    // Meglévő rendelés frissítése
    this.orderService.updateOrder(this.orderIdToEdit, order).subscribe({
      next: () => {
        console.log('✅ Sikeres rendelés frissítés');
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('❌ Hiba a rendelés frissítésekor:', err);
        alert('❌ Nem sikerült frissíteni a rendelést.');
      }
    });
  }
}

}
