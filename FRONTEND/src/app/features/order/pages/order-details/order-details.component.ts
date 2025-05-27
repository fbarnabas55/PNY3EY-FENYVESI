import { Component, OnInit } from '@angular/core';
import { Order } from '../../order.module';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.sass'
})


export class OrderDetailsComponent implements OnInit {
  orderId: string = '';
  orderName: string = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadOrder();
  }

  loadOrder(): void {
    this.orderService.getOrderById(this.orderId).subscribe(order => {
      this.orderName = order.orderName;
      // ide később betöltjük a projektek és designokat is
    });
  }
}



