import { Component, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Event } from '../../../../models/event';
import { EventService } from '../../../../services/event.service';
import { UserService } from '../../../../services/user.service';
import { UploadService } from '../../../../services/upload.service';
import { GLOBAL } from '../../../../services/global';
import { TitleCasePipe } from '@angular/common';
import * as moment from 'moment';
import {DatePickerComponent} from 'ng2-date-picker';

//Incluir jQuery
declare var jQuery:any;
declare var $:any;

@Component({
    selector: 'event-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
    providers: [EventService, UserService, UploadService]
})
export class EventEditComponent {

    public title : String;
    public mostrar_form : Boolean;
    public event : Event;
    public url : String;
    public status_saveArtist : String;

    public clasifications_names = ['Danza', 'Pintura', 'Musica', 'Literatura', 'Cine', 'Arquitectura', 'Escultura'];
    public _clasificationSelected : String;

    public artists;
    public name_new_artist : String;
    public name_old_artist : String;

    public selectedDate;
    public selectedDate_formated;

    public hour;

    public filesToUpload;
    public imageSelect: Boolean;
    public urlImage : String;

    public status_general : String;

    public eventId;

    @ViewChild('dayPicker') datePicker: DatePickerComponent;  

    open() { this.datePicker.api.open(); }  
    close() { this.datePicker.api.close(); }

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService : UserService,
        private _eventService : EventService,
        private _uploadService: UploadService,
        private titlecasePipe:TitleCasePipe
    ){
        this.title = 'Editar Evento...';
        this.mostrar_form = true;
        this.url = GLOBAL.url;
        this.event = new Event('','','',[],'','',new Date().toDateString(),'','',0,'',new Date(),false,'');
        this.artists = [];
        this.name_new_artist = '';
        this.selectedDate = moment().format("DD-MM-YYYY"); 
        this.selectedDate_formated = moment(this.selectedDate,['DD-MM-YYYY']).locale('es').format('LL');
        this.hour = '12:00';
        this.event.assistances = 0;
        this._clasificationSelected = 'Danza';
        
    }

    ngOnInit(): void {
        console.log('EventAddComponent loaded...');
        //document.getElementById("openModalButton").click();
        this.getEvent();
    }

    getEvent(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._eventService.getEvent(id).subscribe(
                response => {
                    if(!response.event){
                        this._router.navigate(['/admin-panel']);
                    }else{
                        this.event = response.event[0];
                        this.artists = this.event.artists;
                        console.log(this.event);
                        this.urlImage = this.url+'image-event/'+this.event.image;
                        this.selectedDate = moment(this.event.date.toString());
                        this._clasificationSelected = this.event.clasification;
                    }
                },
                error => {
                    this._router.navigate(['/admin-panel']);
                    console.log(<any>error);
                }
            );
        });
    }

    ngDoCheck(){
        this.event.title = this.titlecasePipe.transform(this.event.title.toString());
        this.event.type = this.titlecasePipe.transform(this.event.type.toString()); 
        this.event.city = this.titlecasePipe.transform(this.event.city.toString());
        this.event.place = this.titlecasePipe.transform(this.event.place.toString());
        this.name_new_artist = this.titlecasePipe.transform(this.name_new_artist.toString());
        this.selectedDate_formated = moment(this.selectedDate,['DD-MM-YYYY']).locale('es').format('LL');
        
        if(this.event.title != '' && this.event.artists.length == 0){
            this.status_saveArtist = 'empty';
        }
        //console.log(this.status_saveArtist);

        // change path on input file of selected image
        $('#file').on('change',function(){
            var fileName = $(this).val();
            var fileNameShort= fileName.match(/[-_\w]+[.][\w]+$/i)[0];
            $(this).next('.custom-file-label').html(fileNameShort);
        });
    }

    clasificationSelected(event){
        this._clasificationSelected = event.value;
        //console.log(this._clasificationSelected);
    }

    saveNewArtist(validForm){
        if(validForm){
            if(this.name_new_artist !== " " && this.name_new_artist !== "" && this.name_new_artist.length !== 0){
                if(!this.artists.includes(this.name_new_artist)){
                    this.artists.push(this.name_new_artist.trim());
                    console.log(this.artists);
                    this.status_saveArtist = 'success';
                    
                }else{
                    this.status_saveArtist = 'repeated';
                }
            }else{
                this.status_saveArtist = 'invalid_name';
            }
                
            this.name_new_artist = '';
        }else{
            this.status_saveArtist = 'invalid_name';
        }
    }

    deleteArtistMessage(artistName){
        this.name_new_artist = artistName;
        document.getElementById("confirm_delete").click();
        console.log('Eliminar a: ' + artistName);
    }

    deleteArtistConfirm(){
        console.log('Eliminar a: ' + this.name_new_artist);
        let position = this.artists.indexOf(this.name_new_artist);
        console.log(position);
        this.artists.splice(position, 1);
        console.log(this.artists);
        this.status_saveArtist = 'deleted';
        console.log('Eliminado: ' + this.name_new_artist);
        this.name_new_artist = '';
    }

    editArtist(artistName){
        this.name_old_artist = artistName;
        this.name_new_artist = artistName;
        console.log('Editar a: ' + artistName);
        document.getElementById("editar_artista").click();
    }

    artistEdited(){
        let position = this.artists.indexOf(this.name_old_artist);
        this.artists.splice(position, 1, this.name_new_artist);
        this.name_new_artist = '';
        this.status_saveArtist = 'edited';
    }

    updateEvent(){
        if(this.status_saveArtist !== 'empty'){ 
            this.event.artists = this.artists;
            this.event.clasification = this._clasificationSelected;
            this.event.date = moment(this.selectedDate,['DD-MM-YYYY']).format('YYYY-MM-DD') + " " + this.event.hour+':00.000Z';
            console.log(this.event);

            let token = this._userService.getToken();
            console.log(token);

            this._eventService.updateEvent(this.event, token).subscribe(
                response => {
                    if(!response.event){
                        console.log('error');
                    }else{
                        var eventCreated: Event;
                        eventCreated = response.event;
                        console.log('evento creado: ' + eventCreated);
                        
                        this.eventId = response.event._id;
                        console.log(response.event._id);
                        console.log(response.event.clasification);
                        console.log('evento registrado');
                        
                        /* user image upload */            
                        if(this.filesToUpload != null && this.eventId != null){                                
                            this._uploadService.makeFileRequest(this.url+'image-event/'+this.eventId, [],
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
                    console.log(error);
                }
            );  
        }else{
            this.status_saveArtist = 'addSomeArtist';
        }    
    }   

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
        this.imageSelect = true;
    }
}