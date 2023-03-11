import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
  
export class ConfirmComponent {
  public title!: string;
  public prompt!: string;
  public name!: string;

  isDelete(result : boolean): boolean { 
    return result;
  }
}
