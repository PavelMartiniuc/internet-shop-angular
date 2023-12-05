import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/i-product';
import { Subscription, findIndex } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../ui/dialog-box/dialog-box.component';
import { ArrayHelper } from '../../infrastructure/helpers/array-helper';
import { IProductBasketItem } from '../../models/i-product-basket-item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products!: IProduct[];
  basketProducts!: IProductBasketItem[];
  productsSubscription!: Subscription;
  basketSubscription!: Subscription;
  canEdit: boolean = false;

  constructor(private productsService: ProductsService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.canEdit = true;
    this.productsSubscription = this.productsService.getProdcuts().subscribe((data) => this.products = data);
    this.basketSubscription = this.productsService.getProductsFromBasket().subscribe((data) => this.basketProducts = data);
  }

  ngOnDestroy(){
    if (this.productsSubscription)
      this.productsSubscription.unsubscribe();
    if (this.basketSubscription)
      this.basketSubscription.unsubscribe();
  }

  openDialog(product?: IProduct): void {
    let dialogConfig = new MatDialogConfig();
    
    dialogConfig.width = "700px";
    dialogConfig.data = product;
    dialogConfig.disableClose= true;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data.id)
          this.updateProduct(data);
        else  
          this.addProduct(data);
      }
    });
  }

  addProduct(data: IProduct) {
    this.productsService.addProduct(data).subscribe((data) => this.products.push(data));
  }

  updateProduct(product: IProduct) {
    this.productsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map((currentProduct) => {
        if (currentProduct.id == data.id)
          return data;
        else
          return currentProduct;
      });
    });
  }

  deleteProduct(id: number) {
    
    this.
      productsService.
      deleteProduct(id).
      subscribe((data)=> {
        ArrayHelper.RemoveElementByCondition(this.products, (element) => element.id == id);
      });

  }

  addToBasket(product: IProduct) {
    let productBasketItem = product as IProductBasketItem;

    if (this.basketProducts.length > 0) {
      let findBasketItem = this.basketProducts.find((item) => item.id == product.id );
      if (findBasketItem)
        this.updateBasketItem(findBasketItem);
      else
        this.addBasketItem(productBasketItem);
    }
    else
      this.addBasketItem(productBasketItem);
  }

  addBasketItem(productBasketItem: IProductBasketItem) {
    productBasketItem.quantity = 1;
    this.productsService.addProductToBasket(productBasketItem).subscribe((data) => this.basketProducts.push(data));
  }

  updateBasketItem(productBasketItem: IProductBasketItem) {
    productBasketItem.quantity += 1;
    this.productsService.updateProductBasketItem(productBasketItem).subscribe((data) =>{ 
      let findBasketItem = this.basketProducts.find((item) => item.id == data.id );
      if (findBasketItem)
        findBasketItem.quantity = productBasketItem.quantity;
    });
  }
}
