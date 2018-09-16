import { Component} from '@angular/core';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent {
    public title : String;

    constructor(){
        this.title = 'Contacto';
    }

    ngOnInit(): void {
        console.log('ContactComponent loaded...');
    }
}