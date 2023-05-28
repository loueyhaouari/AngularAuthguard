import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
@Injectable({
  providedIn:"root",
})
export class authenticationGuard implements CanActivate {
 constructor(private authService:AuthenticationService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  let authenticated=this.authService.isAuthenticated();
   if(authenticated==false){
    this.router.navigateByUrl("/login");
     return false;
   } else {
     return true;
   }

  }

}
