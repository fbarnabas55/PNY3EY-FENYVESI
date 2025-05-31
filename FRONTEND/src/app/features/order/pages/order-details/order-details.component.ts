import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Project } from '../../order.module';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.sass'
})


export class OrderDetailsComponent implements OnInit {
  orderId!: string;
  orderName = '';
  projects: Project[] = [];

  selectedProject: Project | null = null;
  newProject: Project = {
    orderId: '',
    projectName: '',
    description: '',
    projectManager: '',
    price: 0,
    packageDemand: 'Foiled'
  };

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id')!;
    this.loadOrder();
    this.loadProjects();
  }

  loadOrder(): void {
    this.orderService.getOrderById(this.orderId).subscribe(order => {
      this.orderName = order.orderName;
    });
  }

  loadProjects(): void {
    this.orderService.getProjects(this.orderId).subscribe(data => {
      this.projects = data;
    });
  }

  openEditModal(project: Project): void {
    this.selectedProject = { ...project };
    const modalElement = document.getElementById('projectModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  cancelEdit(): void {
    this.selectedProject = null;
  }

  saveProject(form?: any): void {
    if (!this.selectedProject) return;

    if (form && !form.valid) {
      form.form.markAllAsTouched();
      return;
    }

    this.orderService.updateProject(this.selectedProject, this.selectedProject.packageDemand).subscribe(() => {
      this.loadProjects();
      const modalElement = document.getElementById('projectModal');
      if (modalElement) Modal.getInstance(modalElement)?.hide();
      this.selectedProject = null;
    });
  }



  confirmDelete(project: Project): void {
    if (confirm(`Biztosan törölni szeretnéd a(z) "${project.projectName}" projektet?`)) {
      this.orderService.deleteProject(project.id!).subscribe(() => {
        this.loadProjects();
      });
    }
  }

  

  openNewProjectModal(): void {
    this.newProject = {
      orderId: this.orderId,
      projectName: '',
      description: '',
      projectManager: '',
      price: 0,
      packageDemand: 'Foiled'
    };
    const modalElement = document.getElementById('newProjectModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  createProject(form: any): void {
    if (!form.valid) return;
    this.orderService.createProject(this.newProject, this.newProject.packageDemand).subscribe(() => {
      form.resetForm();
      const modalElement = document.getElementById('newProjectModal');
      if (modalElement) Modal.getInstance(modalElement)?.hide();
      this.loadProjects();
    });
  }
}




