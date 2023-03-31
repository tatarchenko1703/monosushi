import { Injectable } from '@angular/core';
import { IProductResponse } from '../../interfaces/product/product.interface';
import { OrderService } from '../order/order.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    private orderService: OrderService

  ) { }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  deleteFromBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket.splice(index, 1);
      }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  updateBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count = product.count;
      }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

}
