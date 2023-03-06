import { Component, OnInit, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelClientes } from 'src/models/Clientes';
import { ClienteService } from 'src/services/cliente.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  clients: ModelClientes[] = [];
  closeResult = '';


constructor(public clienteservice: ClienteService, private modalService: NgbModal){
      this.clienteservice.eventenitter.subscribe(
      clientlist=> {this.clients = clientlist;
      }
    );
}


ngOnInit(): void {

  }

deleteclient(x: number){
    this.clienteservice.deletecliente(x)
  }

  
  open(content: any, x:number): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.deleteclient(x)
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
