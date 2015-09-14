// Angular 2
import {Directive, ElementRef} from 'angular2/angular2';

// Simple example directive that should be in `/directives` folder
// Todo: refactor
@Directive({
  selector: '[x-large]' // using [ ] means selecting attributes
})
export class XLarge {
  constructor(public el: ElementRef) {
    // simple dom manipulation to set font size to x-large
    this.el.nativeElement.style.fontSize = 'x-large';
  }
}
