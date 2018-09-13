import { Component} from '@angular/core';

@Component({
    selector: 'artist-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class ArtistEditComponent {
    public title : String;

    constructor(){
        this.title = 'Editar Artista';
    }

    ngOnInit(): void {
        console.log('ArtistEditComponent loaded...');
    }
}