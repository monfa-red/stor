// Angular 2
import {Component, View} from 'angular2/angular2';
import {XLarge} from '../../directives/XLarge';

// Simple component
@Component({
  selector: 'dashboard'
})
@View({
  directives: [XLarge],
  styles: [
    `span[x-large] { color: blue; }`
  ],
  template: `
  <div>
    <h2>Dashboard</h2>
    <span x-large>Extra Large Font Directive</span>
  </div>
  `
})
export class Dashboard {
  constructor() {

  }
}
