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
    clients: any = []
    closeResult = '';
    id: any
    formsgroup: FormGroup;

    constructor(private fb: FormBuilder, private router: ActivatedRoute, private clienteservice: ClienteService, private modalService: NgbModal) {

      this.clienteservice.eventenitter.subscribe(
        clientlist=> {this.clients = clientlist;
        }
      );

      this.formsgroup = this.fb.group({
      nombre:['', Validators.required],
      telefono:['', Validators.required],
      correo:['', Validators.required],
      referencia:['', Validators.required],
      estado:['', Validators.required],
      municipio:['', Validators.required],
      colonia:['', Validators.required],
      calle:['', Validators.required],
      cp:['', Validators.required]

    });

    
    }

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

    ngOnInit(): void {
        this.clienteservice.getbyidcliente(this.idclientes())
        this.id = this.idclientes();
    }

    actualizarUsuario(){
      let modifyclient = this.clients

      modifyclient.nombre=this.formsgroup.value.nombre,
      modifyclient.telefono=this.formsgroup.value.telefono,
      modifyclient.correo=this.formsgroup.value.correo,
      modifyclient.referencia=this.formsgroup.value.referencia,
      modifyclient.estado=this.formsgroup.value.estado,
      modifyclient.municipio=this.formsgroup.value.municipio,
      modifyclient.colonia=this.formsgroup.value.colonia,
      modifyclient.calle=this.formsgroup.value.calle,
      modifyclient.cp=this.formsgroup.value.cp,

     this.clienteservice.updatecliente(this.idclientes(),modifyclient)

    }
    idclientes(){
      return this.router.snapshot.params['id']
    }

    numberOnly(event: any): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
  
    }
}

