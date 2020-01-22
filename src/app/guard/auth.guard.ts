import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(public authService: AuthService, public router: Router, private userservice: UserServiceService) {
  }

  canActivate(next: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authState$.pipe(map(state => {
        if (state !== null) {
          if (next.pathFromRoot.toString().includes('edit')) {
            if (this.userservice.isAdmin) { return true; } else {
              this.router.navigate(['/login']);
              alert('Strona zarezerwowana dla administratora!');
              return false;
            }
          }
          return true;
      }
        alert('Aby przejsc do tej strony, musisz być zalogowany!');
        this.router.navigate(['/login']);
        return false;
    }
      ));
  }



}
