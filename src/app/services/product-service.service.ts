import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {async} from "rxjs";
import {Product} from "../../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    this.db.list('/products').push(product);
  }
  update(productId:string, product:any) {
    return this.db.object('/products/'+ productId).update(product);
  }

  getProduct(productId:string) {
    return this.db.object('/products/'+productId).snapshotChanges()
      .pipe(map(a=> {
        var product:Product= {whenShipping:"",productSummary:"",productName:"",key:"", price:0,category:"",imageUrl:""};

        product.productName = a.payload.child('productName').val()
        product.imageUrl = a.payload.child('imageUrl').val()
        product.price = a.payload.child('price').val()
        product.productSummary= a.payload.child('productSummary').val()
        product.key = a.key;
        product.whenShipping="";
        return product;

      }))

  }
  getAll() {
   // var test;
   // test=this.db.list('products').snapshotChanges();
   // return test;

    return this.db.list('products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        var product:Product= {whenShipping:"", productSummary:"",productName:"",key:"", price:0,category:"",imageUrl:""};

        product.productName = a.payload.child('productName').val()
        product.imageUrl = a.payload.child('imageUrl').val()
        product.price = a.payload.child('price').val()
        product.productSummary = a.payload.child('productSummary').val()
        product.key = a.key;
        product.whenShipping="";
        return product;

      }))
    );

  }

  delete(id: any) {
    return this.db.object('/products/'+id).remove();
  }
}
