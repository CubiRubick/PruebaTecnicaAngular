import { Component, OnInit, EventEmitter } from '@angular/core';
import { ModelClientes } from 'src/models/Clientes';
import { ClienteService } from 'src/services/cliente.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  clients: ModelClientes[] = [];


constructor(public clienteservice: ClienteService){
      this.clienteservice.eventenitter.subscribe(
      clientlist=> {this.clients = clientlist;
        console.log(this.clients);
      }
    );
}


ngOnInit(): void {

  }

deleteclient(x: number){
    this.clienteservice.deletecliente(x)
  }
}
