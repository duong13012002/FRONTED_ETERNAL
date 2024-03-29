import {CustommerInfo} from "./CustommIn4";

export interface BuyNow{
  cart?: Cart,
  custommerInfo?:CustommerInfo;
}

export interface Cart{
  id?:number;
  product?: Product;
  size?: size;
  mau?:Color;
  sole?:Sole;
  quantity?: number;
  userName?: string;
}

export interface Product{
  id?: number;
  name?: string;
  photo?:any;
  createDate?:Date;
  outputprice?:number;
  updatedate?:Date;
  status?: number;
  delete?:boolean;
  category?:Category;
  hang?:Brand;
  sole?:Sole;
  shoeLine?: ShoeLine;
}

export interface Brand {
  id?:number;
  name?:string;
  delete?:boolean;
}

export interface Category {
  id?:number;
  name?:string;
  delete?:boolean;
}

export interface size{
  id?:number;
  value?:number;
}

export interface Color{
  id?:number;
  value?:number;
  name?:string;
}

export interface Sole{
  id?:number;
  name?:string;
}

export interface ShoeLine {
  id?:number;
  name?:string;
}




