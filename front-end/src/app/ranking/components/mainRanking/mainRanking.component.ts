import { Component} from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'mainRanking',
    templateUrl: './mainRanking.component.html',
    styleUrls: ['./mainRanking.component.css'],
    providers: [UserService]
})
export class MainRankingComponent { 
    public title : String;
    public identity;

    constructor(
        private _userService : UserService
    ){
        this.title = 'Ranking';
    }

    ngOnInit(): void {
        console.log('MainRankingComponent loaded...');
        this.identity = this._userService.getIdentity();
    }
}