import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Interest } from '../../models/interest';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';

//Incluir jQuery
declare var jQuery:any;
declare var $:any;

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [UserService, UploadService]
})
export class RegisterComponent {
    public title: string;
    public user: User;
    public interest: Interest;
    public message: string;
    public status: string;
    public correo_registrado: string;
    public mostrar_form: boolean;

    public dance: Boolean;
    public painting: Boolean;
    public music: Boolean;
    public literature: Boolean;
    public movie: Boolean;
    public architecture: Boolean;
    public sculpture: Boolean;

    public clasifications = [];

    public notify: Boolean;

    public filesToUpload;
    public url: String;
    public imageSelect: Boolean;

    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService
    ){
        this.title = 'Registro';
        this.user = new User('','','','','','ROLE_USER','',false,true);
        //this.interest = new Interest('',[],'');
        this.status = "";
        this.mostrar_form = true;
        this.dance = true;
        this.painting = false;
        this.music = false;
        this.literature = false;
        this.movie = false;
        this.architecture = false;
        this.sculpture = false;
        this.notify = true;
        this.url = GLOBAL.url;
        this.imageSelect = false;
        this.filesToUpload = null;
    }

    ngOnInit(): void {
        console.log('RegisterComponent loaded...');
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
    }

    submit(){
        /* user register */
        this._userService.register(this.user).subscribe(
            response => {
                if(response.user && response.user._id){
                    //console.log(response.user);
                    this.correo_registrado = response.user.email;
                    if(this.dance) this.clasifications.push('Danza');
                    if(this.painting) this.clasifications.push('Pintura');
                    if(this.music) this.clasifications.push('Musica');
                    if(this.literature) this.clasifications.push('Literatura');
                    if(this.movie) this.clasifications.push('Cine');
                    if(this.architecture) this.clasifications.push('Arquitectura');
                    if(this.sculpture) this.clasifications.push('Escultura');

                    var userId = response.user._id;

                    /* user interests register */
                    this._userService.registerInterests(response.user._id, this.clasifications).subscribe(
                        response => {
                            /* user image upload */
                            if(this.filesToUpload != null){                                
                                this._uploadService.makeFileRequest(this.url+'upload-image-user/'+userId, [],
                                this.filesToUpload, /*this.token,*/ 'image')
                                .then((result: any) => {
                                    this.status = 'success';
                                    this.mostrar_form = false;
                                    this.clasifications = [];
                                });

                            }else{
                                this.status = 'success';
                                this.mostrar_form = false;
                                this.clasifications = [];
                            }
                        },
                        error => {
                            console.log(<any>error);
                        }
                    );
                }else{
                    this.status = 'errorSave';
                }
            },
            error => {
                if(error.status == 404){                    
                    this.status = 'errorExist';
                }
                console.log(<any>error);
            }
        );
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
        this.imageSelect = true;
    }
}