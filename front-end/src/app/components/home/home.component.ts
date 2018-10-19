import { Component} from '@angular/core';
import { UserService } from '../../services/user.service';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [UserService, NgbPaginationModule, NgbAlertModule]
})
export class HomeComponent {
    public title : String;
    //images = [1, 2, 3].map(() => `https://picsum.photos/1500/730?random&t=${Math.random()}`);
    images = ["../../../assets/images/bg_home/background1.png", 
                "../../../assets/images/bg_home/background2.png", 
                "../../../assets/images/bg_home/background3.png"];

    constructor(
        private _userService: UserService
    ){
        this.title = 'Home';
    }

    ngOnInit(): void {
        console.log('HomeComponent loaded...');
    }

    ngDoCheck(): void {
        //console.log(this._userService.getIdentity());   
        //console.log(localStorage.getItem('token'));
    }
}