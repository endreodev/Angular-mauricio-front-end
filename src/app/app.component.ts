import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseJson, Instituto, Sistema } from './model/models';
import { CommonModule } from '@angular/common';
import { DatabaseService } from './service/database.service';
import { MaterialModule } from './shared/material/material.module';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MaterialModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  // Armazena todos os dados do JSON (sistema, institutos, notificacoes, etc.)
  data: DatabaseJson | null = null;

  // Lista de institutos, extraída de data
  institutos: Instituto[] = [];

  constructor(private databaseService: DatabaseService) {}

  ngOnInit(): void {
    // 1) Carrega o arquivo JSON uma única vez
    this.databaseService.init().subscribe({
      next: (dados) => {
        console.log('Dados carregados com sucesso:', dados);
        // Se preferir, você pode atribuir aqui também:
        // this.data = dados;
        // this.institutos = dados.institutos;
      },
      error: (err) => console.error('Erro ao carregar dados:', err)
    });

    // 2) Observa mudanças no BehaviorSubject
    //    Toda vez que qualquer CRUD for realizado (ex.: update, add, etc.),
    //    esse subscribe será chamado novamente com dados atualizados.
    this.databaseService.data$.subscribe(db => {
      if (db) {
        this.data = db;
        this.institutos = db.institutos;
        console.log('Dados atualizados (BehaviorSubject):', db);
      }
    });
  }}
