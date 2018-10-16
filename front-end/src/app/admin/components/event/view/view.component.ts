import { Component} from '@angular/core';
import { EventService } from '../../../../services/event.service';
import { UserService } from '../../../../services/user.service';
import { ArtistService } from '../../../../services/artist.service';
import { GLOBAL } from '../../../../services/global';
import { Event } from '../../../../models/event';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';

@Component({
    selector: 'event-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css'],
    providers: [EventService, UserService]
})

export class EventViewComponent {
    public title : String;
    public url : String;
    public event : Event;
    public urlImage : String;
    public artists : String[];
    public idsArtists : {};
    public identity;
    public token;
    public title_artist;

    constructor(
        private _eventService : EventService,
        private _userService : UserService,
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
                        //console.log(this.event);
                        //console.log(this.event.artists);
                    }
                },
                error => {
                    this._router.navigate(['/admin-panel']);
                    console.log(<any>error);
                }
            );
            
        });
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
}