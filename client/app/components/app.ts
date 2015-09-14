// Angular 2
import {Component, View} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink} from 'angular2/router';

// We use a folder if we want separate files
import {Home} from './home/home';
import {Dashboard} from './dashboard/dashboard';
import {Todo} from './todo/todo';

// App: Top Level Component
@Component({
  selector: 'app' // without [ ] means we are selecting the tag directly,
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [RouterOutlet, RouterLink],
  template: `
  <section class="main-content">
    <h1 class="title">{{ title }}</h1>
    <nav class="main-nav">
      <a [router-link]="['/home']">Home</a>
      <a [router-link]="['/dashboard']">Dashboard</a>
      <a [router-link]="['/todo']">Todo</a>
    </nav>
    <router-outlet></router-outlet>
  </section>
  `
})
@RouteConfig([
  { path: '/', as: 'home', component: Home },
  { path: '/dashboard', as: 'dashboard', component: Dashboard },
  { path: '/todo', as: 'todo', component: Todo }
])
export class App {
  title: string;
  constructor() {
    this.title = 'Stor';
  }
}
