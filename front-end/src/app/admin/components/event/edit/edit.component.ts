import { Component} from '@angular/core';

@Component({
    selector: 'event-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EventEditComponent {
    public title : String;

    constructor(){
        this.title = 'Editar Evento';
    }

    ngOnInit(): void {
        console.log('EventEditComponent loaded...');
    }
}