import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */

import { ArtistsComponent } from './components/artists/artists.components';
import { ContactComponent } from './components/contact/contact.component';
//import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { RegisterComponent } from './components/register/register.component';
import { PwUpdateComponent } from './components/user-profile/pw-update/pw-update.component';
import { EditProfileComponent } from './components/user-profile/edit/edit-profile.component';
import { ViewProfileComponent } from './components/user-profile/view/view-profile.component';

const appRoutes: Routes = [
    
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'artistas', component: ArtistsComponent},
    //{path: 'eventos', component: EventsComponent},
    //{path: 'rankings/:tipo', component: RankingComponent},
    {path: 'contacto', component: ContactComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'perfil', component: ViewProfileComponent},
    {path: 'editar-perfil', component: EditProfileComponent},
    {path: 'actualizar-pw', component: PwUpdateComponent},
    {path: '**', component: HomeComponent}
    
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);