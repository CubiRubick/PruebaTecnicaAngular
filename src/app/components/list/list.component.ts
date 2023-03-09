import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelClientes } from 'src/models/Clientes';
import { ClienteService } from 'src/services/cliente.service';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

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

/* Checking if the clienteservice.clients array is empty, if it is, it is calling the getcliente()
method from the clienteservice.ts file. */
    if(this.clienteservice.clients.length == 0){
      this.clienteservice.getcliente().subscribe((response:any)=>{
        this.clients = response
        this.clienteservice.clients = response
        console.log(response)
      })
    }
}

ngOnInit(): void {
  }
/**
 * It deletes a client.
 * @param {number} x - number
 */

deleteclient(x: number){
    this.clienteservice.deletecliente(x)
  }

/* A function that opens a modal. */

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
/**
 * The function download() is called when the user clicks on the download button. The function
 * download() calls the function downloadFile() from the service clienteservice. The function
 * downloadFile() receives the data to be downloaded (this.clients) and the name of the file
 * (ListClientscsv)
 */

download(){
  this.clienteservice.downloadFile(this.clients, 'ListClientscsv');
}


/**
 * I'm trying to create a pdf file with the data of a table, but I can't get the data from the table,
 * I'm using the library jsPDF and autoTable, I'm using Angular 8.
 * 
 * I hope you can help me, thank you very much.
 */
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

doc.save('ReporteCliente.pdf');

this.datos = []

}else{
  alert("Se Requiere Seleccionar un cliente")
}

}
/**
 * It takes a ModelClientes object and returns an array of the object's properties.
 * @param {ModelClientes} x - ModelClientes
 */

obtenerdatos(x:ModelClientes){
  const info = [this.clients.indexOf(x), x.nombre, x.telefono, x.correo, x.estado, x.municipio, x.cp, x.fechaCreacion]
  this.datos = info
}

/**
 * It takes a ModelClientes object, creates a string from its properties, and then uses that string to
 * create a new object.
 * @param {ModelClientes} x - ModelClientes
 */
mostrarUbicacion(x:ModelClientes){
  const ubicacion = x.cp+","+x.municipio+","+x.estado
  this.clienteservice.createByAddress(ubicacion).then(response =>{
    this.latin.push(response)
  })
}

}
