import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Product} from "../../models/product";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  productId: string | null='';
  product:Product= {whenShipping:"",productSummary:"",productName:"",productId:"", price:0,category:"",imageUrl:""};
  subscription!: Subscription;
  category: string | null = ""
  constructor(productService: ProductService,private router: Router,
              activatedRoute: ActivatedRoute, ) {

    activatedRoute.queryParamMap.subscribe(params=> {

      this.productId = params.get('product');
      this.category = params.get('category');

      if(this.productId) {
        this.subscription= productService.getProduct(this.productId).subscribe(p=>
          this.product = p);
      }
      this.router.navigate(["category"]);
    })



  }

}
