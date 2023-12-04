import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/i-product';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../ui/dialog-box/dialog-box.component';
import { DialogConfig } from '@angular/cdk/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products!: IProduct[];
  productsSubscription!: Subscription;
  canEdit: boolean =false;

  constructor(private productsService: ProductsService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.canEdit = true;
    this.productsSubscription = this.productsService.getProdcuts().subscribe((data) => this.products = data);
  }

  ngOnDestroy(){
    if (this.productsSubscription)
      this.productsSubscription.unsubscribe();
  }

  openDialog(): void {
    let dialogConfig = new MatDialogConfig();
    
    dialogConfig.width = "700px";
    dialogConfig.data = 123;
    dialogConfig.disableClose= true;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data)
        this.postData(data)
    });
  }

  postData(data: IProduct) {
    this.productsService.addProduct(data).subscribe((data) => this.products.push(data));
  }

}
