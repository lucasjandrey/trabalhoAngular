import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-crud-usuario',
  template: `
            <ul>
              <li *ngFor="let item of usuario">{{item.id}} - {{item.nome}} - {{item.idade}}  
                      <button (click)="editar(item)">Alterar</button> 
                      <button (click)="remove(item.id)">X</button></li>
            </ul>

            <input type="hidden" [(ngModel)]="id" /><br>
            Nome: <input type="text" [(ngModel)]="nome" /><br>
            Idade: <input type="text" [(ngModel)]="idade" /><br>
            <button *ngIf="status==='inserindo'" (click)="insere()">Inserir</button> 
            <button *ngIf="status==='alterando'" (click)="altera()">Alterar</button>
  `,
  styleUrls: ['./crud-usuario.component.css']
})
export class CrudUsuarioComponent implements OnInit {
  id="";
  nome = "";
  idade = "";
  status = "inserindo";
  usuario = [];

  constructor(private usuarioService:UsuarioService) { 

  }

  ngOnInit() {
    this.atualiza();
  }

  editar(i) {
    this.id = i.id;
    this.nome = i.nome;
    this.idade = i.idade
    this.status = "alterando";
  }

  atualiza() {
    this.usuarioService.consultar().then(
      usuario=> {
        this.usuario=usuario;
      }      
    );
  }

  insere() {
    this.usuarioService.inserir(this.nome,this.idade).then(()=>{
      this.nome = "";
      this.idade = "";
      this.id = "";
      this.atualiza();
    });
  }

  remove(id) {
    this.usuarioService.remover(id).then(()=>{
      this.nome="";
      this.id="";
      this.atualiza();
    });
  }

  altera(id, nome, idade) {
    this.usuarioService.alterar(this.id, this.nome,this.idade).then(()=>{
      this.nome="";
      this.idade="";
      this.id="";
      this.status="inserindo";
      this.atualiza();
    }); 
  }
}
