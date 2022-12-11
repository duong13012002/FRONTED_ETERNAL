import {Color, Product, size, Sole} from "./Cart";

export interface FindQuantity{
  product?: Product;
  size?:size;
  mau?:Color;
  sole?:Sole;
}

export interface ProductAdd{
  product?:object;
  size?:object;
  mau?:object;
  quantity?: number;
  userName?:string;
}

