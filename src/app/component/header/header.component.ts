import { Component, OnInit, Renderer2 } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
  
export class HeaderComponent {

  public headerCategories: Array<ICategoryResponse> = [];
  public shortpath = environment.SHORT_PATH_PROD;
  public total = 0;
  public totalProduct = 0;
  private basket: Array<IProductResponse> = [];

  constructor(
    private categoryService: CategoryService,
    private renderer: Renderer2,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadbasket();
    this.updateBacket();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.headerCategories = data;
    })
  }

  openMenu() {
    const burger = document.getElementById('burger');
    let btnOpen = document.getElementById('open');
    const btnClose = document.getElementById('close');

    // this.renderer.setStyle(burger, 'bottom', 'calc(0% - 70px)');
    
    let box = btnOpen?.getBoundingClientRect();   
    this.renderer.setStyle(burger, 'top', '20px');
    this.renderer.setStyle(burger, 'left', `${box?.left}px`);
    
    // this.renderer.setStyle(btnOpen, 'display', 'none');
    
    // this.renderer.setStyle(btnClose, 'display', 'block');
  }

  closeMenu() {
    const burger = document.getElementById('burger');
    const btnOpen = document.getElementById('open');
    const btnClose = document.getElementById('close');

    this.renderer.setStyle(burger, 'top', '-100lvh');
  }

  loadbasket() : void{ 
    if (localStorage.length > 0 && localStorage.getItem('basket')) { 
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      this.getTotalPrice();
    }
  }

  getTotalPrice(): void { 
    this.total = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0)
    this.totalProduct = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count, 0)
    
  }

  updateBacket() {
    this.orderService.changeBasket.subscribe(() => this.loadbasket());
    
  }

}
