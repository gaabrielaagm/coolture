import { Component} from '@angular/core';

@Component({
    selector: 'artist-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class ArtistDeleteComponent {
    public title : String;

    constructor(){
        this.title = 'Eliminar Arttista';
    }

    ngOnInit(): void {
        console.log('ArtistDeleteComponent loaded...');
    }
}