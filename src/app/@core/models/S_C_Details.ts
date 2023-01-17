import {Color, Product, size} from "./Cart";

export interface S_C_Details {
  id?:number;
  product?: Product;
  size?: size;
  mau?: Color;
  quantity?: number;
  status?: number;
}
