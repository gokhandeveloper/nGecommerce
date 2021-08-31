import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {LoginService} from "../../services/login/LoginService";
import {AppUser} from "../../../models/app-user";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {MatIconModule} from '@angular/material/icon';
import {Observable} from "rxjs";
import {ShoppingCart} from "../../../models/ShoppingCart";

@Component({
  selector: 'loggedin-main-navigation',
  templateUrl: './logged-in-navigation.component.html',
  styleUrls: ['./logged-in-navigation.component.scss']
})
@Injectable()
export class LoggedInNavigationComponent implements OnInit{
  appUser: AppUser | undefined ;
  cart$: Observable<ShoppingCart> | undefined;
  @Output() searchPhrase= new EventEmitter<string>();

  constructor(private loginService: LoginService,
              private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.getUser().subscribe(appUser => {
      this.appUser = appUser
    });

    this.cart$ = await this.cartService.getCart();

  }

  signOut() {
    this.loginService.logout();
  }

  getUser() {
    return this.loginService.getUser();
  }
  setSearchPhraseEvent(search:string) {
    this.searchPhrase.emit(search);
  }
}
