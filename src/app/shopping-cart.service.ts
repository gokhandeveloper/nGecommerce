import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Product} from "../models/product";
import {map, take} from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('shopping-carts' + cartId);

  }
  createCart() {
    return this.db.list('shopping-carts').push({
      dateCartCreated: new Date().getTime()
    });
  }

  async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    console.log(cartId);

    if ((typeof cartId=='undefined'
      || !cartId || cartId==='' || cartId===null)) {
      let key= this.createCart().key;
      if(key) {
        console.debug("could not find cart id in local storage");
        localStorage.setItem('cartId', key);
        return key;
      }
      return "";
    } else {
      console.debug("cart id  found " + cartId)
      return cartId;
    }
  }

  async addProductToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$:Observable<any> = this.db.object('shopping-carts/'+ cartId + /items/ + product.key)
      .valueChanges();

    let item$$= this.db.object('shopping-carts/'+ cartId + /items/ + product.key);

    item$.pipe(take(1)).subscribe(item =>{
      if(item === null) item$$.set({product:product, quantity:1});
      else item$$.update({quantity: item.quantity+ 1});

    })
  }

}
