import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/i-product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  base_url: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProdcuts() {
    return this.http.get<IProduct[]>(this.base_url);
  }

  getProdcutById(id: number) {
    return this.http.get<IProduct>(`${this.base_url}/${id}`);
  }

  addProduct(product: IProduct) {
    return this.http.post<IProduct>(this.base_url, product)
  }
}
