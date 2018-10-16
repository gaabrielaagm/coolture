import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*** Components ***/
import { RankingComponent } from './components/ranking/ranking.component';
import { EventViewComponent } from './components/viewEvent/viewEvent.component'; 
/* Main */
import { MainRankingComponent } from './components/mainRanking/mainRanking.component';

/*** Routing settings ***/
const exploreRoutes: Routes = [
    { 
        path: 'ranking',
        component: MainRankingComponent,
        //canActivate: [AdminGuard],
        children: [
            { path: '', redirectTo: 'lista/general', pathMatch: 'full' },  //Cuando este vacía la ruta hija
            { path: 'lista/:tipo', component: RankingComponent },
            { path: 'detalle-evento/:id', component: EventViewComponent },
            { path: '**', redirectTo: 'lista/general', pathMatch: 'full' } 
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
export class RankingRoutingModule {}