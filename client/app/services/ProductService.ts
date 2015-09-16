import { Component, View, Injectable } from 'angular2/angular2';
import { Http } from 'angular2/http';

@Injectable()
export class ProductService {

  // list: Array<any>;
  // product: Object;

  constructor(public http: Http) {

  }

  getList(callback) {

    this.http.get('/api/products')
      .toRx()
      .map(r => r.json())
      .subscribe(res => callback(res));

  }

  getProduct(callback) {

    this.http.get('/api/products/:id')
      .toRx()
      .map(r => r.json())
      .subscribe(res => callback(res));

  }

  // addOne(todo) {
  //   this._todos.push({
  //     id: ++counter,
  //     title: todo.title,
  //     status: 'pending',
  //     createdAt: new Date()
  //   });
  // }
  //
  // removeOne(id) {
  //   this._todos = this._todos.filter(el => el.id !== id);
  // }
  //
  // find() {
  //   return this._todos;
  // }
}
