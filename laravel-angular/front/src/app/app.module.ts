//MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AplicationErrorHandler } from './app.error-handler';

// COMPONENTS , INTERFACES, ETC..

import { SearchSystemComponent } from './search-system/search-system.component';
import { LoginComponent } from './login/login.component';
import { CreateSystemComponent } from './create-system/create-system.component';
import { UpdateSystemComponent } from './update-system/update-system.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { RefreshTokenInterceptor } from './services/interceptors/refresh-token.interceptor';
import { CreateUserComponent } from './create-user/create-user.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchSystemComponent,
    LoginComponent,
    CreateSystemComponent,
    UpdateSystemComponent,
    NavbarComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff'
  })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi : true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi : true
    },
    {provide: ErrorHandler, useClass: AplicationErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
