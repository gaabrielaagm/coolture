import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { EventService } from '../../../services/event.service';
import { AssistanceService } from '../../../services/assistance.service';
import { FavoriteService } from '../../../services/favorites.service';
import { GLOBAL } from '../../../services/global';
import { Event } from '../../../models/event';

@Component({
    selector: 'eventsByCategory',
    templateUrl: './eventsByCategory.component.html',
    styleUrls: ['../currentEvents/currentEvents.component.css'],
    providers: [UserService, EventService, AssistanceService, FavoriteService]
})
export class EventsByCategoryComponent {
    public title : String;
    public identity;
    public token;
    public events : Event[];
    public clasification = [];
    public urlImage : String;
    public view_event : Event;
    public checked_assistance;
    public checked_favorite;
    public to_search : String;
    public category;
    public view_type : String;
    public items_size;
    public items_showed;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService : UserService,
        private _eventService : EventService,
        private _assistanceService : AssistanceService,
        private _favoriteService : FavoriteService
    ){
        this.events = null;
        this.title = 'Eventos por categoría';
        this.identity = this._userService.getIdentity();
        this.token = _userService.getToken();
        this.urlImage = GLOBAL.url + 'image-event/';
        this.view_event = new Event('','','',[],'','','','','',null,'',null,null,'');
        this.to_search = "";
        this.view_type = 'card';
        this.items_showed = 5;
        this.getEvents();
    }

    ngOnInit(): void {
        console.log('EventsByCategoryComponent loaded...');
    }

    ngDoCheck(): void {
        //this.getEvents();
    }

    getEvents(){    
        this._route.params.forEach((params: Params) => {
            this.category = params['category'];
            this.clasification = [];
            this.clasification.push(this.category);

            this._eventService.getEventsByClasifications(this.clasification).subscribe(
                response => {
                    if(!response.events){
                        console.log('Error en la petición');
                    }else{
                        this.events = response.events;
                        this.items_size = this.events.length;
                        //console.log(this.events.length);
                    }
                },
                error => {
                    console.log('ERROR: ' + error);
                }
            );
        });
    }

    getViewEvent(id){
        this._eventService.getEvent(id).subscribe(
            response => {
                if(!response.event){
                    console.log('No hay envento que coincide');
                }else{
                    this.view_event = response.event[0];
                    //console.log(this.view_event);
                    //console.log(this.view_event.artists);
                    this.getChecks(id);
                    if(this.identity != null) this.getChecks(id);
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

    viewType(type){
        this.view_type = type;
        console.log(this.view_type);
    }

    incrementItems(type){
        if(type == 'increment')
            this.items_showed = this.items_showed + 5;
        else
            this.items_showed = this.items_size;
    }
}