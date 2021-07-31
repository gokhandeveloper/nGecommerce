import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {ShoppingCartService} from "../shopping-cart.service";
import {query} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase,
              private shoppingCartService: ShoppingCartService) { }


  async placeOrder(order: any){
    let result =  await this.db.list('/orders').push(order);
    this.shoppingCartService.cleartCart();
    return result;

  }

//   query: {
//     orderByChild: 'userId',
//     equalTo: userId
//   }
// });

  getOrdersByUser(userId: string) {
    return this.db.list('/orders',
        ref =>
          ref.orderByChild('userId')
            .equalTo(userId)).snapshotChanges();
  }


  getOrders() {
    return this.db.list('/orders').valueChanges();
  }

}
