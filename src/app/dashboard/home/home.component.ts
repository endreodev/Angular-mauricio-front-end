import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private http : HttpClient ){

  }

  ngOnInit() {

    const body = 
    {
      "securitycontext": {
          "codempresa": 1,
          "modulo": "CAD001",
          "sistema": "CAD",
          "usuarioauth": "mauricio"
      }
    };

    //setTimeout(() => {
    //  this.http.request('GET', 'http://141.11.72.142:5000/BuscaListaTipoVincUsuarioEmpresa', {
    //    body: body
    //  }).subscribe((data) => {
    //    console.log(data);
    //  });
    //}, 1000); // Aguarda 1 segundo antes de executar a requisição
  }
}
