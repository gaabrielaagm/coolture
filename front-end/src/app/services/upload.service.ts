import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UploadService{
    public url: string;

    constructor(
        private _http: Http
    ){
        this.url = GLOBAL.url;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, /*token: string,*/ name: string){
        return new Promise(function(resolve, reject){
            var formData: any = new FormData(); //simular un formulario real
            var xhr =  new XMLHttpRequest();//ajax

            //recorremos los posibles archivos que lleguen
            for(var i=0; i < files.length; i++){
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){ //
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response))
                    }else{
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('PUT', url, true);
            //xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }

}