import { AuthGuard } from './gaurds/auth.guard';
import { AuthService } from './services/auth.service';
import { IndexModule } from './index/index.module';
import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { NoPageComponent } from './no-page/no-page.component';
import {routes} from './app.router';
import { TokenInterceptor } from './services/token-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HomeComponent,
    NoPageComponent
   
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    IndexModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes,{useHash: true}),
    ChartsModule,
    BrowserAnimationsModule,
  ],
  //providers: [AuthService,AuthGuard],
  providers: [AuthService, AuthGuard,{ useClass: TokenInterceptor,provide:HTTP_INTERCEPTORS,multi: true}],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
