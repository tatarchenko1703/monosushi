import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount-detail',
  templateUrl: './discount-detail.component.html',
  styleUrls: ['./discount-detail.component.scss']
})
  
export class DiscountDetailComponent {
  public discount!: IDiscountResponse;
  public arrDescr: Array<string> = [];
  

  constructor(
    private discountService: DiscountService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const DISCOUNT_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.discountService.getOne(DISCOUNT_ID).subscribe(data => {
      this.discount = data;

      this.arrDescr = this.discount.description.split(/\r\n|\n|\r/);
    })
  }

  // loadDiscount(): void {
  //   const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  //   this.discountService.getOne(id).subscribe(data => {
  //     this.discount = data;
  //   })
  // }


}
