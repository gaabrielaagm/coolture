import { Component} from '@angular/core';

@Component({
    selector: 'event-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class EventListComponent {
    public title : String;

    constructor(){
        this.title = 'Lista de Eventos';
    }

    ngOnInit(): void {
        console.log('EventListComponent loaded...');
    }
}