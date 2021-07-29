import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {Subscription} from "rxjs";
import {ShoppingCart} from "../../models/ShoppingCart";
import {ShoppingCartItem} from "../../models/shopping-cart-item";

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit, OnDestroy{
  @Input('product') item: ShoppingCartItem | any  ;
  subscription$: Subscription = new Subscription;
  private shoppingCart$: any;
  shoppingCart!: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {

  }

  async ngOnInit() {
   this.subscription$ = (await this.cartService.getCart())
     .subscribe(cart => this.shoppingCart = cart);
}

  ngOnDestroy() {
     this.subscription$.unsubscribe();
  }

  addToCart() {
    this.cartService.addProductToCart(this.item);

  }

  getCartQuantity() {
    if(this.shoppingCart && this.item.productId)  {
      let productKey = this.item.productId;
      //return product;
      console.log(this.shoppingCart.itemsMap)
      console.log(productKey)
      let item= this.shoppingCart.itemsMap[productKey];
      console.log(item);
      return item ?item.quantity : 0;
    }
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.item);
  }
}
