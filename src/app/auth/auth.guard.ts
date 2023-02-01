import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";

import {Observable} from "rxjs";
import {UserService} from "../share/service/UserService";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const jwtDecode = this.accountService.getDecodedAccessToken();

    let role = jwtDecode.auth.split(',');
    if (
      (localStorage.getItem('auth-token') && role.includes('ROLE_ADMIN')) ||
      role.includes('ROLE_JE')
    ) {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
