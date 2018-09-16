import { Component} from '@angular/core';

@Component({
    selector: 'view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
    public title : String;

    constructor(){
        this.title = 'Ver perfil';
    }

    ngOnInit(): void {
        console.log('ViewProfileComponent loaded...');
    }
}