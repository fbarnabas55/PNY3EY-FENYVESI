import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../order/services/order.service';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.sass'
})
export class StatisticsComponent implements OnInit {
  maxOrder: { name: string; amount: number } | null = null;

  // Oszlopdiagram adatok
  ordersPerMonthChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Rendelések száma',
        data: [],
        backgroundColor: '#0d6efd'
      }
    ]
  };

  ordersPerMonthChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        }
      }
    }
  };

  // Kördiagram adatok
  projectCountChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        label: 'Projekt szám',
        data: [],
        backgroundColor: ['#0d6efd', '#6610f2', '#198754', '#ffc107', '#dc3545']
      }
    ]
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadMaxOrderThisMonth();
    this.loadOrdersPerMonth();
    this.loadOrderWithMostProjects();
  }

  loadMaxOrderThisMonth(): void {
    this.orderService.getMaxOrderThisMonth().subscribe(data => {
      this.maxOrder = {
        name: data.orderName,
        amount: data.totalValue
      };
    });
  }

  loadOrdersPerMonth(): void {
    this.orderService.getOrdersPerMonth().subscribe(data => {
      this.ordersPerMonthChartData.labels = data.map(d =>
        `${d.year}.${String(d.month).padStart(2, '0')}`
      );
      this.ordersPerMonthChartData.datasets[0].data = data.map(d => d.orderCount);
    });
  }

  loadOrderWithMostProjects(): void {
    this.orderService.getOrderWithMostProjectsThisMonth().subscribe(data => {
      this.projectCountChartData.labels = [data.orderName];
      this.projectCountChartData.datasets[0].data = [data.projectCount];
    });
  }
}
