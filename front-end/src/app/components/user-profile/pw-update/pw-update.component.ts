import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

@Component({
    selector: 'pw-update',
    templateUrl: './pw-update.component.html',
    styleUrls: ['./pw-update.component.css'],
    providers: [UserService]
})
export class PwUpdateComponent {
    public title : String;
    public oldPw : String;
    public newPw : String;
    public samePw : Boolean;
    public url : String;
    public user : User;
    public mostrarForm : Boolean;
    public status : String;

    constructor(
        private _userService : UserService
    ){
        this.title = 'Actualizar contraseña';
        this.samePw = false;
        this.url = GLOBAL.url;
        this.mostrarForm = true;
    }

    ngOnInit(): void {
        console.log('PwUpdateComponent loaded...');
    }

    submit(){
        if(this.oldPw == this.newPw){
            this.status = 'samePw'
        }else{
            this.user = this._userService.getIdentity();

            this._userService.updatePw(this.oldPw, this.newPw, this.user._id).subscribe(
                response => {
                    if(response.status == 200){
                        this.status = 'success';
                        this.mostrarForm = false;
                    }else{
                        this.status = 'error';
                    }                    
                },
                error => {
                    this.status = 'error';                    
                }
            );
        } 
    }
}