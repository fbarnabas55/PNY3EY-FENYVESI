import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../order/services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.sass'
})
export class StatisticsComponent implements OnInit {
  maxOrder: any = null;
  ordersPerMonthLabels: string[] = [];
  ordersPerMonthChartData: number[] = [];

  projectCountLabels: string[] = [];
  projectCountChartData: number[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.orderService.getMaxOrderThisMonth().subscribe(data => {
      this.maxOrder = data;
    });

    this.orderService.getOrdersPerMonth().subscribe(data => {
      this.ordersPerMonthLabels = data.map(d => d.month);
      this.ordersPerMonthChartData = data.map(d => d.count);
    });

    this.orderService.getOrderWithMostProjectsThisMonth().subscribe(data => {
      this.projectCountLabels = [data.orderName, 'Többi'];
      this.projectCountChartData = [data.projectCount, 100 - data.projectCount]; // csak példa
    });
  }
}
