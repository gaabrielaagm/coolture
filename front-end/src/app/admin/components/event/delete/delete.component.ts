import { Component} from '@angular/core';

@Component({
    selector: 'event-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class EventDeleteComponent {
    public title : String;

    constructor(){
        this.title = 'Eliminar Evento';
    }

    ngOnInit(): void {
        console.log('EventDeleteComponent loaded...');
    }
}