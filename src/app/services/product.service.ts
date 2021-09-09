import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {async} from "rxjs";
import {Product} from "../../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
        var product:Product= {whenShipping:"",productSummary:"",productName:"",productId:"", price:0,category:"",imageUrl:""};
        product.productName = a.payload.child('productName').val()
        product.imageUrl = a.payload.child('imageUrl').val()
        product.price = a.payload.child('price').val()
        product.productSummary= a.payload.child('productSummary').val()
         if(a.key!==null) {
           product.productId = a.key
         }
        product.whenShipping="";
        product.category =a.payload.child('category').val();
      //  console.log(product.productId)
        return product;

      }))

  }
  getAll() {
    return this.db.list('products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        var product:Product= {whenShipping:"", productSummary:"",productName:"",productId:"", price:0,category:"",imageUrl:""};
        product.productName = a.payload.child('productName').val()
        product.imageUrl = a.payload.child('imageUrl').val()
        product.price = a.payload.child('price').val()
        product.productSummary = a.payload.child('productSummary').val()
        if(a.key!==null) {
          product.productId = a.key
        }
        product.whenShipping="";
        product.category = a.payload.child('category').val()
    //    console.log(product.productId)
        return product;
      }))
    );
  }

  delete(id: any) {
    return this.db.object('/products/'+id).remove();
  }
}
