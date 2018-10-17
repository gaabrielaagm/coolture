import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent {
    public title : String;
    public user: User;
    public identity;
    public token;
    public error;
    public status;

    public clasifications = [];

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Ingresar';
        this.user = new User('','','','','','ROLE_USER','',false,true);
        this.error = '';
    }

    ngOnInit(): void {
        console.log('LoginComponent loaded...');
    }

    submit(){
        //Loguear al usuario y coseguir el objeto (sus datos)
        this._userService.signup(this.user, false).subscribe(
            response => {
                this.identity = response.user;
                if(!this.identity || !this.identity._id){
                    alert('Usuario no logueado correctamente');
                }else{
                    // se hace un stringify() por que local storage no permite guardar objetos completos (solo numeros o strings)
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    //console.log(JSON.stringify(this.identity));

                    //conseguir el token
                    this._userService.signup(this.user, true).subscribe(
                        response => {
                            this.token = response.token;
            
                            if(this.token.length <= 0){
                                alert('El token no se ha generado');
                            }else{
                                //Mostrar el token
                                //console.log(this.token);
                                localStorage.setItem('token', this.token); //token no ocupa stringify porque ya es un string
                                // console.log(localStorage.getItem('token'));
                                // console.log(localStorage.getItem('identity'));
                                this._router.navigate(['/home']);
                            }
                        },
                        error => {
                            console.log(<any>error);
                        }
                    );

                    /* setting localStorage of user clasifications */
                    
                    this._userService.getInterests(this.identity._id).subscribe(
                        response => {
                            this.clasifications = response.interests.interested;
                            localStorage.setItem( 'userClasifications', JSON.stringify(this.clasifications) );
                        },
                        error => {
                            console.log(error);
                        }
                    );
                }
            },
            error => {
                console.log(<any>error);
                var errorMessage = <any>error;
                if(errorMessage != null){
                    var body = JSON.parse(errorMessage._body);
                    console.log(body);
                    this.error = body.error;
                    console.log(this.error);
                }
            }
        );

        
    }
}