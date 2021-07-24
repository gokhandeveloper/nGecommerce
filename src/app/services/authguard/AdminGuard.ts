import {CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";
import {LoginService} from "../login/LoginService";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
@Injectable()
export class AdminGuard implements CanActivate{
constructor(private  loginService: LoginService) {
}


canActivate() : Observable<boolean> {


  // return this.loginService.user$
  //   .pipe(switchMap(user =>
  //     // @ts-ignore
  //     this.userService.get(user.uid).valueChanges()))
  //   // @ts-ignore
  //   .pipe(map(appUser => appUser.isAdmin));

  return this.loginService.appUser$.pipe(
    map(appUser => appUser.isAdmin)
  )

}

}

