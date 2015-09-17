import { Component, View, Injectable } from 'angular2/angular2';
import { Http } from 'angular2/http';

@Injectable()
export class ProductService {

  // list: Array<any>;
  // product: Object;

  constructor(public http: Http) {

  }

  getProducts(callback) {

    this.http.get('/api/products')
      .toRx()
      .map(r => r.json())
      .subscribe(res => callback(res));

  }

  getProduct(id, callback) {

    this.http.get('/api/products/' + id)
      .toRx()
      .subscribe(res => callback(res.json()));

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
