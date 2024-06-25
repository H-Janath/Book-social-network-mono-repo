import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from "../../token/token.service";
import {inject} from "@angular/core";
import { KeycloakService } from '../keycloak/keycloak.service';

export const authGuard: CanActivateFn = () => {
  const keycloakService: KeycloakService = inject(KeycloakService);
  const router: Router = inject(Router);
  if(keycloakService.keycloak.isTokenExpired()){
    router.navigate(['login']);
    return false;
  }
  return true;
};
