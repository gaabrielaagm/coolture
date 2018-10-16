import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class FavoriteService{
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
            'Authorization': token
        });
        //console.log(this.url+'addAssistance/'+idEvent+'/'+idUser);
        return this._http.post(this.url+'addFavorite/'+idEvent+'/'+idUser, [], { headers: headers}).pipe(map(res => res.json())); 
        
    }

    delete(idEvent, idUser, token){
        //console.log(idEvent + ' ' + idUser + ' ' + token);
        
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        //console.log(this.url+'deleteAssistance/'+idEvent+'/'+idUser);
        return this._http.put(this.url+'deleteFavorite/'+idEvent+'/'+idUser, [], { headers: headers}).pipe(map(res => res.json())); 
        
    }

    verification(idEvent, idUser, token){
        //console.log(this.url+'assistanceVerification/'+idEvent+'/'+idUser);
        return this._http.get(this.url+'favoriteVerification/'+idEvent+'/'+idUser).pipe(map(res => res.json()));
    }

    getCurrent(idUser){
        return this._http.get(this.url+'getCurrentFavoritesUser/'+idUser).pipe(map(res => res.json()));
    }

    getPast(idUser){
        return this._http.get(this.url+'getPastFavoritesUser/'+idUser).pipe(map(res => res.json()));
    }

    getAll(idUser){
        return this._http.get(this.url+'getAllFavoritesUser/'+idUser).pipe(map(res => res.json()));
    }
}