import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ModelClientes } from 'src/models/Clientes';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  clients: any = [];

  formsgroup: FormGroup;
  id: string | undefined;

  constructor(private fb: FormBuilder, private clienteservice: ClienteService){
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

}
