import {Color, ShoeLine, size, Sole} from "./Cart";

export interface ProductDTO {
  id?: number;
  name?: string;
  outputprice?: number,
  priceStart?: number,
  priceEnd?: number,
  // status?:number;
  category?:Category;
  hang?:Brand;
  sole?:Sole;
  shoeLine?:ShoeLine;
  sortByValues?:SortByValue[]
}

export interface Category {
  id?:number;
  name?: string;
}

export interface Brand{
  id?:number;
  name?: string;
}

export interface SortByValue{
  name?:string,
  type?:string
}
