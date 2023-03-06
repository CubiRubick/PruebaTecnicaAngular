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

  clients: any = [];
  closeResult = '';

  formsgroup: FormGroup;

  constructor(private fb: FormBuilder, private clienteservice: ClienteService, private modalService: NgbModal){

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
  ngOnInit(): void {

  }

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
  }

  
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

}
