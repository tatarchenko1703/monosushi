import { Component } from '@angular/core';
import { GroupService } from 'src/app/shared/services/group/group.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

import { IGroupRequest, IGroupResponse } from 'src/app/shared/interfaces/group/group.interface';
import { IProductRequest, IProductResponse } from 'src/app/shared/interfaces/product/product.interface';

@Component({
  selector: 'app-rolls',
  templateUrl: './rolls.component.html',
  styleUrls: ['./rolls.component.scss']
})
export class RollsComponent {

  public groups: Array<IGroupResponse> = [];
  public products: Array<IProductResponse> = [];
  public currentCategoryId = 0;
  public currentGroupId = 0;
  private typeSelect = 1;
  private itemDefault!: HTMLInputElement;

  constructor(
    private productService: ProductService,
    private groupService: GroupService,
  ) { }

  ngOnInit(): void {
    this.loadGroups();
    this.loadProducts();
    this.doOnItemClick(0);
  }

  loadGroups(): void {
    this.groupService.getAll().subscribe(data => {
      this.groups = data;     
    })
  }

  doOnItemClick(i: number): void{ 
    this.currentCategoryId = 1;
    this.currentGroupId = i + 1;
    this.typeSelect = 2;
    if (this.currentGroupId > 1) { 
      this.typeSelect = 1;
    }
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getCustom(this.typeSelect, this.currentCategoryId, this.currentGroupId).subscribe(data => {
      this.products = data;
    })
  }

  
}

