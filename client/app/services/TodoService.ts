interface Todo {
  id: number;
  title: string;
  status: string;
  createdAt: Date;
}

let counter = 0;

const data: Todo[] = [
  { id: ++counter, title: 'Angular2 Router', status: 'done', createdAt: new Date() },
  { id: ++counter, title: 'Angular2 Component', status: 'done', createdAt: new Date() },
  { id: ++counter, title: 'Angular2 Core Directives', status: 'done', createdAt: new Date() },
  { id: ++counter, title: 'Angular2 Custom Directives', status: 'done', createdAt: new Date() },
  { id: ++counter, title: 'Angular2 Dependence Injection', status: 'done', createdAt: new Date() },
  { id: ++counter, title: 'Angular2 Form', status: 'done', createdAt: new Date() },
  { id: ++counter, title: 'Include Development environment', status: 'pending', createdAt: new Date() },
  { id: ++counter, title: 'Include Production environment', status: 'pending', createdAt: new Date() },
  { id: ++counter, title: 'Unit tests', status: 'pending', createdAt: new Date() }
];

// Our Todo Service that uses Store helper class for managing our state
export class TodoService {

  private _todos: Array<Todo>;

  constructor() {
    this._todos = data;
  }

  addOne(todo) {
    this._todos.push({
      id: ++counter,
      title: todo.title,
      status: 'pending',
      createdAt: new Date()
    });
  }

  removeOne(id) {
    this._todos = this._todos.filter(el => el.id !== id);
  }

  find() {
    return this._todos;
  }
}
