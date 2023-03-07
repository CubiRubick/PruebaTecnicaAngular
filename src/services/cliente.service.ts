import { EventEmitter, Injectable } from '@angular/core';
import { ModelClientes } from '../models/Clientes'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ClienteService{
    clients: any = [];
    private baseUrl = 'https://listclientes-default-rtdb.firebaseio.com'
    private collection = 'Clientes.json'
    private path = `${this.baseUrl}/${this.collection}`;
    eventenitter = new EventEmitter();
    constructor(private httpclient: HttpClient){
        this.getcliente();
    }

    getcliente(): void{
        this.httpclient.get(this.path).subscribe(
            value=>{
              this.clients = value;
              this.eventenitter.emit(value);
            }
          )
    }

    addcliente(cliente: ModelClientes): void{
        this.clients.push(cliente);
        this.httpclient.put(this.path, this.clients).subscribe(
            value=>{
                this.clients = value;
                this.eventenitter.emit(value);
            }
        )
    }

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

    getbyidcliente(idx: number): void{
        this.httpclient.get("https://listclientes-default-rtdb.firebaseio.com/Clientes/"+idx+".json").subscribe(
            value=>{
                this.clients = value;
                this.eventenitter.emit(value);
            }
        )
    }

    updatecliente(idx: number, cliente: ModelClientes): void{
        let url = "https://listclientes-default-rtdb.firebaseio.com/Clientes/"+idx+".json"
        this.httpclient.put(url, cliente).subscribe(
            response=> console.log("Cliente actualizado", response)
            )
    }




    downloadFile(data: any, filename='data'): void {
        let csvData = this.ConvertToCSV(data, ['nombre','telefono', 'correo', 'referencia', 'estado','municipio','colonia','calle','cp']);
        console.log(csvData)
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


}