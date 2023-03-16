import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { IProductResponse } from '../../interfaces/product/product.interface';
import { ProductService } from './product.service';


@Injectable({
  providedIn: 'root'
})
  
export class ProductInfoResolver implements Resolve<IProductResponse> {
  
  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductResponse> {
    return this.productService.getOne(Number(route.paramMap.get('id')));
  }

}
