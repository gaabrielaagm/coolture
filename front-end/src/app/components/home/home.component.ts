import { Component} from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [UserService]
})
export class HomeComponent {
    public title : String;

    constructor(
        private _userService: UserService
    ){
        this.title = 'Home';
    }

    ngOnInit(): void {
        console.log('HomeComponent loaded...');
    }

    ngDoCheck(): void {
        console.log(this._userService.getIdentity());   
        console.log(localStorage.getItem('token'));
    }
}