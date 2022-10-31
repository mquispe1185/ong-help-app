import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { Subject } from 'rxjs';
import { ROLES } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  enable = false;

  constructor(private router: Router,
    public tokenService: AngularTokenService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {

    let result: Subject<boolean> = new Subject<boolean>();
    this.tokenService.validateToken().subscribe(
      res => {
        this.enable = [ROLES.ONG_OWNER, ROLES.CAMPAIGN_OWNER, ROLES.MULTI_OWNER].includes(this.tokenService.currentUserData.role) ? true : false;
        result.next(this.enable);
      },
      error => {
        this.enable = false;
        result.next(this.enable);
        this.router.navigate(['']);
      }
    )
    return result.asObservable();
  }

}
