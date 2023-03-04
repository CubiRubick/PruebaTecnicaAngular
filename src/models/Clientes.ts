export class ModelClientes{
    id?: string;
    nombre: string;
    telefono: string;
    correo: string;
    referencia: string;
    estado: string;
    municipio: string;
    colonia: string;
    calle: string;
    cp: string;
    fechaCreacion: Date;

    constructor(nombre: string, telefono: string, correo: string, referencia: string, estado: string, municipio: string, colonia: string, calle: string, cp: string){
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.referencia = referencia;
        this.estado = estado;
        this.municipio = municipio;
        this.colonia = colonia;
        this.calle = calle;
        this.cp = cp;
        this.fechaCreacion = new Date();
    }
}