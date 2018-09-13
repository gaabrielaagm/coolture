import { Component} from '@angular/core';

@Component({
    selector: 'event-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class EventAddComponent {
    public title : String;

    constructor(){
        this.title = 'Nuevo Evento';
    }

    ngOnInit(): void {
        console.log('EventAddComponent loaded...');
    }
}