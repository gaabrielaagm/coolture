import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TitleCasePipe } from '@angular/common';

import { RankingRoutingModule } from './ranking-routing.module';

/*** Components ***/

import { RankingComponent } from './components/ranking/ranking.component';
import { EventViewComponent } from './components/viewEvent/viewEvent.component'; 
/* Main */
import { MainRankingComponent } from './components/mainRanking/mainRanking.component';
import { DpDatePickerModule } from 'ng2-date-picker'; 

/*** Pipe ***/
/*
import { SearchArtistPipe } from '../pipes/searchArtist.pipe';
import { SearchEventPipe } from '../pipes/searchEvent.pipe';
*/

@NgModule({
    declarations: [
        MainRankingComponent,
        RankingComponent,
        EventViewComponent
        /*
        SearchArtistPipe,
        SearchEventPipe
        */
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        DpDatePickerModule,
        RankingRoutingModule
    ],
    exports: [
        MainRankingComponent,
        RankingComponent,
        EventViewComponent
    ],
    providers: [ 
        TitleCasePipe
        /*
        UserService,
        AdminGuard 
        */
    ]
})
export class RankingModule { }