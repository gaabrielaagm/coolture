import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';
import { GLOBAL } from '../../services/global';
import { Event } from '../../models/event';

@Component({
    selector: 'ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.css'],
    providers: [UserService, EventService]
})
export class RankingComponent {
    public title : String;
    public events : Event [];
    public urlImage : String;
    public typeRanking : String;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService : UserService,
        private _eventService : EventService
    ){
        this.title = 'Rankings';
        this.urlImage = GLOBAL.url + 'image-event/';
    }

    ngOnInit(): void {
        console.log('RankingComponent loaded...');

        this._route.params.forEach((params: Params) => {
            this.typeRanking = params['tipo'];

            switch(this.typeRanking){
                case 'general':
                    this.title = 'Ranking general';
                    this.getGeneralEvents();
                    break;
                case 'musica':
                    this.title = 'Ranking Eventos De Musica';
                    this.getClasificationEvents("Musica");
                    break;
                case 'danza':
                    this.title = 'Ranking Eventos De Danza';
                    this.getClasificationEvents("Danza");
                    break;
                case 'pintura':
                    break;
                case 'literatura':
                    this.title = 'Ranking Eventos De Literatura';
                    this.getClasificationEvents("Literatura");
                    break;
                case 'cine':
                    this.title = 'Ranking Eventos De Cine';
                    this.getClasificationEvents("Cine");
                    break;
                case 'arquitectura':
                    this.title = 'Ranking Eventos De Arquitectura';
                    this.getClasificationEvents("Arquitectura");
                    break;
                case 'escultura':
                    this.title = 'Ranking Eventos De Escultura';
                    this.getClasificationEvents("Escultura");
                    break;
            }
        });
    }

    getGeneralEvents(){
        this._eventService.getGeneralRanking().subscribe(
            response => {
                if(!response.events){
                    console.log('Error en la peticion');
                }else{
                    console.log(response.events);
                    this.events = response.events;
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
                    console.log(response.events);
                    this.events = response.events;
                }
            },
            error => {
                console.log('ERROR: ' + error);
            }
        );
    }
}