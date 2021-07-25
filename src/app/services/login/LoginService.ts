import {Injectable} from "@angular/core";
import {AngularFireAuth} from '@angular/fire/auth';
import  firebase from "firebase";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {AppUser} from "../../../models/app-user";
import {switchMap} from "rxjs/operators";
import { of as observableOf} from 'rxjs';
@Injectable()
export class LoginService {

  user$: Observable<firebase.User | null>;
  userLoggedin: boolean = false;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private route: ActivatedRoute,
    router: Router,
    private userService: UserService) {
    this.user$ = firebaseAuth.authState;

   this.user$.subscribe(user=> {
     if(user ) {
       userService.save(user);
       const returnUrl = localStorage.getItem('returnUrl');
       if(returnUrl) {
         localStorage.removeItem(returnUrl);
       }
       router.navigateByUrl(returnUrl!);
       this.userLoggedin=true;
     }
   });

  }

  get appUser$() : Observable<AppUser> {

     return this.user$.pipe(switchMap( user=> {
       if(user) {
         return this.userService.get(user.uid);
       }
       // if(user) {
       //   return  this.userService.get(user!.uid).valueChanges;
       // }
        return observableOf(null);
    }))



  }

  checkLogin() {
    console.log(this.user$);
    console.log(this.userLoggedin);
    return this.userLoggedin;

  }
  getUser() {
     console.log(this.appUser$);
     return this.appUser$;
  }
  private login(){
    this.userLoggedin = this.user$ !== undefined;

  }
  logout() {

    this.firebaseAuth.signOut().then(r =>{
      console.log("logged out"+ r);
      this.userLoggedin=false;
    } );

  }

  loginWithGoogle() {

    this.firebaseAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
     let returnUrl = this.route.
      snapshot.queryParamMap.get('returnUrl') || '/';
     localStorage.setItem('returnUrl',returnUrl);
      this.login();
      console.log(result);


      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode+" "+
        errorMessage+" "+
        email+" "+
        credential)
    });

  }
}
