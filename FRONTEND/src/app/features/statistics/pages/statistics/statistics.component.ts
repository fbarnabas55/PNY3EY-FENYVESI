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

  ordersPerMonthChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  ordersPerMonthChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
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

  projectCountChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadMaxOrderThisMonth();
    this.loadOrdersPerMonth();
    this.loadOrderWithMostProjects();
  }

  loadMaxOrderThisMonth(): void {
    this.orderService.getMaxOrderThisMonth().subscribe(data => {
      if (data) {
        this.maxOrder = {
          name: data.orderName,
          amount: data.totalValue
        };
      }
    });
  }

  loadOrdersPerMonth(): void {
  this.orderService.getOrdersPerMonth().subscribe(data => {
    const labels = data.map(d => `${d.year}.${String(d.month).padStart(2, '0')}`);
    const values = data.map(d => d.orderCount);

    // Mindig új objektumot hozzunk létre!
    this.ordersPerMonthChartData = {
      labels: [...labels],
      datasets: [
        {
          label: 'Rendelések száma',
          data: [...values],
          backgroundColor: '#0d6efd'
        }
      ]
    };
  });
}

  loadOrderWithMostProjects(): void {
    this.orderService.getOrderWithMostProjectsThisMonth().subscribe(data => {
      if (data) {
        this.projectCountChartData = {
          labels: [data.orderName],
          datasets: [
            {
              label: 'Projekt szám',
              data: [data.projectCount],
              backgroundColor: ['#0d6efd', '#6610f2', '#198754', '#ffc107', '#dc3545']
            }
          ]
        };
      }
    });
  }
}
