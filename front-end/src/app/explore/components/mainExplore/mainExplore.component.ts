import { Component} from '@angular/core';

@Component({
    selector: 'mainExplore',
    templateUrl: './mainExplore.component.html',
    styleUrls: ['./mainExplore.component.css']
})
export class MainExploreComponent { 
    public title : String;

    constructor(){
        this.title = 'Explorar';
    }

    ngOnInit(): void {
        console.log('MainExploreComponent loaded...');
    }
}