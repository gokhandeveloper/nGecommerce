export class ShoppingCartItem {
  title: string="";
  imageUrl : string="";
  price: any
  productId: any;
  quantity: any;
  totalPrice: number=0;

  constructor(init? : Partial<ShoppingCartItem>) {
    Object.assign(this, init)
  }



  get totalProductPrice() {
    return this.price * this.quantity;

  }

}
