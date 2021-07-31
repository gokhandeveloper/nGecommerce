import { Component } from '@angular/core';
import {OrderService} from "../services/order/order.service";
import {LoginService} from "../services/login/LoginService";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$:any;

  constructor(
    private loginService: LoginService,
    private orderService: OrderService) {

    this.orders$ = loginService.user$
      .pipe(switchMap((u:any) =>
        orderService.getOrdersByUser(u.uid)));
  }
}
