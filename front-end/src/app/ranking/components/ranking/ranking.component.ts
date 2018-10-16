import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { EventService } from '../../../services/event.service';
import { AssistanceService } from '../../../services/assistance.service';
import { FavoriteService } from '../../../services/favorites.service';
import { GLOBAL } from '../../../services/global';
import { Event } from '../../../models/event';
import * as moment from 'moment';

@Component({
    selector: 'ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.css'],
    providers: [UserService, EventService, AssistanceService, FavoriteService]
})
export class RankingComponent {
    public title : String;
    public identity;
    public token;
    public events : Event [];
    public urlImage : String;
    public typeRanking : String;
    public view_event : Event;
    public checked_assistance;
    public checked_favorite;
    public monthNumber;
    public monthString;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService : UserService,
        private _eventService : EventService,
        private _assistanceService : AssistanceService,
        private _favoriteService : FavoriteService
    ){
        this.title = 'Rankings del mes';
        this.urlImage = GLOBAL.url + 'image-event/';
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
        this.view_event = new Event('','','',[],'','','','','',null,'',null,null,'');
        this.monthNumber = moment().month()+1;       
    }

    ngOnInit(): void {
        console.log('RankingComponent loaded...');
        this.events = null;
        this._route.params.forEach((params: Params) => {
            this.typeRanking = params['tipo'];
            console.log(this.typeRanking);

            switch(this.typeRanking){
                case 'general':
                    this.getGeneralEvents();
                    break;
                case 'musica':
                    this.getClasificationEvents("Musica");
                    break;
                case 'danza':
                    this.getClasificationEvents("Danza");
                    break;
                case 'pintura':
                    this.getClasificationEvents("Pintura");
                    break;
                case 'literatura':
                    this.getClasificationEvents("Literatura");
                    break;
                case 'cine':
                    this.getClasificationEvents("Cine");
                    break;
                case 'arquitectura':
                    this.getClasificationEvents("Arquitectura");
                    break;
                case 'escultura':
                    this.getClasificationEvents("Escultura");
                    break;
            }
        });

        switch(this.monthNumber){
            case 1:
                this.monthString = 'Enero';
                break;
            case 2:
                this.monthString = 'Febrero';
                break;
            case 3:
                this.monthString = 'Marzo';
                break;
            case 4:
                this.monthString = 'Abril';
                break;
            case 5:
                this.monthString = 'Mayo';
                break;
            case 6:
                this.monthString = 'Junio';
                break;
            case 7:
                this.monthString = 'Julio';
                break;
            case 8:
                this.monthString = 'Agosto';
                break;
            case 9:
                this.monthString = 'Septiembre';
                break;
            case 10:
                this.monthString = 'Octubre';
                break; 
            case 11:
                this.monthString = 'Noviembre';
                break;
            case 12:
                this.monthString = 'Diciembre';
                break;   
        }
    }

    ngDoCheck(): void {
        
    }

    getGeneralEvents(){
        this._eventService.getGeneralRanking().subscribe(
            response => {
                if(!response.events){
                    console.log('Error en la peticion');
                }else{
                    this.title = 'Ranking general de ' + this.monthString;
                    //console.log(response.events);
                    this.events = response.events;
                    //console.log('LENGTH = ' + this.events.length);
                }
            },
            error => {
                console.log('ERROR: ' + error);
            }
        );
    }

    getClasificationEvents(clasification){
        this._eventService.getClasificationRanking(clasification).subscribe(
            response => {
                if(!response.events){
                    console.log('Error en la peticion');
                }else{
                    this.title = 'Ranking eventos de ' + clasification + " de " + this.monthString;
                    //console.log(response.events);
                    this.events = response.events;
                    //console.log('LENGTH = ' + this.events.length);
                }
            },
            error => {
                console.log('ERROR: ' + error);
            }
        );
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
}