import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {async} from "rxjs";

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
    return this.db.object('/products/'+productId).valueChanges();
  }
  getAllProducts() {
   // var test;
   // test=this.db.list('products').snapshotChanges();
   // return test;

    return this.db.list('products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const productName = a.payload.child('productName').val()
        const imageUrl = a.payload.child('imageUrl').val()
        const price = a.payload.child('price').val()
        const key = a.key;
        console.log(productName);
        return { imageUrl,productName, price,key};

      }))
    );

  }

  delete(id: any) {
    return this.db.object('/products/'+id).remove();
  }
}
