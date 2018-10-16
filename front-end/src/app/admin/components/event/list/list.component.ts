import { Component} from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { UserService } from '../../../../services/user.service';
import { GLOBAL } from '../../../../services/global';
import { Event } from '../../../../models/event';
import 'jquery';

//Incluir jQuery
declare var jQuery:any;
declare var $:any;

@Component({
    selector: 'event-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    providers: [EventService, UserService]
})
export class EventListComponent {
    public title : String;
    public events : Event [];
    public view_event : Event;
    public urlImage : String;
    public url : String;
    public to_search : String;
    public token;
    public title_artist;

    constructor(
        private _eventService : EventService,
        private _userService : UserService
    ){
        this.title = 'Lista de Eventos';
        this.url = GLOBAL.url;
        this.urlImage = this.url+'image-event/';
        this.to_search = "";
        this.token = this._userService.getToken();
        this.view_event = new Event('','','',[],'','','','','',null,'',null,null,'');
        this.title_artist = "";
    }

    ngOnInit(): void {
        console.log('EventListComponent loaded...');
        this.getEvents();
    }

    getEvents(){
        this._eventService.getAllEvents().subscribe(
            response => {
                if(!response.events){
                    console.log('No hay eventos');
                }else{
                    this.events = response.events;
                    console.log(this.events);
                }
            },
            error => {
                console.log(error);
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
                    this.getEvents();
                }
            },
            error => {
                console.log('error en el servidor '+<any>error);
            }
        );
        console.log('eliminado...');
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
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    showInfoArtist(artist_name){
        this.title_artist = artist_name;
    }
}