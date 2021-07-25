import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {Product} from "../../models/product";
import {ProductCategory} from "../navigation/product-category/product-category.component";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryServiceService {

  constructor(private db:AngularFireDatabase) { }

  getAll() {
  return this.db.list('/product-categories')
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {

        var category: ProductCategory= {key:"", url:""};
        category.key = a.key;
        category.url = a.payload.child('url').val()
        // product.imageUrl = a.payload.child('imageUrl').val()
        // product.price = a.payload.child('price').val()
        // product.productSummary = a.payload.child('productSummary').val()
        // product.key = a.key;
        // product.whenShipping="";
        return category;

      })));
  }



}
