import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryServiceService {

  constructor(private db:AngularFireDatabase) { }

  getCategories() {


    return this.db.list('/product-categories').valueChanges();
  }
}
