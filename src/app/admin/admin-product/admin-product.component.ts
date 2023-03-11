import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { GroupService } from 'src/app/shared/services/group/group.service';

import { IProductRequest, IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { IGroupRequest, IGroupResponse } from 'src/app/shared/interfaces/group/group.interface';
import { ICategoryRequest, ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';

import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent {
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

  public currentCategoryId = 0;
  public currentGroupId = 0;

  public idxGroup    = 0;
  public idxCategory = 0;

  private typeSelect = 0;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private groupService: GroupService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.currentCategory = <ICategoryResponse>{};
    this.currentGroup = <IGroupResponse>{};
    this.currentCategory.id = 0;
    this.currentGroup.id = 0;
    this.initProductForm();
    this.loadProducts();
    this.loadCategories();
    this.loadGroups();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      group: [null],
      name: [null, Validators.required],
      sklad: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imgPath: [null, Validators.required]
    });
  }

  loadProducts(): void {

    if (this.typeSelect == 0) {
      this.productService.getAll().subscribe(data => {
        this.adminProducts = data;
      })
    } else { 
      this.productService.getCustom(this.typeSelect, this.currentCategory.id, this.currentGroup.id).subscribe(data => {
        this.adminProducts = data;
      })
    }
  }

  onHideCategory(): void { 
    this.isVisibleGroup = this.currentCategory.id == 1;
    this.currentCategoryId = this.currentCategory.id;
    if (!this.isVisibleGroup) {
      this.currentGroup = this.adminGroups[0];
      this.currentGroupId = this.adminGroups[0].id;
      this.productForm.patchValue({
        group: this.currentGroup
      });
    }
    this.productForm.patchValue({
      category: this.currentCategory
    });
  }
  
  onSelectProduct(): void { 
    this.typeSelect = 0;
    this.isVisibleGroup = false;
    if (this.currentCategory.id == 1) {
      this.isVisibleGroup = true;
      if (this.currentGroup.id > 1) {
        this.typeSelect = 1;
        this.currentCategoryId = this.currentCategory.id;
        this.currentGroupId = this.currentGroup.id;
      } else {
        this.typeSelect = 2;
        this.currentCategoryId = this.currentCategory.id;
        this.currentGroupId = 0;
        this.currentGroup = this.adminGroups[0];
      }
    } else {
      if (this.currentCategory.id > 0) { 
        this.typeSelect = 2;
        this.currentCategoryId = this.currentCategory.id;
        this.currentGroupId = 0;
      }
      else {
        this.currentCategoryId = 0;
        this.currentGroupId = 0;
        this.currentGroup = this.adminGroups[0];       
      }
    }
    this.loadProducts();
    this.currentCategoryId = 0;
    this.currentGroupId = 0;
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
      this.currentCategory = this.adminCategories[0];
      this.isVisibleGroup = true;
    })
  }

  loadGroups(): void {
    this.groupService.getAll().subscribe(data => {
      this.adminGroups = data;
      this.currentGroup = this.adminGroups[0];
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
      imgPath: product.imgPath,
    });

  }

  deleteProduct(group: IGroupResponse): void {
    this.currentGroup = group;
    this.currentProductId = group.id;
    this.currentProductName = group.name;
  }

  deleteProductById(productid: number): void {
    console.log(productid);
    
    this.productService.delete(productid).subscribe(() => {
      this.currentCategoryId = this.currentCategory.id;
      this.currentGroupId = this.currentGroup.id;
      // this.onSelectProduct();
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
    console.log();
    
    this.productForm.patchValue({
      imgPath: ''
    });
    this.isDelete = false;

  }
}
