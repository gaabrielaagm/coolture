import { Component} from '@angular/core';

@Component({
    selector: 'events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent {
    public title : String;

    constructor(){
        this.title = 'Eventos';
    }

    ngOnInit(): void {
        console.log('EventsComponent loaded...');
    }
}