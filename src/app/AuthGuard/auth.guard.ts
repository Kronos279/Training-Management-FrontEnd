import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const expectedRoles = route.data['expectedRoles'] as Array<string>;
  const authService = inject(AuthServiceService)
  const router = inject(Router);
  let role:string;
  if(authService.isAuthenticated()){
    role = authService.getRole();
    if(expectedRoles.includes(role)){
    return true;
    }else{
      router.navigate(["/unAuthorised"]);
      return false;
    }
  }
  else{
    router.navigate(['/login']);
    return false;
  }



};
