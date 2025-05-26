import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-list',
  standalone: false,
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.sass'
})
export class NavListComponent {
  searchTerm: string = '';
  isDark: boolean = true;

  constructor(private router: Router) {}

  onSearchChange(): void {
    this.router.navigate(['/orders'], {
      queryParams: { q: this.searchTerm.trim() }
    });
  }

  toggleTheme(): void {
  this.isDark = !this.isDark;

  const body = document.body;
  if (this.isDark) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  }
}
}
