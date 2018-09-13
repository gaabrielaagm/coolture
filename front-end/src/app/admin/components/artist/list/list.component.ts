import { Component} from '@angular/core';

@Component({
    selector: 'artist-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ArtistListComponent {
    public title : String;

    constructor(){
        this.title = 'Lista de Artitas';
    }

    ngOnInit(): void {
        console.log('ArtistListComponent loaded...');
    }
}