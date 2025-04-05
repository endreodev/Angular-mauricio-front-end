import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MaterialModule } from './shared/material/material.module';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MaterialModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}
