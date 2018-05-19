import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:Http) { 
    
  }

  consultar(){
    return this.http.get("http://localhost:3000/usuario").toPromise().then(resposta=>resposta.json());
  }

  inserir(nome:string,idade:string) {
    return this.http.post("http://localhost:3000/usuario", {nome:nome,idade:idade}).toPromise();
  }

  remover(id:string) {
    return this.http.delete(`http://localhost:3000/usuario/${id}`).toPromise();
  }

  alterar(id: string, nome: string,idade:string) {
    return this.http.put(`http://localhost:3000/usuario/${id}`, {nome:nome,idade:idade}).toPromise();
  }
}
