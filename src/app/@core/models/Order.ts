import {Product} from "./Cart";

export interface OrderDetails{
  id?:number;
  price?:number;
  quantity?:number;
  createDate?:Date;
  product?:Product;
  order?:Order;

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
  diaChi?:any;
}
