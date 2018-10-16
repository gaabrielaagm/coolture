import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { EventService } from '../../../services/event.service';
import { GLOBAL } from '../../../services/global';
import { Event } from '../../../models/event';

@Component({
    selector: 'eventsByCategory',
    templateUrl: './eventsByCategory.component.html',
    styleUrls: ['./eventsByCategory.component.css'],
    providers: [UserService, EventService]
})
export class EventsByCategoryComponent {
    public title : String;
    public events : Event[];
    public clasification = [];
    public identity : String;
    public urlImage : String;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService : UserService,
        private _eventService : EventService
    ){
        this.title = 'Eventos por categoría';
    }

    ngOnInit(): void {
        console.log('EventsByCategoryComponent loaded...');
        this.getEvents();
        this.identity = this._userService.getIdentity();
        this.urlImage = GLOBAL.url + 'image-event/';
    }

    ngDoCheck(): void {
        //this.getEvents();
    }

    getEvents(){    
        this._route.params.forEach((params: Params) => {
            let category = params['category'];
            this.clasification = [];
            this.clasification.push(category);

            this._eventService.getEventsByClasifications(this.clasification).subscribe(
                response => {
                    if(!response.events){
                        console.log('Error en la petición');
                    }else{
                        this.events = response.events;
                        //console.log(this.events);
                    }
                },
                error => {
                    console.log('ERROR: ' + error);
                }
            );
        });
    }
}