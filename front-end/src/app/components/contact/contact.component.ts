import { Component} from '@angular/core';
import { EmailService } from '../../services/email.service';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    providers: [EmailService]
})
export class ContactComponent {
    public title : String;
    public email_user: String;
    public name_user: String;
    public message_user: String;
    public emailState: String;

    constructor(
        private _emailService : EmailService
    ){
        this.title = 'Contacto';
        this.email_user = '';
        this.name_user = '';
        this.message_user = '';
        this.emailState = null;
    }

    ngOnInit(): void {
        console.log('ContactComponent loaded...');
    }

    submit(){
        this._emailService.sendContactMail(this.email_user, this.name_user, this.message_user).subscribe(
            response => {
                if(response.state == 'success'){ 
                    console.log('Email enviado');
                    this.emailState = 'success';
                }else{
                    console.log('Error al enviar email');
                    this.emailState = 'fail';
                }
            },
            error => {
                console.log('Error al enviar emails ' + error);
                this.emailState = 'fail';
            }
        );
    }

    again(){
        this.emailState = null;
    }
}