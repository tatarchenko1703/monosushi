import { Component } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { BasketService } from 'src/app/shared/services/basket/basket.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
  public basket: Array<IProductResponse> = [];
  public total = 0;
  public isEmpty = true;

  constructor(
    private basketService: BasketService,
    private orderService: OrderService
  ) { }
  
  ngOnInit(): void {
    console.log('ngOnInit');
    
    this.loadbasket();
    this.updateBacket();
    this.getTotalPrice();
  }

  loadbasket(): void {
    this.isEmpty = true;
    console.log(`Bascket ${this.isEmpty}`);
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      this.isEmpty = this.basket.length == 0;
      console.log(this.basket.length);
      
      console.log(`Bascket ${this.isEmpty}`);
    }   
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0)
  }

  onClick(): void { 

  }

  valueByControl(count: number, price: number): number {
    return count * price;
  }

  updateBacket() {
    this.orderService.changeBasket.subscribe(() => { 
      console.log('updateBacket');
      this.loadbasket();
      this.getTotalPrice();
    });
  }

  productCount(product: IProductResponse, value: boolean) {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
    this.basketService.updateBasket(product);
    this.loadbasket();
    this.getTotalPrice();
  }

  delFromBasket(product: IProductResponse): void{ 
    this.basketService.deleteFromBasket(product);
    this.loadbasket();
    this.getTotalPrice();
  }


}

