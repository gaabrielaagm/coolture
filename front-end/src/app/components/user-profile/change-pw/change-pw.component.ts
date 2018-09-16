import { Component} from '@angular/core';

@Component({
    selector: 'change-pw',
    templateUrl: './change-pw.component.html',
    styleUrls: ['./change-pw.component.css']
})
export class ChangePwComponent {
    public title : String;

    constructor(){
        this.title = 'Cambiar contraseña';
    }

    ngOnInit(): void {
        console.log('ChangePwComponent loaded...');
    }
}