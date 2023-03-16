import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GroupService } from 'src/app/shared/services/group/group.service';
import { IGroupRequest, IGroupResponse } from 'src/app/shared/interfaces/group/group.interface';

import { ToastrService } from 'ngx-toastr';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.scss']
})
export class AdminGroupComponent {
  public adminGroups: Array<IGroupResponse> = [];
  public groupForm!: FormGroup;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  public currentGroupId = 0;
  public currentGroupName = '';
  public isDelete = false;
  public isViewForm = false;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private toastr: ToastrService,
    private render: Renderer2
  ) { }

  ngOnInit(): void {
    this.initGroupForm();
    this.loadGroups();
  }

  initGroupForm(): void {
    this.groupForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required]
    });
  }

  loadGroups(): void {
    this.groupService.getAll().subscribe(data => {
      this.adminGroups = data;
    })
  }

  addGroup(): void {
    if (this.editStatus) {
      this.groupService.update(this.groupForm.value, this.currentGroupId).subscribe(() => {
        this.loadGroups();
      })
      this.toastr.success('One group is edited!');
    } else {
      this.groupService.create(this.groupForm.value).subscribe(() => {
        this.loadGroups();
      })
      this.toastr.success('One group is added!');
    }
    this.editStatus = false;
    this.groupForm.reset();
    this.isUploaded = false;
    this.isDelete = false;
    this.uploadPercent = 0;
    this.isViewForm = false;
  }

  editGroup(group: IGroupResponse): void {
    // this.showForm(true);
    window.scrollTo(0, 0);
    this.isViewForm = true;
    this.groupForm.patchValue({
      name: group.name,
      path: group.path
    });
    this.editStatus = true;
    this.currentGroupId = group.id;
    this.isUploaded = true;
  }

  deleteGroup(group: IGroupResponse): void {
    this.currentGroupId = group.id;
    this.currentGroupName = group.name;
  }

  deleteGroupById(groupid: number): void {
    this.groupService.delete(groupid).subscribe(() => {
      this.loadGroups();
    })
    this.toastr.success('One group is deleted!');
  }

  toggleOpenForm(): void {
    this.isViewForm = !this.isViewForm;
    this.editStatus = false;
    this.isDelete = false;
    this.groupForm.reset();
  }

  valueByControl(control: string): string {
    return this.groupForm.get(control)?.value;
  }

  onClick(event: any): void {
    let trDivs = document.getElementsByTagName('tr');
    if (trDivs.length > 0) {
      for (let i = 0; i < trDivs.length; i++) {
        console.log(trDivs[i]);
        for (let j = 0; j < trDivs[i].childElementCount; j++)
        this.render.removeClass(trDivs[i].childNodes[j], "active");  
      }
    }
  // $('.table tr').removeClass('active');
    console.log(event);
    this.render.addClass(event.target, "active");  
    trDivs = document.getElementsByTagName('tr');
};

}
