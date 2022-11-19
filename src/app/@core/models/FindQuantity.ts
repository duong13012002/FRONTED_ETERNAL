import {Color, Product, size} from "./Cart";

export interface FindQuantity{
  product?: Product;
  size?:size;
  mau?:Color;
}

export interface ProductAdd{
  product?:object;
  size?:object;
  mau?:object;
  quantity?: number;
  userName?:string;
}

