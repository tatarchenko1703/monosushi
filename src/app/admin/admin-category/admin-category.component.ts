declare const $: any;

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ICategoryRequest, ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {
  public adminCategories: Array<ICategoryResponse> = [];
  public categoryForm!: FormGroup;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  public currentCategoryId = 0;
  public currentCategoryName = '';
  public isDelete = false;
  public isViewForm = false;


  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imgPath: ["", Validators.required]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
    })
  }

  addCategory(): void {
    if (this.editStatus) {
      this.categoryService.update(this.categoryForm.value, this.currentCategoryId).subscribe(() => {
        this.loadCategories();
      })
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.loadCategories();
      })
    }
    this.categoryForm.patchValue({
      imgPath: ""
    });
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.isDelete = false;
    this.uploadPercent = 0;
    this.showForm(false);
  }

  editCategory(category: ICategoryResponse): void {
    this.showForm(true);
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imgPath: category.imgPath
    });
    this.editStatus = true;
    this.isDelete = category.imgPath.length > 0;
    this.currentCategoryId = category.id;
    this.isUploaded = true;
  }

  deleteCategory(category: ICategoryResponse): void {
    this.currentCategoryId = category.id;
    this.currentCategoryName = category.name;

  }

  deleteCategoryById(categoryid: number): void {
    this.categoryService.delete(categoryid).subscribe(() => {
      this.loadCategories();
    })
  }

  deleteImage(): void { 
    this.categoryForm.patchValue({
      imgPath: ''
    });
    this.isDelete = false;

  }

  showForm(edit: boolean): void {
    let form = document.getElementById('categoryForm');
    if (edit) {
      form?.classList.remove('hide');
      form?.classList.add('show');
      this.categoryForm.reset();
      this.editStatus = false;
      this.isDelete = false;
      this.isViewForm = true;
    } else {
      form?.classList.remove('show');
      form?.classList.add('hide');
      this.editStatus = false;
      this.uploadPercent = 0;
      this.isViewForm = false;
    }
  }


  upload(event: any): void {
    
    const file = event.target.files[0];
    console.log(file);
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imgPath: data
        });
        this.isUploaded = true;
        this.isDelete = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }

}
