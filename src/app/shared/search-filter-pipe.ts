import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../../models/product";

@Pipe({
  name: 'searchFilter'
})

export class SearchFilterPipe implements PipeTransform {

  transform(value: Product[], filterText?: string): Product[]{
    if(!value) return value;
    if(!filterText) return value;
    var lowered = filterText.toLowerCase();
    console.log(filterText);
    var filter= lowered ? value.filter((x: Product) =>
      x.productName.toLowerCase().includes(filterText.toLowerCase()) ||
      x.category.toLowerCase().includes(filterText.toLowerCase())

    ) : value;
    console.log(filter);
    return filter;
  }

}
