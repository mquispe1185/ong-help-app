import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { AngularTokenModule } from 'angular-token';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularTokenModule.forRoot({
      apiBase:                     environment.API_URL,
         apiPath:                   undefined,

         signInPath:                 'auth/sign_in',
         signInRedirect:             'inicio',
         signInStoredUrlStorageKey:  'inicio',

         signOutPath:                'auth/sign_out',
         validateTokenPath:          'auth/validate_token',
         signOutFailedValidate:      false,

         registerAccountPath:        'auth',
         deleteAccountPath:          'auth',
         registerAccountCallback:    window.location.href,

         updatePasswordPath:         'auth',
         resetPasswordPath:          'auth/password',
         resetPasswordCallback:      window.location.href,

         oAuthBase:                  environment.API_URL,
         oAuthPaths: {
             github:                 'auth/github',
             google:                'auth/google_oauth2',
         },
         oAuthCallbackPath:          'inicio',
         oAuthWindowType:            'sameWindow',
         oAuthWindowOptions:         undefined,

         userTypes:                 undefined,
         loginField:                'email',

  }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
