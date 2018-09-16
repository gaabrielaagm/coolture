import { Component} from '@angular/core';

@Component({
    selector: 'ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.css']
})
export class RankingComponent {
    public title : String;

    constructor(){
        this.title = 'Rankings';
    }

    ngOnInit(): void {
        console.log('RankingComponent loaded...');
    }
}