import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent}  from './nav/nav.component';
import { MenuComponent } from './nav/menu/menu.component';


@NgModule({
	declarations: [
	   	AppComponent,
	   	NavComponent,
      MenuComponent
	],
  	imports: [
    	BrowserModule,
    	AppRoutingModule
  	], 
  	providers: [],
  	bootstrap: [AppComponent]
})
export class AppModule { }
