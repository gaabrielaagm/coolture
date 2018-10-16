import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*** Components ***/

import { CurrentEventsComponent } from './components/currentEvents/currentEvents.component';
import { EventsAssistanciesComponent } from './components/eventsAssistancies/eventsAssistancies.component';
import { EventsByCategoryComponent } from './components/eventsByCategory/eventsByCategory.component';
import { FavoriteEventsComponent } from './components/favoriteEvents/favoriteEvents.component';
import { EventViewComponent } from './components/viewEvent/viewEvent.component'; 

/* Main */
import { MainEventsComponent } from './components/mainEvents/mainEvents.component';

/*** Routing settings ***/
const eventRoutes: Routes = [
    {
        path: 'eventos',
        component: MainEventsComponent,
        //canActivate: [AdminGuard],
        children: [
            { path: '', redirectTo: 'recientes', pathMatch: 'full' },  //Cuando este vacía la ruta hija
            { path: 'recientes', component: CurrentEventsComponent },
            { path: 'asistencias/:tiempo', component: EventsAssistanciesComponent },
            { path: 'favoritos/:tiempo', component: FavoriteEventsComponent },
            { path: 'categoria/:category', component: EventsByCategoryComponent },
            { path: 'detalle-evento/:id', component: EventViewComponent },
            { path: '**', redirectTo: 'recientes', pathMatch: 'full' } 
        ]
    },
    //no dentro de las rutas hijas
    //{ path: 'listado-del-panel', component: ListComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(eventRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class EventRoutingModule {}

