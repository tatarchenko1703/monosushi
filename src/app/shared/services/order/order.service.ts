import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
  
export class OrderService {
  public changeBasket = new Subject<boolean>();
  constructor() { }
}
