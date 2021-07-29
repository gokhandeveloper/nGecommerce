import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Product} from "../../models/product";
import {map, take} from 'rxjs/operators';
import {Observable} from "rxjs";
import {ShoppingCart} from "../../models/ShoppingCart";
import {ShoppingCartItem} from "../../models/shopping-cart-item";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
   // console.log(cartId);
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
      .pipe(map(s =>
          new ShoppingCart(s.payload.child("items").val())


    ));

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
    this.updateProduct(product, +1)

  }

  async removeFromCart(product: Product) {
  this.updateProduct(product, -1)
  }

    private async updateProduct(product: Product, change: number) {
      let cartId = await this.getOrCreateCartId();
      let item$:Observable<any> = this.db.object('shopping-carts/'+ cartId + /items/ + product.key)
        .valueChanges();

      let item$$= this.db.object('shopping-carts/'+ cartId + /items/ + product.key);

      item$.pipe(take(1)).subscribe(item =>{
        if(item === null) item$$.set(
          {title: product.productName,
          imageUrl: product.imageUrl,
          price: product.price});
        else item$$.update(
          {quantity: (item.quantity || 0)+ change});

      })
    }
}
