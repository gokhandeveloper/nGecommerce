import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Product} from "../models/product";
import {map, take} from 'rxjs/operators';
import {Observable} from "rxjs";
import {ShoppingCart, ShoppingCartItem} from "../models/ShoppingCart";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
   // console.log(cartId);
    return this.db.object('shopping-carts/' + cartId).snapshotChanges()
      .pipe(map(s=> {
        let cartItems= s.payload.child("items").val();
          let cart: ShoppingCart=
            new ShoppingCart(cartItems);
          return cart;

      }));

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
    this.updateProductQuantity(product, +1)

  }

  async removeFromCart(product: Product) {
  this.updateProductQuantity(product, -1)
  }

    private async updateProductQuantity(product: Product, change: number) {
      let cartId = await this.getOrCreateCartId();
      let item$:Observable<any> = this.db.object('shopping-carts/'+ cartId + /items/ + product.key)
        .valueChanges();

      let item$$= this.db.object('shopping-carts/'+ cartId + /items/ + product.key);

      item$.pipe(take(1)).subscribe(item =>{
        if(item === null) item$$.set({product:product, quantity:change});
        else item$$.update({quantity: item.quantity+ change});

      })
    }
}
