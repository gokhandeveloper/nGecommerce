import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {map} from "rxjs/operators";
import {Product} from "../../models/product";
import {ProductCategory} from "../../models/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryServiceService {

  constructor(private db:AngularFireDatabase) { }

  getAll() {
  return this.db.list('product_categories/')
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        var category: ProductCategory= {key:"", url:""};
        // console.log(a.payload.child);
        // console.log(a);

        category.key = a.payload.key;
        category.url = a.payload.child('category_name').val()
        // product.imageUrl = a.payload.child('imageUrl').val()
        // product.price = a.payload.child('price').val()
        // product.productSummary = a.payload.child('productSummary').val()
        // product.key = a.key;
        // product.whenShipping="";
        return category;

      })));
  }



}
