// Angular 2
import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import {FORM_DIRECTIVES, ControlGroup, FormBuilder} from 'angular2/angular2';
import {Validators} from 'angular2/angular2';

// App
import {TodoService} from '../../services/TodoService';

// Simple component
@Component({
  viewBindings: [FormBuilder, TodoService],
  selector: 'todo'
})
@View({
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  templateUrl: '/app/components/todo/todo.html'
})
export class Todo {

  todoForm: ControlGroup;

  constructor(private todoService: TodoService, fb: FormBuilder) {
    this.todoForm = fb.group({
      title: ['', Validators.required]
    });
  }

  addOne() {
    const todo = this.todoForm.value;
    this.todoService.addOne(todo);
    this.todoForm.controls['title'].updateValue('');
  }

  removeOne(todo) {
    this.todoService.removeOne(todo.id);
  }

  find() {
    return this.todoService.find();
  }
}
