// Angular 2
import {Component, View, NgIf} from 'angular2/angular2';
import { RouteParams } from 'angular2/router';
import { ProductService } from '../../services/ProductService';


// Simple component
@Component({
  bindings: [ProductService],
  selector: 'product-detail'
})
@View({
  templateUrl: '/app/components/product-detail/product-detail.html',
  directives: [NgIf]
})
export class ProductDetail {

  product: Object;

  constructor(private productsService: ProductService, routeParam: RouteParams) {

    this.product = {price: '', details: ''};

    productsService.getProduct(routeParam.get('id'), res => this.product = res)

  }
}
