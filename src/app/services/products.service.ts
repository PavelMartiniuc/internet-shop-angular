import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/i-product';
import { IProductBasketItem } from '../models/i-product-basket-item';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  base_url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getProdcuts() {
    return this.http.get<IProduct[]>(`${this.base_url}${'products'}`);
  }

  getProdcutById(id: number) {
    return this.http.get<IProduct>(`${this.base_url}${'products'}/${id}`);
  }

  addProduct(product: IProduct) {
    return this.http.post<IProduct>(`${this.base_url}${'products'}`, product)
  }
  
  updateProduct(product: IProduct) {
    return this.http.put<IProduct>(`${this.base_url}${'products'}/${product.id}`, product)
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.base_url}${'products'}/${id}`);
  }

  addProductToBasket(product: IProductBasketItem) {
    return this.http.post<IProductBasketItem>(`${this.base_url}${'basket'}`, product);
  }

  getProductsFromBasket() {
    return this.http.get<IProductBasketItem[]>(`${this.base_url}${'basket'}`);
  }

  updateProductBasketItem(basketItem: IProductBasketItem) {
    return this.http.put<IProductBasketItem>(`${this.base_url}${'basket'}/${basketItem.id}`, basketItem);
  }

  deleteProductFromBasket(id: number) {
    return this.http.delete(`${this.base_url}${'basket'}/${id}`);
  }

  
}
