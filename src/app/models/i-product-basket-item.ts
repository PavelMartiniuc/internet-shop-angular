import { IProduct } from "./i-product";
import { IProducConfiguration } from "./i-product-configuration";

export interface IProductBasketItem extends IProduct {
   quantity: number
}