import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { BasketService } from 'src/app/shared/services/basket/basket.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  public currentProduct!: IProductResponse;
  public isVisibleSklad = true;

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentProduct = response["productInfo"];
      this.isVisibleSklad = this.currentProduct.category.path == 'rolls' || this.currentProduct.category.path == 'sets';
    })
  }

  productCount(product: IProductResponse, value: boolean) { 
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void {
    this.basketService.addToBasket(product);
    product.count = 1;
    // let basket: Array<IProductResponse> = [];
    // if (localStorage.length > 0 && localStorage.getItem('basket')) {
    //   basket = JSON.parse(localStorage.getItem('basket') as string);
    //   if (basket.some(prod => prod.id === product.id)) {
    //     const index = basket.findIndex(prod => prod.id === product.id);
    //     basket[index].count += product.count;
    //   } else {
    //     basket.push(product);
    //   }
    // } else {
    //   basket.push(product);
    // }
    // localStorage.setItem('basket', JSON.stringify(basket));
    // this.orderService.changeBasket.next(true);
  }


}



