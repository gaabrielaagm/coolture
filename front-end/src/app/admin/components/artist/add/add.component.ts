import { Component} from '@angular/core';

@Component({
    selector: 'artist-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})
export class ArtistAddComponent {
    public title : String;

    constructor(){
        this.title = 'Nuevo Artista';
    }

    ngOnInit(): void {
        console.log('ArtistAddComponent loaded...');
    }
}