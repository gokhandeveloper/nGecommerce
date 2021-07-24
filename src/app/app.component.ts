import {Component} from '@angular/core';
import {LoginService} from "./services/login/LoginService";
import {AppUser} from "../models/app-user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChocolateBox';
  appUser: AppUser | undefined ;
  constructor(private loginService: LoginService) {
  }
  checkLogin() {
   return this.loginService.checkLogin();

  }
  getUser() {
    return this.loginService.getUser();
  }
}
