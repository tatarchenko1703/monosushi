import { Component } from '@angular/core';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { IDiscountRequest, IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent {
  public discounts: Array<IDiscountResponse> = [];

  constructor(
    private discountService: DiscountService,
  ) { }

  ngOnInit(): void {
    this.loadDiscounts();
  }

  loadDiscounts(): void {
    this.discountService.getAll().subscribe(data => {
      this.discounts = data;
    })
  }

}
