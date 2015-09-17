// Angular 2
import { Component, View, NgFor } from 'angular2/angular2';
import { RouterLink } from 'angular2/router';
import { ProductService } from '../../services/ProductService';

// Simple component
@Component({
  bindings: [ProductService],
  selector: 'product-list'
})
@View({
  templateUrl: '/app/components/product-list/product-list.html',
  directives: [NgFor, RouterLink]
})
export class ProductList {

  products: Array<any>;

  constructor(public productsService: ProductService) {

    productsService.getProducts(list => this.products = list)


  }

}
