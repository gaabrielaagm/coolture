import { Component} from '@angular/core';

@Component({
    selector: 'artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {
    public title : String;

    constructor(){
        this.title = 'Artistas';
    }

    ngOnInit(): void {
        console.log('ArtistsComponent loaded...');
    }
}