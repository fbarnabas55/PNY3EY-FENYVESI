import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../order.module';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    private apiUrl = 'https://localhost:7218/Order'; // módosítsd, ha máshol fut


  constructor(private http: HttpClient) { }

  getOrders():Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrderById(id: string): Observable<Order> {
  return this.http.get<Order>(`${this.apiUrl}/${id}`);
}

}
