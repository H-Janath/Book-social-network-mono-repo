import { Component } from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";
import {register} from "../../services/fn/authentication/register";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
      registerRequest: RegistrationRequest = {email: "", firstname:"",lastname:"",password:""};
      errorMsg: Array<String> = [];

      constructor(
        private router: Router,
        private authService: AuthenticationService,
      ) {
      }
       register(){
            this.errorMsg=[];
            this.authService.register({
              body: this.registerRequest
            }).subscribe({
              next: ()=> {
                this.router.navigate(['acitvate-account']);
              },
              error: (err) => {

                if(err.error.validationErrors) {
                  this.errorMsg = err.error.validationErrors;
                }else{
                  this.errorMsg.push(err.error);
                }
              }
            })
       }

      login() {
          this.router.navigate(['login'])
      }
}
