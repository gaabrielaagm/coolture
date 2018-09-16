import { Component} from '@angular/core';

@Component({
    selector: 'edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
    public title : String;

    constructor(){
        this.title = 'Editar perfil';
    }

    ngOnInit(): void {
        console.log('EditProfileComponent loaded...');
    }
}