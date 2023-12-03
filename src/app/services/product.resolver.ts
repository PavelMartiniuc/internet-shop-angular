import { Injectable } from '@angular/core';
import {catchError} from 'rxjs/operators'; 
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { IProduct } from '../models/i-product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProduct> {

  constructor(private productService: ProductsService, private router: Router) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
    return this.productService.getProdcutById(route.params?.['id']).pipe(
      catchError(() => {
          this.router.navigate(['products']);
          return EMPTY;
      })
    );
  }
}
