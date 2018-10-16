import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class ArtistService{
    public url: string;

    constructor(
        private _http: Http
    ){
        this.url = GLOBAL.url;
    }

    addArtist(artist, token){
        //convertir el objeto javascript a un string de json
        let params = JSON.stringify(artist);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url+'artist', params, {headers: headers})
                            .pipe(map(res => res.json())); 
    }

    getArtists(){
        return this._http.get(this.url+'artists').pipe(map(res => res.json()));
    }

    getArtist(search, value){
        return this._http.get(this.url+'artist/'+search+'/'+value).pipe(map(res => res.json()));
    }

    editArtist(artist, token){
        let params = JSON.stringify(artist);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url+'artist/'+artist._id, params, {headers: headers})
                            .pipe(map(res => res.json())); 
    }

    deleteArtist(token, id){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({headers: headers});

        return this._http.delete(this.url+'artist/'+id, options)
                            .pipe(map(res => res.json())); 
    
    }
}