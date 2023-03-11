import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductRequest, IProductResponse } from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(this.api.products);
  }

  getCustom(type: number, categoryid: number, groupid: number): Observable<IProductResponse[]> {
    if (type == 1) {
      return this.http.get<IProductResponse[]>(`${this.api.products}`, {
        params: new HttpParams()
          .set(`category.id`, categoryid)
          .set(`group.id`, groupid)
      }
      );
    } else { 
      return this.http.get<IProductResponse[]>(`${this.api.products}`, {
        params: new HttpParams()
          .set(`category.id`, categoryid)
      }
      );

    }

  }

  getOne(id: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.api.products}/${id}`);
  }


  create(product: IProductRequest): Observable<IProductResponse> {
    return this.http.post<IProductResponse>(this.api.products, product);
  }

  update(product: IProductRequest, id: number): Observable<IProductResponse> {
    return this.http.patch<IProductResponse>(`${this.api.products}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`);
  }
}
