import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { Interest } from '../../../models/interest';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { GLOBAL } from '../../../services/global';

//Incluir jQuery
declare var jQuery:any;
declare var $:any;

@Component({
    selector: 'edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css'],
    providers: [UserService, UploadService]
})
export class EditProfileComponent {
    public title : String;
    public user: User;
    public interest: Interest;
    public message: string;

    public status_general: boolean;
    public status_image: boolean;
    public status_interests: boolean;
    public status_datos: boolean;
    public status_token: boolean;
    
    public mostrar_form: boolean;

    public dance: Boolean;
    public painting: Boolean;
    public music: Boolean;
    public literature: Boolean;
    public movie: Boolean;
    public architecture: Boolean;
    public sculpture: Boolean;

    public clasifications = [];
    public clasifications_update = [];

    public filesToUpload;
    public url: String;
    public urlImage;
    public imageSelect: Boolean;

    public identity;
    public token;
    public new_pw;
    public verify_pw: Boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService
    ){
        this.title = 'Editar perfil';
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;
        this.urlImage = this.url+'get-image-user/'+this.user.image;
        this.imageSelect = false;
        this.mostrar_form = true;
        this.new_pw = "";

        this.dance = false;
        this.painting = false;
        this.music = false;
        this.literature = false;
        this.movie = false;
        this.architecture = false;
        this.sculpture = false; 

        this.status_datos = this.status_image = this.status_interests = this.status_token = true;
        this.status_general = false;

        _userService.getInterests(this.user._id).subscribe(
            response => {
                this.clasifications = response.interests.interested;
                for(let i=0; i < this.clasifications.length; i++){
                    let clasification = this.clasifications[i];
                    if(clasification == 'Danza') this.dance = true; 
                    if(clasification == 'Pintura') this.painting = true; 
                    if(clasification == 'Musica') this.music = true;
                    if(clasification == 'Literatura') this.literature = true; 
                    if(clasification == 'Cine') this.movie = true; 
                    if(clasification == 'Arquitectura') this.architecture = true; 
                    if(clasification == 'Escultura') this.sculpture = true; 
                }
            },
            error => {
                console.log(error);
            }
        );
        
    }

    ngOnInit(): void {
        console.log('EditProfileComponent loaded...');
    }

    ngDoCheck(){
        // change path on input file of selected image
        $('#file').on('change',function(){
            //get the file name
            var fileName = $(this).val();
            var fileNameShort= fileName.match(/[-_\w]+[.][\w]+$/i)[0];
            //replace the "Choose a file" label
            $(this).next('.custom-file-label').html(fileNameShort);
        });
        
        //console.log('status='+this.status);
        this.urlImage = this.url+'get-image-user/'+this.user.image;
    }

    submit(){
        /* user register */
        console.log(this.user);
        this._userService.updateUser(this.user).subscribe(
            response => {
                if(response.user && response.user._id){
                    this.user = response.user;
                    localStorage.setItem('identity', JSON.stringify(response.user));   
                    this.status_datos = true;                                      
                }else{
                    this.status_datos = false;
                }
            },
            error => {
                if(error.status == 404){                    
                    this.status_datos = false;
                }
                console.log(<any>error);
            }
        );

        /* user interests register */
        if(this.dance) this.clasifications_update.push('Danza');
        if(this.painting) this.clasifications_update.push('Pintura');
        if(this.music) this.clasifications_update.push('Musica');
        if(this.literature) this.clasifications_update.push('Literatura');
        if(this.movie) this.clasifications_update.push('Cine');
        if(this.architecture) this.clasifications_update.push('Arquitectura');
        if(this.sculpture) this.clasifications_update.push('Escultura');

        if(!this.dance && !this.painting && !this.music && !this.literature && !this.movie && !this.architecture && !this.sculpture){
            this.status_interests = false;
        }else{
            console.log(this.clasifications_update);
            this._userService.updateInterests(this.user._id, this.clasifications_update).subscribe(
                response => {
                    localStorage.setItem('userClasifications', JSON.stringify(this.clasifications));
                    this.clasifications = this.clasifications_update;
                    this.clasifications_update = [];
                    localStorage.setItem('userClasifications', JSON.stringify(this.clasifications));
                },
                error => {
                    console.log(<any>error);
                }
            );
            this.status_interests = true;
        }

        /* user image update/upload */
        if(this.filesToUpload != null){
            this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [],
            this.filesToUpload, /*this.token, */ 'image')
            .then((result: any) => {
                this.user.image = result.image;
                localStorage.setItem('identity', JSON.stringify(this.user));
                console.log(this.user); 
            }); 
        }

        /* token update */
        this.user.pw = this.new_pw;
        this._userService.signup(this.user, true).subscribe(
            response => {
                this.token = response.token;
                if(this.token.length <= 0){
                    console.log('El token no se ha generado');
                }else{
                    localStorage.setItem('token', this.token); 
                    this.status_token = true;
                }
            },
            error => {
                console.log(<any>error);
                this.status_token = false;
            }
        );

        if(this.status_datos && this.status_image && this.status_interests && this.status_token){
            //this._router.navigate(['/perfil']);
            this.status_general = true;
        }
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
        this.imageSelect = true;
    }
}