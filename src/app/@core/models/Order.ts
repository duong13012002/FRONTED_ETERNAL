import {Product} from "./Cart";
import {S_C_Details} from "./S_C_Details";
import {CustommerInfo} from "./CustommIn4";

export interface OrderDetails{
  id?:number;
  price?:number;
  quantity?:number;
  createDate?:Date;
  product?:Product;
  order?:Order;
  saimau?: S_C_Details;
}

export interface Order{
  id?:number;
  create_date?:Date;
  price?:number;
  note?:string;
  status?:number;
  account?:any;
  vanChuyen?:any;
  thanhToan?:any;
  giamgia?:any;
  diaChi?:CustommerInfo;
}
