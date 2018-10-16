import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*** Components ***/

/* Artist */
import { ArtistAddComponent } from './components/artist/add/add.component';
import { ArtistEditComponent } from './components/artist/edit/edit.component';
import { ArtistListComponent } from './components/artist/list/list.component';
import { ArtistDeleteComponent } from './components/artist/delete/delete.component';
//import { ArtistViewComponent } from './components/artist/view/view.component';

/* Event */
import { EventAddComponent } from './components/event/add/add.component';
import { EventEditComponent } from './components/event/edit/edit.component';
import { EventListComponent } from './components/event/list/list.component';
import { EventDeleteComponent } from './components/event/delete/delete.component';
import { EventViewComponent } from './components/event/view/view.component';

/* Main */
import { MainComponent } from './components/main/main.component';

/*** Guard ***/
//import { AdminGuard } from '../services/admin.guard';

/*** Routing settings ***/
const adminRoutes: Routes = [
    {
        path: 'admin-panel',
        component: MainComponent,
        //canActivate: [AdminGuard],
        children: [
            { path: '', redirectTo: 'listado-eventos', pathMatch: 'full' },  //Cuando este vacía la ruta hija
            { path: 'listado-eventos', component: EventListComponent },
            { path: 'crear-evento', component: EventAddComponent },
            { path: 'editar-evento/:id', component: EventEditComponent },
            { path: 'ver-detalles-evento/:id', component: EventViewComponent },
            { path: 'eliminar-evento/:id', component: EventDeleteComponent },
            { path: 'listado-artistas', component: ArtistListComponent },
            { path: 'crear-artista', component: ArtistAddComponent },
            { path: 'editar-artista/:id', component: ArtistEditComponent },
            { path: 'eliminar-artista/:id', component: ArtistDeleteComponent }
        ]
    },
    //no dentro de las rutas hijas
    //{ path: 'listado-del-panel', component: ListComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}