import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {KeycloakService} from './services/keycloak/keycloak.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_INITIALIZER } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './pages/login/login.component';
import {FormsModule} from "@angular/forms";
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import {CodeInputModule} from "angular-code-input";
import {HttpTokenInterceptor} from "./services/interceptor/http-token.interceptor";
import { BorrowedBookListComponent } from './pages/borrowed-book-list/borrowed-book-list.component';
import {BookModule} from "./modules/book/book.module";
import { ReturnBookComponent } from './pages/return-book/return-book.component';
export function kcFactory(kcService: KeycloakService){
  return () => kcService.init();
  }
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    BorrowedBookListComponent,
    ReturnBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CodeInputModule,
    BookModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
  {
    provide: APP_INITIALIZER,
    deps: [KeycloakService],
    useFactory: kcFactory,
    multi: true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
