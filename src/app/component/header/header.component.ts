import { Component, OnInit, Renderer2 } from '@angular/core';
import { ROLE } from 'src/app/shared/contants/role.constant';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
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
  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';

  constructor(
    private categoryService: CategoryService,
    private renderer: Renderer2,
    private orderService: OrderService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadbasket();
    this.updateBacket();
    this.checkUserLogin();
    this.checkUpdateUserLogin();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.headerCategories = data;
    })
  }

  openMenu() {
    const burger = document.getElementById('burger');
    let btnOpen = document.getElementById('open');
    // const btnClose = document.getElementById('close');
    let box = btnOpen?.getBoundingClientRect();   
    this.renderer.setStyle(burger, 'top', '20px');
    this.renderer.setStyle(burger, 'left', `${box?.left}px`);
    
    // this.renderer.setStyle(btnOpen, 'display', 'none');
    
    // this.renderer.setStyle(btnClose, 'display', 'block');
  }

  closeMenu() {
    const burger = document.getElementById('burger');
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

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role !== ROLE.ADMIN) {
      this.loginUrl = 'admin/discount';
      this.loginPage = 'admin/discount';
      this.isLogin = true;
    } else if (currentUser && currentUser.role !== ROLE.USER) {
      this.loginUrl = 'cabinet';
      this.loginPage = 'cabinet';
      this.isLogin = true;

    } else { 
      this.loginUrl = '';
      this.loginPage = '';
      this.isLogin = false;
    }
        
  }
  
  checkUpdateUserLogin() { 
    this.accountService.isUserLogin$.subscribe(() => { 
      this.checkUserLogin();
    })

  }

}
