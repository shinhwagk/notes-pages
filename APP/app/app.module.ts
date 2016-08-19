/**
 * Created by zhangxu on 2016/8/17.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, JsonpModule} from "@angular/http";

import {AppComponent}  from './app.component';

@NgModule({
  imports: [BrowserModule, HttpModule, JsonpModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {
}