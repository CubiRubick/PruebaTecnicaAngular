import { EventEmitter, Injectable } from '@angular/core';
import { ModelClientes } from '../models/Clientes'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ClienteService{
    clients: any = [];
    client: any = {}
    private baseUrl = 'https://listclientes-default-rtdb.firebaseio.com'
    private collection = 'Clientes.json'
    private path = `${this.baseUrl}/${this.collection}`;
    latin: any = {}
    markerId = 0;
    eventenitter = new EventEmitter();
    constructor(private httpclient: HttpClient){
    }

    llenarCliente(cliente:ModelClientes[]){
        this.clients = cliente
    }
   /**
    * It returns an observable of the httpclient get request.
    * @returns The httpclient.get() method returns an Observable.
    */
    getcliente(){
       return this.httpclient.get(this.path)
    }

    /**
     * It adds a client to the array of clients, then it sends the array to the server, and then it
     * emits the array to the client.
     * @param {ModelClientes} cliente - ModelClientes
     */
    addcliente(cliente: ModelClientes): void{
        console.log(cliente)
        this.clients.push(cliente);
        console.log(this.clients)
        this.httpclient.put(this.path, this.clients).subscribe(
            value=>{
                this.clients = value;
                this.llenarCliente(this.clients)
                console.log(this.clients)
                this.eventenitter.emit(value);
            }
        )
    }

    /**
     * It deletes a client from the array of clients, then it updates the array of clients in the
     * database, and then it emits the updated array of clients.
     * @param {number} idx - number - the index of the client to be deleted
     */
    deletecliente(idx: number): void{
        this.clients = this.clients.filter(
            (x: any, index: number) => index != idx);
            this.httpclient.put(this.path, this.clients).subscribe(
                value=>{
                    this.clients = value;
                    this.eventenitter.emit(value);
                }
            )
    }

   /**
    * It returns the data of the client with the idx number
    * @param {number} idx - number
    * @returns The data from the database.
    */
    getbyidcliente(idx: number){
      return this.httpclient.get("https://listclientes-default-rtdb.firebaseio.com/Clientes/"+idx+".json")
    }

    /**
     * The function takes in the index of the client and the client object, then it creates a url to
     * the client's location in the database, and then it uses the httpclient to put the client object
     * in the database
     * @param {number} idx - number, cliente: ModelClientes
     * @param {ModelClientes} cliente - ModelClientes
     */
    updatecliente(idx: number, cliente: ModelClientes): void{
        let url = "https://listclientes-default-rtdb.firebaseio.com/Clientes/"+idx+".json"
        this.httpclient.put(url, cliente).subscribe(
            response=> console.log("Cliente actualizado")
            )
    }

    /* A function that converts the data into a csv file. */
    downloadFile(data: any, filename='data'): void {
        let csvData = this.ConvertToCSV(data, ['nombre','telefono', 'correo', 'referencia', 'estado','municipio','colonia','calle','cp','fechaCreacion']);
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }
    ConvertToCSV(objArray: any, headerList: any) {
         let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
         let str = '';
         let row = 'S.No,';
        for (let index in headerList) {
             row += headerList[index] + ',';
         }
         row = row.slice(0, -1);
         str += row + '\r\n';
         for (let i = 0; i < array.length; i++) {
             let line = (i+1)+'';
             for (let index in headerList) {
                let head = headerList[index];
                line += ',' + array[i][head];
             }
             str += line + '\r\n';
         }
         return str;
    }

   /**
    * It takes an address, converts it to lat/long, and returns the lat/long.
    * @param {any} address - any
    * @returns The value of this.latin is being returned.
    */
   async createByAddress(address: any) {
        var geocoder = new google.maps.Geocoder();
       await geocoder.geocode({'address': address},(result: any, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                var firstaddress = result[0]
                var latitud = firstaddress.geometry.location.lat();
                var longitud = firstaddress.geometry.location.lng();
                this.latin = {lat: latitud, lng: longitud}
            }


        });
        return this.latin;
    }


}