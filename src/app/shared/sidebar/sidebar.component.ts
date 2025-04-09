import { Component, OnInit, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialModule, CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChildren('dynamicMenu') dynamicMenus!: QueryList<MatMenu>;
  isOpen = true;
  menuData: any[] = [];
  private flattenedMenu: any[] = [];
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  private loadMenuItems(): void {
    this.http.get<any>('assets/sidebar.data.json').subscribe({
      next: (data) => {
        this.menuData = data.menu || [];
        this.flattenedMenu = this.flattenMenuData(this.menuData);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load menu items:', err)
    });
  }

  flattenMenuData(menu: any[]): any[] {
    const flatList: any[] = [];
    const traverse = (items: any[]) => {
      items.forEach((item) => {
        if (item.children && item.children.length > 0) {
          flatList.push(item);
          traverse(item.children);
        }
      });
    };
    traverse(menu);
    return flatList;
  }

  getSubMenu(item: any): MatMenu | null {
    if (!item.children || !this.dynamicMenus) return null;
    const index = this.flattenedMenu.indexOf(item);
    if (index === -1) return null;
    const menusArray = this.dynamicMenus.toArray();
    return index < menusArray.length ? menusArray[index] : null;
  }

  getItemStyle(item: any): { [key: string]: string } {
    return {
      'font-weight': item.isHighlighted ? 'bold' : 'normal',
      'color': item.isDisabled ? 'gray' : 'inherit',
    };
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

}
