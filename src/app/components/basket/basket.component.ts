import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { IProductBasketItem } from '../../models/i-product-basket-item';
import { ArrayHelper } from '../../infrastructure/helpers/array-helper';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  
  products!: IProductBasketItem[];
  basketSubscription!: Subscription;

  constructor(private productService: ProductsService,) {

  }

  ngOnInit(): void {
   this.basketSubscription = this.productService.getProductsFromBasket().subscribe((data) => {
      this.products = data;
   });
  }

  ngOnDestroy(){
    if (this.basketSubscription)
      this.basketSubscription.unsubscribe();
  }

  addItemToBasket(item: IProductBasketItem) {
    item.quantity += 1;
    this.productService.updateProductBasketItem(item).subscribe((data) => {
    });
  }

  substractItemFromBasket(item: IProductBasketItem) {
    item.quantity-=1;
    if (item.quantity == 0)
      this.productService.deleteProductFromBasket(item.id).subscribe((data) => {
        ArrayHelper.RemoveElement(this.products, item);
      });
    else      
      this.productService.updateProductBasketItem(item).subscribe((data) => {
      });
  }

}
