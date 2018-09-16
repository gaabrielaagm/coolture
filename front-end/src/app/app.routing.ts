import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */

import { ArtistsComponent } from './components/artists/artists.components';
import { ContactComponent } from './components/contact/contact.component';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangePwComponent } from './components/user-profile/change-pw/change-pw.component';
import { EditProfileComponent } from './components/user-profile/edit/edit-profile.component';
import { ViewProfileComponent } from './components/user-profile/view/view-profile.component';

const appRoutes: Routes = [
    
    {path: '', component: HomeComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'artistas', component: ArtistsComponent},
    {path: 'eventos', component: EventsComponent},
    {path: 'rankings', component: RankingComponent},
    {path: 'contacto', component: ContactComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'perfil', component: ViewProfileComponent},
    {path: 'editar-perfil', component: EditProfileComponent},
    {path: 'cambiar-pw', component: ChangePwComponent},
    //{path: 'animal/:id', component: AnimalDetailComponent},
    {path: '**', component: HomeComponent}
    
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);