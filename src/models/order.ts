import {ShoppingCart} from "./ShoppingCart";

export class Order {
  dateOrderPlaced:number;
  private items: any;

  constructor(public userId: string | undefined, public shipping: any,
              public cart: ShoppingCart | undefined) {
    this.dateOrderPlaced = new Date().getTime();
    if(this.cart!==undefined) {
      this.items=this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl :i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    }

    }

}
