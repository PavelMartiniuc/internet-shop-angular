import { IProducConfiguration } from "./i-product-configuration";

export interface IProduct {
    id: number,
    title: string,
    price: number,
    year: number,
    image?: string;

    configuratoin: IProducConfiguration
}
