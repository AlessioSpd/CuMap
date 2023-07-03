import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapCommonComponent } from './components/map-common/map-common.component';
import { HomePageComponent } from './components/home-page/home-page.component'

@NgModule({
  declarations: [
    AppComponent,
    MapCommonComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
