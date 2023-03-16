import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { GroupService } from 'src/app/shared/services/group/group.service';

import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { IGroupResponse } from 'src/app/shared/interfaces/group/group.interface';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';

import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
  public adminProducts: Array<IProductResponse> = [];
  public adminGroups: Array<IGroupResponse> = [];
  public adminCategories: Array<ICategoryResponse> = [];

  public productForm!: FormGroup;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  public currentProductId = 0;
  public currentProductName = '';
  public isDelete = false;
  public isViewForm = false;
  public isVisibleGroup = false;

  public currentCategory!: ICategoryResponse;
  public currentGroup!: IGroupResponse;
  public currentCategoryPath = '';
  public currentGroupPath = '';

  public currentCategoryId = 0;
  public currentGroupId = 0;

  public idxGroup    = 0;
  public idxCategory = 0;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private groupService: GroupService,
    private imageService: ImageService,
    private toastr: ToastrService,

  )
   
    {    }

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadGroups();
    this.currentCategoryPath = 'rolls';
    this.currentGroupPath = 'all';
    this.loadProducts();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      group: [null],
      name: [null, Validators.required],
      sklad: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      path: [null, Validators.required],
      imgPath: [null, Validators.required]
    });
  }

  loadProducts(): void {
    this.productService.getCustom(this.currentCategoryPath, this.currentGroupPath).subscribe(data => {
        this.adminProducts = data;
      })
  }

  onHideCategory(): void { 

    this.isVisibleGroup = this.currentCategory.path == 'rolls';
   
    this.productForm.patchValue({
      category: this.currentCategory
    });
    
    if (!this.isVisibleGroup) {
      this.currentGroup = this.adminGroups[0];
      this.productForm.patchValue({
        group: this.currentGroup
      });
    }
  }
  
  onSelectProduct(): void { 

    this.currentCategoryPath = this.currentCategory.path;
    this.currentGroupPath = this.currentGroup.path;

    this.onHideCategory();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
      this.currentCategory = this.adminCategories[0];
      this.currentCategoryPath = this.currentCategory.path;
      this.isVisibleGroup = true;
    })
  }

  loadGroups(): void {
    this.groupService.getAll().subscribe(data => {
      this.adminGroups = data;
      this.currentGroup = this.adminGroups[0];
      this.currentGroupPath = this.currentGroup.path;
    })
  }

  getIndexCategory(category: ICategoryResponse): number { 
    let result = 0;
    for (let i = 0; i < this.adminCategories.length; i++) { 
      if (this.adminCategories[i].id == category.id) { 
        result = i;
        break;
      }
    }
    return result;
  }

  getIndexGroup(group: IGroupResponse): number {
    let result = 0;
    for (let i = 0; i < this.adminGroups.length; i++) {
      if (this.adminGroups[i].id == group.id) {
        result = i;
        break;
      }
    }
    return result;
  }

  addProduct(): void {
    if (this.editStatus) {
      this.productService.update(this.productForm.value, this.currentProductId).subscribe(() => {
        this.loadProducts();
        this.toastr.success('Product successfully updated');
      })
    } else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.loadProducts();
        this.toastr.success('Product successfully created');
      })
    }
    this.editStatus = false;
    this.productForm.reset();
    this.isUploaded = false;
    this.isDelete = false;
    this.uploadPercent = 0;
    this.isViewForm = false;
  }

  editProduct(product: IProductResponse): void {
    window.scroll(0, 0);
    this.isViewForm = true;
    this.editStatus = true;
    this.isDelete = product.imgPath.length > 0;
    this.isUploaded = true;

    this.currentProductId = product.id;
    this.currentCategory = product.category;
    this.currentGroup = product.group;
    this.onHideCategory();

    this.idxGroup    = this.getIndexGroup(this.currentGroup);
    this.idxCategory = this.getIndexCategory(this.currentCategory);

    this.productForm.patchValue({
      category: product.category,
      group: product.group,
      name: product.name,
      sklad: product.sklad,
      weight: product.weight,
      price: product.price,
      path: product.path,
      imgPath: product.imgPath,
    });

  }

  deleteProduct(group: IGroupResponse): void {
    this.currentGroup = group;
    this.currentProductId = group.id;
    this.currentProductName = group.name;
  }

  deleteProductById(productid: number): void {
    this.productService.delete(productid).subscribe(() => {
      this.currentCategoryId = this.currentCategory.id;
      this.currentGroupId = this.currentGroup.id;
      this.toastr.success('One product is deleted!');
      this.loadProducts();
    })
  }

  toggleOpenForm(): void {
    this.isViewForm = !this.isViewForm;
    this.editStatus = false;
    this.isDelete = false;
    this.productForm.reset();
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }

  upload(event: any): void {

    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imgPath: data
        });
        this.isUploaded = true;
        this.isDelete = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.productForm.patchValue({
      imgPath: ''
    });
    this.isDelete = false;

  }
}
