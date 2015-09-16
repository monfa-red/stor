// Angular 2
import { Component, View, NgFor } from 'angular2/angular2';
import { ProductService } from '../../services/ProductService';

// Simple component
@Component({
  bindings: [ProductService],
  selector: 'product-list'
})
@View({
  templateUrl: '/app/components/product-list/product-list.html',
  directives: [NgFor]
})
export class ProductList {

  products: Array<any>;

  constructor(public productsService: ProductService) {

    productsService.getList(list => this.products = list)


  }

}
