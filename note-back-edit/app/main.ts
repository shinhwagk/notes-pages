import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app.module";
import "./rxjs-operators";

platformBrowserDynamic().bootstrapModule(AppModule);