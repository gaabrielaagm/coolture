import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class EmailService {
    public url: string;

    constructor(
        private _http: Http
    ){
        this.url = GLOBAL.url;
    }

    sendMail(event, token){
        var string = {
            "_id" : '"'+event._id+'"',
            "title" : '"'+event.title+'"',
            "clasification" : '"'+event.clasification+'"',
            "type" : '"'+event.type+'"',
            "place" : '"'+event.place+'"',
            "city" : '"'+event.city+'"'
        }
        let params = JSON.stringify(string);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url+'sendEmail', params, {headers: headers})
                            .pipe(map(res => res.json()));    
    }
}