import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { IDiscountRequest, IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
// import { getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent {
  public adminDiscounts: Array<IDiscountResponse> = [];
  public discountForm!: FormGroup;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  public currentDiscountId = 0;
  public currentDiscountName = '';
  public isDelete = false;
  public isViewForm = false;
  
  constructor(
    private fb: FormBuilder,
    private discountService: DiscountService,
    private imageService: ImageService,
    // private storage: Storage,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initDiscountForm();
    this.loadDiscounts();
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imgPath: [null, Validators.required]
    });
  }

  loadDiscounts(): void {
    this.discountService.getAll().subscribe(data => {
      this.adminDiscounts = data;
    })
  }

  addDiscount(): void {
    if (this.editStatus) {
      this.discountService.update(this.discountForm.value, this.currentDiscountId).subscribe(() => {
        this.loadDiscounts();
      })
      this.toastr.success('One discount is edited!');
    } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.loadDiscounts();
      })
      this.toastr.success('One discount is added!');
    }
    this.discountForm.reset();
    this.editStatus = false;
    this.isUploaded = false;
    this.isDelete = false;
    this.uploadPercent = 0;
    this.isViewForm = false;
  }

  editDiscount(discount: IDiscountResponse): void {
    this.isViewForm = true;
    this.editStatus = true;

    this.discountForm.patchValue({
      date: discount.date,
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imgPath: discount.imgPath
    });

    this.isDelete = discount.imgPath.length > 0;

    this.currentDiscountId = discount.id;
    this.isUploaded = true;
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.currentDiscountId = discount.id;
    this.currentDiscountName = discount.name;
    this.toastr.success('One product is deleted!');
  }

  deleteDiscountById(discountiD: number): void {
    this.discountService.delete(this.currentDiscountId).subscribe(() => {
        this.loadDiscounts();
    })
    this.toastr.success('One product is deleted!');
  }

  deleteImage(): void {
    this.discountForm.patchValue({
      imgPath: ''
    });
    this.isDelete = false;

  }


  // showForm(edit: boolean): void {
  //   let form = document.getElementById('discountForm');
  //   if (edit) {
  //     form?.classList.remove('hide');
  //     form?.classList.add('show');
  //     this.discountForm.reset();
  //     this.editStatus = false;
  //     this.isDelete = false;
  //     this.isViewForm = true;
  //   } else {
  //     form?.classList.remove('show');
  //     form?.classList.add('hide');
  //     this.editStatus = false;
  //     this.isViewForm = false;
  //   }
  // }

  toggleOpenForm(): void {
    this.isViewForm = !this.isViewForm;
    this.editStatus = false;
    this.isDelete = false;
    this.discountForm.reset();
  }

  upload(event: any): void {

    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
          imgPath: data
        });
        this.isUploaded = true;
        this.isDelete = true;
      })
      .catch(err => {
        console.log(err);
      })
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
    return this.discountForm.get(control)?.value;
  }



}
