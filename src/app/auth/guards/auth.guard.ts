import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor ( private authSerice: AuthService,
                private router: Router){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    // return true;

    return this.authSerice.verificarAuntenticacion()
            .pipe( 
              tap( estaAutenticado => {
                if( !estaAutenticado ){
                  this.router.navigate(['./auth/login']);
                }
              } )
            );


  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authSerice.verificarAuntenticacion()
      .pipe( 
        tap( estaAutenticado => {
          if( !estaAutenticado ){
            this.router.navigate(['./auth/login']);
          }
        } )
      );

      // if( this.authSerice.auth.id ){
        
      //   return true;

      // }

      // return false;
  }
}
