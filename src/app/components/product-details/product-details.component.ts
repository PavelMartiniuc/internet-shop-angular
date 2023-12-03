import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/i-product';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  
  product!: IProduct;
  productSubscription!: Subscription;

  constructor(private route: ActivatedRoute) {};

  ngOnInit(): void {
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data'];
    });
  }

  ngOnDestroy() {

  }

}
