// Angular 2
import {Component, View} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink} from 'angular2/router';

// We use a folder if we want separate files
import {Home} from '../home/home';
import {ProductDetail} from '../product-detail/product-detail';
import {ProductList} from '../product-list/product-list';
import {Todo} from '../todo/todo';

// App: Top Level Component
@Component({
  selector: 'app' // without [ ] means we are selecting the tag directly,
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [RouterOutlet, RouterLink],
  templateUrl: '/app/components/app/app.html'
})
@RouteConfig([
  { path: '/', as: 'home', component: Home },
  { path: '/products', as: 'product-list', component: ProductList },
  { path: '/products/:id', as: 'product-detail', component: ProductDetail },
  { path: '/todo', as: 'todo', component: Todo }
])
export class App {
  title: string;
  constructor() {
    this.title = 'Stor';
  }
}
