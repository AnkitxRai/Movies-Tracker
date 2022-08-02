import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Injectable({
  providedIn: 'root'
})


export class SignUpGuard implements CanActivate {


constructor(
  public auth: AuthService,
  public categoryService: CategoryService,
  public router: Router,
  public loader: NgxSpinnerService,
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.performRequiredSteps();
  }

  /**
   *
   * @returns boolean
   */
  public performRequiredSteps() {
    this.loader.show('main');
    if(!this.auth.isLoggedIn){
      return  this.categoryService.getCategories().pipe(map((categories: any) => {
        this.categoryService.init(categories);
        return true;
      }), catchError((error) => {
        console.log(error);
        return of(false);
      }));
    }
    return false;
  }

}
