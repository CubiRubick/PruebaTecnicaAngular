import { Component, OnInit, EventEmitter } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelClientes } from 'src/models/Clientes';
import { ClienteService } from 'src/services/cliente.service';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { Loader } from "@googlemaps/js-api-loader";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  title = 'marca';
  clients: ModelClientes[] = [];
  latin: any = [];
  datos: any = [];
  closeResult = '';
  addess=''
  center = {lat: 21.125422198854523, lng: -101.68661297761284};
  zoom = 13;
  label = {
    color: 'red',
    text: 'Marcador'
  }
    // The marker, positioned at Uluru
  display?: google.maps.LatLngLiteral;


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

download(){
  this.clienteservice.downloadFile(this.clients, 'ListClientscsv');
}


openPDF(): void {
const doc = new jsPDF('l', 'mm', 'a4');
const head = [['id', 'nombre', 'telefono', 'Correo','estado', 'municipio', 'cp','FechaCracion']]
  let datas: any = []
if(this.datos.length > 0){
  datas.push(this.datos)
}
if(datas.length > 0){
  autoTable(doc, {
    head: head,
    body: datas,
    didDrawCell: (data) => { },
});

doc.save('table.pdf');

this.datos = []

}else{
  alert("Se Requiere Seleccionar un cliente")
}

}

obtenerdatos(x:ModelClientes){
  const info = [this.clients.indexOf(x), x.nombre, x.telefono, x.correo, x.estado, x.municipio, x.cp, x.fechaCreacion]
  this.datos = info
}

mostrarUbicacion(x:ModelClientes){
  const ubicacion = x.cp+","+x.municipio+","+x.estado
  this.clienteservice.createByAddress(ubicacion).then(response =>{
    this.latin.push(response)
    console.log(this.latin)
  })



}


}
