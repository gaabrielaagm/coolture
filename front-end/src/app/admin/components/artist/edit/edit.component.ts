import { Component} from '@angular/core';
import { ArtistService } from '../../../../services/artist.service';
import { UserService } from '../../../../services/user.service';
import { GLOBAL } from '../../../../services/global';
import { Artist } from '../../../../models/artist';

@Component({
    selector: 'artist-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
    providers: [ArtistService, UserService]
})
export class ArtistEditComponent {
    public title : String;
    public artist : Artist;
    public view_artist : Artist;
    public urlImage : String;
    public url : String;
    public to_search : String;
    public token;

    constructor(){
        this.title = 'Editar Artista';
    }

    ngOnInit(): void {
        console.log('ArtistEditComponent loaded...');
    }
}