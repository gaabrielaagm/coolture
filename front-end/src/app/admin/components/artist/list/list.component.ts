import { Component} from '@angular/core';
import { ArtistService } from '../../../../services/artist.service';
import { UserService } from '../../../../services/user.service';
import { GLOBAL } from '../../../../services/global';
import { Artist } from '../../../../models/artist';
import { UploadService } from '../../../../services/upload.service';

//Incluir jQuery
declare var jQuery:any;
declare var $:any;

@Component({
    selector: 'artist-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    providers: [ArtistService, UserService, UploadService]
})
export class ArtistListComponent {
    public title : String;
    public artists : Artist[];
    public view_artist : Artist;
    public edit_artist : Artist;
    public urlImage : String;
    public url : String;
    public to_search : String;
    public token;

    public filesToUpload;
    public imageSelect: Boolean;

    public status_general : String;

    constructor(
        private _artistService : ArtistService,
        private _userService : UserService,
        private _uploadService : UploadService
    ){
        this.title = 'Lista de Artistas';
        this.url = GLOBAL.url;
        this.urlImage = this.url+'image-artist/';
        this.to_search = "";
        this.token = this._userService.getToken();
        this.view_artist = new Artist('','','','',false);
        this.edit_artist = new Artist('','','','',false);
    }

    ngOnInit(): void {
        console.log('ArtistListComponent loaded...');
        this.getArtists();
    }

    ngDoCheck(): void {
        // change path on input file of selected image
        $('#file').on('change',function(){
            var fileName = $(this).val();
            var fileNameShort= fileName.match(/[-_\w]+[.][\w]+$/i)[0];
            $(this).next('.custom-file-label').html(fileNameShort);
        });
    }

    getArtists(){
        this._artistService.getArtists().subscribe(
            response => {
                if(!response.artists){
                    console.log('No hay eventos');
                }else{
                    this.artists = response.artists;
                    console.log(this.artists);
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    getViewArtist(id){
        this._artistService.getArtist('id',id).subscribe(
            response => {
                if(!response.artist){
                    console.log('No hay artista que coincide');
                }else{
                    this.view_artist = response.artist[0];
                    console.log(this.view_artist);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    deleteArtist(id){
        //$('#modal-'+id).modal('hide');        
        this._artistService.deleteArtist(this.token, id).subscribe(
            response => {
                if(!response.artist){
                    console.log('error en el servidor');
                }else{
                    this.getArtists();
                }
            },
            error => {
                console.log('error en el servidor '+<any>error);
            }
        );
        console.log('eliminado...');
    }

    editArtist(artist){
        this.edit_artist = Object.assign({}, artist);
        console.log('Artista a editar: '+ this.edit_artist);
    }

    updateArtist(){
        console.log('Artista editado => ' + this.edit_artist.name);
        this._artistService.editArtist(this.edit_artist, this.token).subscribe(
            response => {
                if(!response.artist){
                    console.log('Error al editar al artista');
                }else{
                    console.log('Artista editado');
                    console.log(response.artist);
                    var artistId = response.artist._id;
                    console.log(artistId);
                    /* user image upload */            
                    if(this.filesToUpload != null && artistId != null){                                
                        this._uploadService.makeFileRequest(this.url+'image-artist/'+artistId, [],
                        this.filesToUpload, 'image')
                        .then((result: any) => {
                            console.log(result);
                            this.status_general = 'success';
                        });
                    }else{
                        console.log('No hay archivos');
                        this.status_general = 'success';
                    }

                    this.getArtists();
                }
            },
            error => {
                console.log('ERROR: '+ error);
            }
        );
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
        this.imageSelect = true;
    }
}