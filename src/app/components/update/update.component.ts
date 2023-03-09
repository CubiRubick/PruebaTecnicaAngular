import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModelClientes } from 'src/models/Clientes';
import { ClienteService } from 'src/services/cliente.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
    client: any = {}
    closeResult = '';
    title = 'marca';
    id: any
    center = {lat: 21.125422198854523, lng: -101.68661297761284};
    zoom = 13;
    ubicacion: any = {};
    label = {
      color: 'red',
      text: 'Marcador'
    }
    formsgroup!: FormGroup;
    VendedorForm: any;


    constructor(private fb: FormBuilder, private router: ActivatedRoute, private clienteservice: ClienteService, private modalService: NgbModal) {
/* The above code is getting the id of the client from the url and then using that id to get the client
information from the database. */

      this.formulario()
      this.clienteservice.getbyidcliente(this.idclientes()).subscribe((response:any)=>{
        this.client = response
        this.formulario(response)
      })
      this.id = this.idclientes();
    }
/* This is the code that is used to open the modal and then close it. */

    open(content: any): void {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.actualizarUsuario()
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

    ngOnInit(): void {}
/**
 * This function is used to update the client data.
 */

    actualizarUsuario(){
      let modifyclient = this.client

      modifyclient.nombre=this.formsgroup.value.nombre,
      modifyclient.telefono=this.formsgroup.value.telefono,
      modifyclient.correo=this.formsgroup.value.correo,
      modifyclient.referencia=this.formsgroup.value.referencia,
      modifyclient.estado=this.formsgroup.value.estado,
      modifyclient.municipio=this.formsgroup.value.municipio,
      modifyclient.colonia=this.formsgroup.value.colonia,
      modifyclient.calle=this.formsgroup.value.calle,
      modifyclient.cp=this.formsgroup.value.cp;

      if(this.formsgroup.valid){
        this.clienteservice.updatecliente(this.idclientes(),modifyclient)
        alert("Cliente Actualizado Correctamente")

      }else{
        alert("No se Pudo Actualizar el Cliente ")
      }

    }

/**
 * It returns the value of the id parameter in the URL
 * @returns The id of the client
 */
    idclientes(){
      return this.router.snapshot.params['id']
    }
/**
 * It returns true if the key pressed is a number, and false if it's not
 * @param {any} event - any - This is the event that is triggered when the user types in the input
 * field.
 * @returns A boolean value.
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


/**
 * It creates a form group with the fields that we want to validate.
 * @param {ModelClientes} [valor] - This is the value that is passed to the form, in this case it is
 * the value of the client that is being edited.
 */

    formulario(valor?:ModelClientes){
      this.formsgroup = this.fb.group({
        nombre:[valor?.nombre||'', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        telefono:[valor?.telefono||'', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        correo:[valor?.correo||'', [Validators.required, Validators.email]],
        referencia:[valor?.referencia||'', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        estado:[valor?.estado||'', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        municipio:[valor?.municipio||'', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        colonia:[valor?.colonia||'', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        calle:[valor?.calle||'', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        cp:[valor?.cp||'', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      });
    }
}

