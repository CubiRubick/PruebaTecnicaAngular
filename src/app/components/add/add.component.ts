import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ModelClientes } from 'src/models/Clientes';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'app-detail',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  clients:any = [];
  closeResult = '';
  title = 'marca';
  center = {lat: 21.125422198854523, lng: -101.68661297761284};
  zoom = 13;
  date= new Date();
  label = {
    color: 'red',
    text: 'Marcador'
  }
  ubicacion: any = {};

  formsgroup: FormGroup;

  constructor(private fb: FormBuilder, private clienteservice: ClienteService, private modalService: NgbModal){

    if(this.clienteservice.clients.length == 0){
      this.clienteservice.getcliente().subscribe((response:any)=>{
        this.clients = response
        this.clienteservice.llenarCliente(response)
        console.log(response)
      })
    }
    /* Creating a form group with the name of the form and the validators. */
    this.formsgroup = this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      telefono:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      correo:['', [Validators.required, Validators.email]],
      referencia:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      estado:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      municipio:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      colonia:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      calle:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cp:['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]

    });

  }
  ngOnInit(): void {

  }
/**
 * It creates a new client.
 */

  crearUsuario(){
    const CLIENTE: ModelClientes = {
      nombre: this.formsgroup.value.nombre,
      telefono: this.formsgroup.value.telefono,
      correo: this.formsgroup.value.correo,
      referencia: this.formsgroup.value.referencia,
      estado: this.formsgroup.value.estado,
      municipio: this.formsgroup.value.municipio,
      colonia: this.formsgroup.value.colonia,
      calle: this.formsgroup.value.calle,
      cp: this.formsgroup.value.cp,
      fechaCreacion: new Date(),
    }
      this.clienteservice.addcliente(CLIENTE)
      this.formsgroup.reset()


  }

/* A function that opens a modal. */

  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.crearUsuario();
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
 * It returns true if the key pressed is a number, and false if it's not
 * @param {any} event - any - This is the event that is triggered when the user types in the input
 * field.
 * @returns a boolean value.
 */

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
/**
 * It takes the address from the form and sends it to the service to get the coordinates.
 */

  mostrarUbicacion(){
    var datos = this.formsgroup.value.calle+","+this.formsgroup.value.cp+","+this.formsgroup.value.colonia+","+this.formsgroup.value.municipio+","+this.formsgroup.value.estado
    this.clienteservice.createByAddress(datos).then(response =>{
      this.ubicacion = response
      console.log(this.ubicacion)
       console.log(response)
    })
  }

}
