import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class AssistanceService{
    public url: string;

    constructor(
        private _http: Http
    ){
        this.url = GLOBAL.url;
    }

    add(idEvent, idUser, token){
        //console.log(idEvent + ' ' + idUser + ' ' + token);
        
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization' : token
        });
        //console.log(this.url+'addAssistance/'+idEvent+'/'+idUser);
        return this._http.post(this.url+'addAssistance/'+idEvent+'/'+idUser, [], { headers: headers}).pipe(map(res => res.json()));  
    }

    delete(idEvent, idUser, token){
        //console.log(idEvent + ' ' + idUser + ' ' + token);
        
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization' : token
        });
        //console.log(this.url+'deleteAssistance/'+idEvent+'/'+idUser);
        return this._http.put(this.url+'deleteAssistance/'+idEvent+'/'+idUser, [], { headers: headers}).pipe(map(res => res.json())); 
        
    }

    verification(idEvent, idUser){
        //console.log(this.url+'assistanceVerification/'+idEvent+'/'+idUser);
        return this._http.get(this.url+'assistanceVerification/'+idEvent+'/'+idUser).pipe(map(res => res.json()));
    }

    getCurrent(idUser){
        return this._http.get(this.url+'getCurrentAssistancesUser/'+idUser).pipe(map(res => res.json()));
    }

    getPast(idUser){
        return this._http.get(this.url+'getPastAssistancesUser/'+idUser).pipe(map(res => res.json()));
    }

}
