import { Component} from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'mainEvents',
    templateUrl: './mainEvents.component.html',
    styleUrls: ['./mainEvents.component.css'],
    providers: [UserService]
})
export class MainEventsComponent {
    public title : String;
    public identity;

    constructor(
        private _userService : UserService
    ){
        this.title = 'Mis Eventos';
    }

    ngOnInit(): void {
        console.log('MainEventsComponent loaded...');
        this.identity = this._userService.getIdentity();
    }
}