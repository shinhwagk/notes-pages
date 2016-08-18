/**
 * Created by zhangxu on 2016/8/17.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from "@angular/http";

import {AppComponent}  from './app.component';

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
}