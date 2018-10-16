import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Artist } from '../../../../models/artist';
import { UserService } from '../../../../services/user.service';
import { ArtistService } from '../../../../services/artist.service';
import { UploadService } from '../../../../services/upload.service';
import { GLOBAL } from '../../../../services/global';
import { TitleCasePipe } from '@angular/common';

//Incluir jQuery
declare var jQuery:any;
declare var $:any;

@Component({
    selector: 'artist-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css'],
    providers: [UploadService, ArtistService, UserService]
})
export class ArtistAddComponent {

    public title : String;
    public artist : Artist;
    public artistId : String;
    public mostrar_form : Boolean;

    public filesToUpload;
    public imageSelect: Boolean;

    public status_general : String;

    public url : String;
    
    public token;

    constructor(
        private _userService : UserService,
        private _artistService : ArtistService,
        private _uploadService : UploadService,
        private titlecasePipe : TitleCasePipe
    ){
        this.title = 'Agregar Artista';
        this.artist = new Artist('','','','',false);
        this.mostrar_form = true;
        this.url = GLOBAL.url;
        this.token = _userService.getToken();
    }

    ngOnInit(): void {
        console.log('ArtistAddComponent loaded...');
    }

    ngDoCheck(): void {

        this.artist.name = this.titlecasePipe.transform(this.artist.name.toString());

        // change path on input file of selected image
        $('#file').on('change',function(){
            var fileName = $(this).val();
            var fileNameShort= fileName.match(/[-_\w]+[.][\w]+$/i)[0];
            $(this).next('.custom-file-label').html(fileNameShort);
        });
    }

    submit(){
        console.log(this.artist);
        let token = this._userService.getToken();
        console.log(token);

        this._artistService.addArtist(this.artist, token).subscribe(
            response => {
                if(!response.artist){
                    console.log('Error al agregar artista');
                }else{
                    var artistCreated: Artist;
                    artistCreated = response.artist;
                    console.log('artista creado: ' + artistCreated);
                    
                    this.artistId = response.artist._id;
                    //console.log(response.artist._id);
                    //console.log(response.artist.clasification);
                    //console.log('artista registrado');
                    
                    /* user image upload */            
                    if(this.filesToUpload != null && this.artistId != null){                                
                        this._uploadService.makeFileRequest(this.url+'image-artist/'+this.artistId, [],
                        this.filesToUpload, 'image')
                        .then((result: any) => {
                            console.log(result);
                            this.status_general = 'success';
                            this.mostrar_form = false;
                        });
                    }else{
                        console.log('No hay archivos');
                        this.status_general = 'success';
                        this.mostrar_form = false;
                    }  
                }
            },
            error => {
                console.log(error.status);
                if(error.status == 404){
                    this.status_general = 'repeated-artist';
                    console.log('artista repetido');
                }
            }
        );      
    } 

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
        this.imageSelect = true;
    }
}