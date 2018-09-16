import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
    public url: string;
    public identity;
    public token;

    constructor(
        private _http: Http
    ){
        this.url = GLOBAL.url;
    }

    register(user_to_register){
        console.log(user_to_register);
        //se pasara un objeto json pero convertido en un string, (y ya la API lo convierte a un objeto usable)
        //El método JSON.stringify() convierte un valor dado en javascript a una cadena JSON
        let params = JSON.stringify(user_to_register);
        let headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'register', params, {headers: headers})
                            .pipe(map(res => res.json())); 
    }

    registerInterests(userId, clasifications){
        console.log(clasifications);
        //let params = JSON.stringify(clasifications);
        let headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url+'registerInterests/'+userId, clasifications, { headers: headers })
                            .pipe(map(res => res.json())); 
    }

    signup(user_to_login, gettoken){
        if(gettoken){
            user_to_login.gettoken = 'true';
        }
        let params = JSON.stringify(user_to_login);
        let headers = new Headers({'Content-Type': 'application/json'});
        return this._http.post(this.url+'login', params, {headers: headers})
                            .pipe(map(res => res.json())); 
    }

    getIdentity(){
        // parse() convierte de json a un objeto de javascript
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != 'undefined'){
            this.identity = identity;
        }
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');
        if(token != 'undefined'){
            this.token = token;
        }
        return this.token;
    }
    
    updateUser(user_to_update){
        let params = JSON.stringify(user_to_update);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });

        return this._http.put(this.url+'update-user/'+user_to_update._id, params, { headers: headers})
                            .pipe(map(res => res.json())); 
    }

    getAvatar(){
        return this._http.get(this.url+'/get-image-file/'); 
    }

    getKeepers(){
        return this._http.get(this.url+'keepers').pipe(map(res => res.json())); 
    }
}