import {Component} from '@angular/core';
import {LoginService} from "./services/login/LoginService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChocolateBox';
  searchPhrase:string="";
  constructor(private loginService: LoginService) {
  }

  checkLogin() {
   return this.loginService.checkLogin();

  }

  setSearch($event: string) {
    this.searchPhrase = $event.toString();
  }

  getSearchPhrase() {
    return this.searchPhrase;
  }
}
