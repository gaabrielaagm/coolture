//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AdminRoutingModule } from './admin-routing.module';

/*** Components ***/

/* Artist */
import { ArtistAddComponent } from './components/artist/add/add.component';
import { ArtistEditComponent } from './components/artist/edit/edit.component';
import { ArtistListComponent } from './components/artist/list/list.component';
import { ArtistDeleteComponent } from './components/artist/delete/delete.component';

/* Event */
import { EventAddComponent } from './components/event/add/add.component';
import { EventEditComponent } from './components/event/edit/edit.component';
import { EventListComponent } from './components/event/list/list.component';
import { EventDeleteComponent } from './components/event/delete/delete.component';

/* Main */
import { MainComponent } from './components/main/main.component';

/*** Services ***/
//import { UserService } from '../services/user.service';
    /* Guards (it's a service) */
//import { AdminGuard } from '../services/admin.guard';

/*** Pipe ***/
//import { SearchPipe } from './pipes/search.pipe';

@NgModule({
    declarations: [
        MainComponent,
        EventListComponent,
        EventAddComponent,
        EventEditComponent,
        EventDeleteComponent,
        ArtistListComponent,
        ArtistAddComponent,
        ArtistEditComponent,
        ArtistDeleteComponent
        //SearchPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        AdminRoutingModule
    ],
    exports: [
        //En caso de que se quiera usar los componentes fuera del modulo (pero si no, no es necesario)
        MainComponent,
        EventListComponent,
        EventAddComponent,
        EventEditComponent,
        ArtistListComponent,
        ArtistAddComponent,
        ArtistEditComponent
    ],
    providers: [ 
        /*
        UserService,
        AdminGuard 
        */
    ]
})
export class AdminModule { }