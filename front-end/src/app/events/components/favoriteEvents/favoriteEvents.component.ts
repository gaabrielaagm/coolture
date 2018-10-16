import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FavoriteService } from '../../../services/favorites.service';
import { EventService } from '../../../services/event.service';
import { AssistanceService } from '../../../services/assistance.service';
import { GLOBAL } from '../../../services/global';
import { Event } from '../../../models/event';

@Component({
    selector: 'favoriteEvents',
    templateUrl: './favoriteEvents.component.html',
    styleUrls: ['./favoriteEvents.component.css'],
    providers: [UserService, FavoriteService, EventService, AssistanceService]
})
export class FavoriteEventsComponent {
    public title : String;
    public token;
    public identity;
    public to_search : String;
    public time : String;
    public events : Event[];
    public url : String;
    public urlImage : String;
    public view_event : Event;
    public checked_assistance;
    public checked_favorite;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _assistanceService : AssistanceService,
        private _favoriteService : FavoriteService,
        private _userService : UserService,
        private _eventService : EventService
    ){
        this.title = "Agregados a favoritos";
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
        this.to_search = "";
        this.url = GLOBAL.url;
        this.urlImage = this.url+'image-event/';
        this.view_event = new Event('','','',[],'','','','','',null,'',null,null,'');
    }

    ngOnInit(): void {
        console.log('FavoriteEventsComponent loaded...');
        
        this._route.params.forEach((params: Params) => {
            this.time = params['tiempo'];

            if(this.time === 'proximos'){
                this.title = 'Eventos próximos agreados a favoritos';
                this.getCurrentFavoriteEvents();
            }else if(this.time == 'pasados'){
                this.title = 'Eventos pasados agregados a favoritos';
                this.getPastFavoriteEvents();
            }else if(this.time == 'todos'){
                this.title = 'Eventos agregados a favoritos';
                this.getAllFavoriteEvents();
            }
        });
    }

    getCurrentFavoriteEvents(){
        this._favoriteService.getCurrent(this.identity._id).subscribe(
            response => {
                if(!response.favorites){
                    console.log('Error en la peticion');
                }else{
                    console.log(response.favorites);
                    this.events = response.favorites;
                }
            },
            error => {
                console.log('ERROR: ' + error);
            }
        );
    }

    getPastFavoriteEvents(){
        this._favoriteService.getPast(this.identity._id).subscribe(
            response => {
                if(!response.favorites){
                    console.log('Error en la peticion');
                }else{
                    //console.log(response.favorites);
                    this.events = response.favorites;
                }
            },
            error => {
                console.log('ERROR: ' + error);
            }
        );
    }

    getAllFavoriteEvents(){
        this._favoriteService.getAll(this.identity._id).subscribe(
            response => {
                if(!response.favorites){
                    console.log('Error en la peticion');
                }else{
                    //console.log(response.favorites);
                    this.events = response.favorites;
                }
            },
            error => {
                console.log('ERROR: ' + error);
            }
        );
    }

    getViewEvent(id){
        console.log('ID: '+ id);
        this._eventService.getEvent(id).subscribe(
            response => {
                if(!response.event){
                    console.log('No hay envento que coincide');
                }else{
                    this.view_event = response.event[0];
                    //console.log('view_event: '+response);
                    //console.log(this.view_event.artists);
                    this.getChecks(id);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    getChecks(idEvent){
        this._assistanceService.verification(idEvent, this.identity._id).subscribe(
            response => {
                if(response.exist){
                    this.checked_assistance = true;
                }else{
                    this.checked_assistance = false;
                }
            },
            error => {
                console.log('ERROR: ' + error);
            }
        );

        this._favoriteService.verification(idEvent, this.identity._id, this.token).subscribe(
            response => {
                if(response.exist){
                    this.checked_favorite = true;
                }else{
                    this.checked_favorite = false;
                }
            },
            error => {
                console.log('ERROR: ' + error);
            }
        );
    }

    chekedAssistance(idEvent){
        this.checked_assistance = !this.checked_assistance;
        //console.log(this.checked_assistance);

        if(this.checked_assistance){
            this._assistanceService.add(idEvent, this.identity._id, this.token).subscribe(
                response =>{
                    if(!response.assistance){
                        console.log('Error en la peticion');
                    }else{
                        console.log(response.message);
                        this._eventService.incAssistances(idEvent).subscribe(
                            response => {
                                if(!response.event){
                                    console.log('Error en la peticion');
                                }else{
                                    console.log('Se incremento asistencia al evento');
                                }   
                            }, 
                            error => {
                                console.log('ERROR:' + error);
                            }
                        );
                    }
                },
                error => {
                    console.log('ERROR:' + error);
                }
            );
        }else{
            this._assistanceService.delete(idEvent, this.identity._id, this.token).subscribe(
                response =>{
                    if(!response.assistance){
                        console.log('Error en la peticion');
                    }else{
                        console.log(response.message);
                        this._eventService.decAssistances(idEvent).subscribe(
                            response => {
                                if(!response.event){
                                    console.log('Error en la peticion');
                                }else{
                                    console.log('Se decremento asistencia al evento');
                                }   
                            }, 
                            error => {
                                console.log('ERROR:' + error);
                            }
                        );
                    }
                },
                error => {
                    console.log('ERROR:' + error);
                }
            );
        }
    }

    chekedFavorite(idEvent){
        console.log(idEvent);
        this.checked_favorite = !this.checked_favorite;
        //console.log(this.checked_favorite);

        if(this.checked_favorite){
            this._favoriteService.add(idEvent, this.identity._id, this.token).subscribe(
                response =>{
                    if(!response.favorite){
                        console.log('Error en la peticion');
                    }else{
                        console.log(response.message);
                    }
                },
                error => {
                    console.log('ERROR:' + error);
                }
            );
        }else{
            this._favoriteService.delete(idEvent, this.identity._id, this.token).subscribe(
                response =>{
                    if(!response.favorite){
                        console.log('Error en la peticion');
                    }else{
                        console.log(response.message);
                    }
                },
                error => {
                    console.log('ERROR:' + error);
                }
            );
        }
    }
}