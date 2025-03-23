import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialModule, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isOpen: boolean = true;
  isExpanded: boolean = false;
  menuItems: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMenuItems();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.isExpanded = !this.isExpanded;
  }

  loadMenuItems() {
    this.http.get<any[]>('assets/menu.json').subscribe(data => {
      this.menuItems = data;
    });
  }
}
