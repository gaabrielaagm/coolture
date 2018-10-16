import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class EventService{
    public url: string;
    /*
    public identity;
    public token;
    public clasifications;
    */

    constructor(
        private _http: Http
    ){
        this.url = GLOBAL.url;
    }

    addEvent(newEvent, token){
        let params = JSON.stringify(newEvent);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url+'event', params, { headers: headers}).pipe(map(res => res.json())); 
    }   

    updateEvent(updatedEvent, token){
        let params = JSON.stringify(updatedEvent);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.put(this.url+'event/'+updatedEvent._id, params, { headers: headers }).pipe(map(res => res.json())); 
    }

    deleteEvent(token, eventId){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.delete(this.url+'event/'+eventId, { headers: headers }).pipe(map(res => res.json()));
    }

    getAllEvents(){
        return this._http.get(this.url+'allEvents').pipe(map(res => res.json())); 
    }

    getEvents(){
        return this._http.get(this.url+'events').pipe(map(res => res.json())); 
    }

    getEventsByClasifications(clasifications){
        if(clasifications.length == 1){
            var array_clasifications = [];
            array_clasifications.push(clasifications);
            
            let params = JSON.stringify(array_clasifications);
            let headers = new Headers({
                'Content-Type': 'application/json'
            });

            return this._http.put(this.url+'eventsClasifications', {clasifications: clasifications}, { headers: headers }).pipe(map(res => res.json())); 
        }else{
            let params = JSON.stringify(clasifications);
            let headers = new Headers({
                'Content-Type': 'application/json'
            });

            return this._http.put(this.url+'eventsClasifications', {clasifications: clasifications}, { headers: headers }).pipe(map(res => res.json())); 
        }
    }

    getEvent(eventId){
        console.log(this.url+'event/'+eventId);
        return this._http.get(this.url+'event/'+eventId).pipe(map(res => res.json())); 
    }

    getImageEvent(nameImage){
        
        return this._http.get(this.url+'image-event/'+nameImage);
    }

    incAssistances(idEvent){
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this._http.put(this.url+'inc-assistance/'+idEvent, [], { headers: headers }).pipe(map(res => res.json())); 
    }

    decAssistances(idEvent){
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this._http.put(this.url+'dec-assistance/'+idEvent, [], { headers: headers }).pipe(map(res => res.json())); 
    }

    getGeneralRanking(){
        return this._http.get(this.url+'generalRanking').pipe(map(res => res.json())); 
    }

    getClasificationRanking(type){
        return this._http.get(this.url+'clasificationRanking/'+type).pipe(map(res => res.json()));
    }

    getSpecificRanking(month, year){
        return this._http.get(this.url+'specificRanking/'+month+'/'+year).pipe(map(res => res.json()));
    }
}