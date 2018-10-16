import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*** Components ***/

import { CurrentEventsComponent } from './components/currentEvents/currentEvents.component';
import { EventsByCategoryComponent } from './components/eventsByCategory/eventsByCategory.component';
import { EventViewComponent } from './components/viewEvent/viewEvent.component'; 
/* Main */
import { MainExploreComponent } from './components/mainExplore/mainExplore.component';

/*** Routing settings ***/
const exploreRoutes: Routes = [
    {
        path: 'explorar',
        component: MainExploreComponent,
        //canActivate: [AdminGuard],
        children: [
            { path: '', redirectTo: 'proximos', pathMatch: 'full' },  //Cuando este vacía la ruta hija
            { path: 'proximos', component: CurrentEventsComponent },
            { path: 'categoria/:category', component: EventsByCategoryComponent },
            { path: 'detalle-evento/:id', component: EventViewComponent },
            { path: '**', component: CurrentEventsComponent } 
        ]
    },
    //no dentro de las rutas hijas
    //{ path: 'listado-del-panel', component: ListComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(exploreRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ExploreRoutingModule {}