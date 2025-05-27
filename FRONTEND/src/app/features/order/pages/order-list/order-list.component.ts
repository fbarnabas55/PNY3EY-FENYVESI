import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../order.module';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.sass'
})

export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  deleteOrder(id: string): void {
    if (confirm('Biztosan törlöd ezt a rendelést?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.orders = this.orders.filter(o => o.id !== id);
      });
    } 
  }


  searchTerm: string = '';

  filteredOrders(): Order[] {
    if (!this.searchTerm.trim()) {
      return this.orders;
    }

    return this.orders.filter(order =>
      order.orderName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  isDark = false;

  toggleTheme(): void {
  this.isDark = !this.isDark;

  // ezután váltjuk a body class-okat
  const body = document.body;
  body.classList.remove('dark-theme', 'light-theme');
  body.classList.add(this.isDark ? 'dark-theme' : 'light-theme');
}


}


