import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, Project } from '../order.module';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'https://localhost:7218';

  constructor(private http: HttpClient) { }

  // Order műveletek
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/Order`);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/Order/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/Order`, order);
  }

  updateOrder(id: string, order: Order): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Order/${id}`, order);
  }

  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Order/${id}`);
  }

  // Project műveletek
  getProjects(orderId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/Project/order/${orderId}`);
  }

  createProject(project: Project, packageDemand: string): Observable<Project> {
    const params = { packageDemand };
    return this.http.post<Project>(`${this.baseUrl}/Project`, project, { params });
  }

  deleteProject(projectId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Project/${projectId}`);
  }

  updateProject(project: Project, packageDemand: string): Observable<void> {
    const params = { packageDemand };
    return this.http.put<void>(`${this.baseUrl}/Project/${project.id}`, project, { params });
  }

}



