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
    images = [  
                //"../../../assets/images/bg_home/background1.png", 
                
                //"../../../assets/images/bg_home/background3.jpg",
                //"../../../assets/images/bg_home/background4.jpg",
                "../../../assets/images/bg_home/background5.jpg",
                //"../../../assets/images/bg_home/background6.jpg",
                //"../../../assets/images/bg_home/background7.jpg",
                //"../../../assets/images/bg_home/background8.jpg",
                //"../../../assets/images/bg_home/background9.jpg",
                "../../../assets/images/bg_home/background10.jpg",
                "../../../assets/images/bg_home/background11.jpg",
                "../../../assets/images/bg_home/background12.jpg",
                "../../../assets/images/bg_home/background13.jpg",
                //"../../../assets/images/bg_home/background14.jpg",
                "../../../assets/images/bg_home/background15.jpg",
                "../../../assets/images/bg_home/background16.jpg",
                //"../../../assets/images/bg_home/background17.jpg",
                "../../../assets/images/bg_home/background18.jpg",
                "../../../assets/images/bg_home/background2.jpg", 
            ];

    constructor(
        private _userService: UserService
    ){
        this.title = 'Eventos culturales';
    }

    ngOnInit(): void {
        console.log('HomeComponent loaded...');
    }

    ngDoCheck(): void {
        //console.log(this._userService.getIdentity());   
        //console.log(localStorage.getItem('token'));
    }
}