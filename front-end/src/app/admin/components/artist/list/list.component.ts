import { Component} from '@angular/core';

@Component({
    selector: 'artist-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ArtistListComponent {
    public title : String;

    constructor(){
        this.title = 'Lista de Artistas';
    }

    ngOnInit(): void {
        console.log('ArtistListComponent loaded...');
    }
}