import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly APIUrl = "http://localhost:8080/api/order/dathang";
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private http:HttpClient){}

  addOrder(){
    return this.http.post(this.APIUrl, this.cartItemList);
  }


  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    if(this.cartItemList.length == 0){
      this.cartItemList.push(product);
    }else{
      let temp = this.cartItemList.filter((a:any)=>a.id == product.id)[0];
      if(temp){
        let index = this.cartItemList.indexOf(temp);
        this.cartItemList[index].quantity ++;
        this.cartItemList[index].total += product.total;
      }else{
        this.cartItemList.push(product);
      }
    }

    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
