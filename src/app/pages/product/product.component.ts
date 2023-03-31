import { Component, OnDestroy, OnInit } from '@angular/core';
import { GroupService } from 'src/app/shared/services/group/group.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';

import { IGroupRequest, IGroupResponse } from 'src/app/shared/interfaces/group/group.interface';
import { IProductRequest, IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ICategoryRequest, ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BasketService } from 'src/app/shared/services/basket/basket.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  public groups: Array<IGroupResponse> = [];
  public categories: Array<ICategoryResponse> = [];
  public products: Array<IProductResponse> = [];
  public currentCategoryId = 0;
  public groupname = 'all';
  public activePath = '';
  public activeTitle = '';
  public  = '';
  private eventSubscription!: Subscription;


  constructor(
    private productService: ProductService,
    private groupService: GroupService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private basketService: BasketService,

  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activePath = this.activatedRoute.snapshot.paramMap.get('category') as string;
        this.groupname = this.activatedRoute.snapshot.paramMap.get('group') as string;

        this.loadCategory();
        this.loadGroups();
        this.loadProducts();
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  loadCategory(): void {
    this.categoryService.getOne(this.activePath).subscribe(data => {
      this.categories = data;
      this.activeTitle = this.categories[0].name;
    })
  }

  loadGroups(): void {
    this.groupService.getAll().subscribe(data => {
      this.groups = data;
    })
  }

  doOnItemClick(path: string): void {
    this.groupname = path;
    this.loadProducts();
  }

  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.activePath = categoryName;
    this.categoryService.getOne(categoryName).subscribe(data => {
      this.categories = data;
      this.activeTitle = this.categories[0].name;
    })
   
    this.productService.getCustom(categoryName, this.groupname).subscribe(data => {
      this.products = data;
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
  }

}
