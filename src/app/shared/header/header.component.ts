import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-header',
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  isOpen: boolean = true; // Added property

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isOpen = !this.isOpen; // Toggle isOpen state
    this.toggleSidebarEvent.emit();
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
