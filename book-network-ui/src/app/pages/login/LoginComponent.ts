import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from "../../services/models/authentication-request";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/services/authentication.service";
import { TokenService } from "../../token/token.service";
import { KeycloakService } from '../../services/keycloak/keycloak.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  async ngOnInit(): Promise<void> {
      await this.keycloakService.init();
      await this.keycloakService.login();
  }
  //authRequest: AuthenticationRequest = { email: "", password: "" };
 // errorMsg: Array<String> = [];

  constructor(
    private keycloakService: KeycloakService
  
  ) {
  }
/*
  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['books']);
      },
      error: (err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.error);
        }
      }
    });
  }
  register() {
    this.router.navigate(["register"]);
  }*/
}
