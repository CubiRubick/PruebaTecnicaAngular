import { EventEmitter, Injectable } from '@angular/core';
import { ModelClientes } from '../models/Clientes'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ClienteService{
    clients: any = [];
    private baseUrl = 'https://listclientes-default-rtdb.firebaseio.com'
    private collection = 'Clientes.json'
    private path = `${this.baseUrl}/${this.collection}`;
    eventenitter = new EventEmitter();
    constructor(private httpclient: HttpClient){
        this.getcliente();
    }

    getcliente(): void{
        this.httpclient.get(this.path).subscribe(
            value=>{
              this.clients = value;
              this.eventenitter.emit(value);
            }
          )
    }

    addcliente(cliente: ModelClientes): void{
        this.clients.push(cliente);
        this.httpclient.put(this.path, this.clients).subscribe(
            value=>{
                this.clients = value;
                this.eventenitter.emit(value);
            }
        )
    }

    deletecliente(idx: number): void{
        this.clients = this.clients.filter(
            (x: any, index: number) => index != idx);
            this.httpclient.put(this.path, this.clients).subscribe(
                value=>{
                    this.clients = value;
                    this.eventenitter.emit(value);
                }
            )
    }

    getbyidcliente(idx: number): void{
        this.httpclient.get("https://listclientes-default-rtdb.firebaseio.com/Clientes/"+idx+".json").subscribe(
            value=>{
                this.clients = value;
                this.eventenitter.emit(value);
            }
        )
    }

    updatecliente(idx: number, cliente: ModelClientes): void{
        let url = "https://listclientes-default-rtdb.firebaseio.com/Clientes/"+idx+".json"
        this.httpclient.put(url, cliente).subscribe(
            response=> console.log("Cliente actualizado", response)
            )
    }
}