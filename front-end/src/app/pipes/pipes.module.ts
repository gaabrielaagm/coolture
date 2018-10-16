import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SearchArtistPipe } from './pipes/searchArtist.pipe';
import { SearchEventPipe } from './pipes/searchEvent.pipe';
import { SearchAssistancePipe } from './pipes/searchAssistance.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    SearchEventPipe,
    SearchArtistPipe,
    SearchAssistancePipe
  ],
  exports: [
    SearchEventPipe,
    SearchArtistPipe,
    SearchAssistancePipe
  ]
})
export class PipesModule {}