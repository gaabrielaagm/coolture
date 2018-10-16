import { Component} from '@angular/core';
import { EventService } from '../../../services/event.service';
import { UserService } from '../../../services/user.service';
import { AssistanceService } from '../../../services/assistance.service';
import { FavoriteService } from '../../../services/favorites.service';
import { GLOBAL } from '../../../services/global';
import { Event } from '../../../models/event';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';

@Component({
    selector: 'event-view-user',
    templateUrl: './viewEvent.component.html',
    providers: [EventService, UserService, AssistanceService, FavoriteService]
})

export class EventViewComponent {
    public title : String;
    public url : String;
    public event : Event;
    public idEvent : String;
    public urlImage : String;
    public artists : String[];
    public idsArtists : {};
    public identity;
    public token;
    public title_artist;
    public checked_assistance;
    public checked_favorite;

    constructor(
        private _eventService : EventService,
        private _userService : UserService,
        private _assistanceService : AssistanceService,
        private _favoriteService : FavoriteService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Ver detalle evento';
        this.url = GLOBAL.url;

        //this.event = null;
        this.event = new Event('','','',[],'','','','','',null,'',null,null,'');

        this.urlImage = this.url+'image-event/';

        this.token = _userService.getToken();

        this.identity = _userService.getIdentity();
        //console.log(this.identity);

        /*
        this.checked_assistance = false;
        this.checked_favorite = false;
        */
    }

    ngOnInit() {
        console.log('EventViewComponent loaded...');
        this.getEvent();
        
    }

    getEvent(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            
            this._eventService.getEvent(id).subscribe(
                response => {
                    if(!response.event){
                        this._router.navigate(['/admin-panel']);
                    }else{
                        this.event = response.event[0];
                        this.idEvent = response.event[0]._id;
                        //console.log(this.idEvent);
                        //console.log(this.event);
                        //console.log(this.event.artists);

                        this.getChecks();
                    }
                },
                error => {
                    this._router.navigate(['/admin-panel']);
                    console.log(<any>error);
                }
            );
            
        });
    }

    getChecks(){
        this._assistanceService.verification(this.idEvent, this.identity._id).subscribe(
            response => {
                if(response.exist){
                    this.checked_assistance = true;
                }else{
                    this.checked_assistance = false;
                }
            },
            error => {

            }
        );

        this._favoriteService.verification(this.idEvent, this.identity._id, this.token).subscribe(
            response => {
                if(response.exist){
                    this.checked_favorite = true;
                }else{
                    this.checked_favorite = false;
                }
            },
            error => {

            }
        );
    }

    deleteEvent(id){
        //$('#modal-'+id).modal('hide');        
        this._eventService.deleteEvent(this.token, id).subscribe(
            response => {
                if(!response.event){
                    console.log('error en el servidor');
                }else{
                    this._router.navigate(['/admin-panel/listado-eventos']);
                }
            },
            error => {
                console.log('error en el servidor '+<any>error);
            }
        );
        console.log('eliminado...');
    }

    showInfoArtist(artist_name){
        this.title_artist = artist_name;
    }

    chekedAssistance(){
        this.checked_assistance = !this.checked_assistance;
        //console.log(this.checked_assistance);

        if(this.checked_assistance){
            this._assistanceService.add(this.idEvent, this.identity._id, this.token).subscribe(
                response =>{
                    if(!response.assistance){
                        console.log('Error en la peticion');
                    }else{
                        console.log(response.message);
                        this._eventService.incAssistances(this.idEvent).subscribe(
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
            this._assistanceService.delete(this.idEvent, this.identity._id, this.token).subscribe(
                response =>{
                    if(!response.assistance){
                        console.log('Error en la peticion');
                    }else{
                        console.log(response.message);
                        this._eventService.decAssistances(this.idEvent).subscribe(
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

    chekedFavorite(){
        this.checked_favorite = !this.checked_favorite;
        //console.log(this.checked_favorite);

        if(this.checked_favorite){
            this._favoriteService.add(this.idEvent, this.identity._id, this.token).subscribe(
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
            this._favoriteService.delete(this.idEvent, this.identity._id, this.token).subscribe(
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