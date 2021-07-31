import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order/order.service";

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  public orders$: any

  constructor(private orderService: OrderService) {
    this.orders$ = orderService.getOrders();
  }
}
