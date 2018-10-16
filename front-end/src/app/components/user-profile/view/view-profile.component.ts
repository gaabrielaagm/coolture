import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Interest } from '../../../models/interest';
import { GLOBAL } from '../../../services/global';
import { User } from '../../../models/user';

@Component({
    selector: 'view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.css'],
    providers: [UserService]
})
export class ViewProfileComponent {
    public title : String;
    public user: User;
    public identity;
    public token;
    public url: String;
    public urlImage: String;
    public interests: Interest;

    public clasifications;

    public dance: Boolean;
    public painting: Boolean;
    public music: Boolean;
    public literature: Boolean;
    public movie: Boolean;
    public architecture: Boolean;
    public sculpture: Boolean;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Ver perfil';
        this.identity = _userService.getIdentity();
        this.token = _userService.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;
        this.urlImage = this.url+'get-image-user/'+this.user.image;

        this.dance = false;
        this.painting = false;
        this.music = false;
        this.literature = false;
        this.movie = false;
        this.architecture = false;
        this.sculpture = false;
    }

    ngOnInit(): void {
        console.log('ViewProfileComponent loaded...');
        this.actualizar();        
    }

    ngDoCheck(): void { 
        this.actualizar();
    }

    actualizar(){
        this.clasifications = this._userService.getClasifications();
        for(let i=0; i < this.clasifications.length; i++){
            let clasification = this.clasifications[i];
            switch(clasification){
                case 'Danza':
                    this.dance = true; 
                    break;
                case 'Pintura':
                    this.painting = true; 
                    break;
                case 'Musica':
                    this.music = true;
                    break;
                case 'Literatura':
                    this.literature = true; 
                    break;
                case 'Cine':
                    this.movie = true; 
                    break;
                case 'Arquitectura':
                    this.architecture = true; 
                    break;
                case 'Escultura':
                    this.sculpture = true; 
                    break;
            }
        //console.log(this.clasifications);
    }
}
}