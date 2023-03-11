declare const $: any;

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ICategoryRequest, ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';
// import { ConfirmComponent } from 'src/app/component/confirm/confirm/confirm.component';


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
    private imageService: ImageService,
    // private storage: Storage,
    private toastr: ToastrService,
    // private confirm: ConfirmComponent
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
      this.toastr.success('One product is edited!');
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.loadCategories();
      })
      this.toastr.success('One product is added!');
    }
    this.categoryForm.patchValue({
      imgPath: ""
    });
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.isDelete = false;
    this.uploadPercent = 0;
    this.isViewForm = false;
    // this.showForm(false);
  }

  editCategory(category: ICategoryResponse): void {
    // this.showForm(true);
    this.isViewForm = true;
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

    // this.confirm.prompt = `Ви дійсно бажаєте видалити категорію ${this.currentCategoryName}`;
    // this.confirm.title = 'Видалити категорію';
  }

  deleteCategoryById(categoryid: number): void {
    this.categoryService.delete(categoryid).subscribe(() => {
      this.loadCategories();
    })
    this.toastr.success('One product is deleted!');
  }

  deleteImage(): void { 
    this.categoryForm.patchValue({
      imgPath: ''
    });
    this.isDelete = false;

  }

  // showForm(edit: boolean): void {
  //   let form = document.getElementById('categoryForm');
  //   if (edit) {
  //     form?.classList.remove('hide');
  //     form?.classList.add('show');
  //     this.categoryForm.reset();
  //     this.editStatus = false;
  //     this.isDelete = false;
  //     this.isViewForm = true;
  //   } else {
  //     form?.classList.remove('show');
  //     form?.classList.add('hide');
  //     this.editStatus = false;
  //     this.uploadPercent = 0;
  //     this.isViewForm = false;
  //   }
  // }


  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imgPath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  toggleOpenForm(): void {
    this.isViewForm = !this.isViewForm;
    this.editStatus = false;
    this.isDelete = false;
    this.categoryForm.reset();
  }

  // async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
  //   const path = `${folder}/${name}`;
  //   let url = '';
  //   if (file) {
  //     try {
  //       const storageRef = ref(this.storage, path);
  //       const task = uploadBytesResumable(storageRef, file);
  //       percentage(task).subscribe(data => {
  //         this.uploadPercent = data.progress
  //       });
  //       await task;
  //       url = await getDownloadURL(storageRef);
  //     } catch (e: any) {
  //       console.error(e);
  //     }
  //   } else {
  //     console.log('wrong format');
  //   }
  //   return Promise.resolve(url);
  // }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }

}
