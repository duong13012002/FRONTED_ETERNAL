import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {ProductAdd} from "../../@core/models/FindQuantity";
import {BuyNow, Cart} from "../../@core/models/Cart";
import {CustommerInfo} from "../../@core/models/CustommIn4";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly APIUrl = "http://localhost:8080/api/order/dathang";
  public cartItemList : any[] =[]
  constructor(private http: HttpClient) {
  }

  findAllByUserName(userName:string):Observable<any>{
    return this.http.get<any>("http://localhost:8080/api/public/cart/byUserName/"+userName);
  }

  create(cart:Cart):Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/public/cart",cart);
  }

  update(cart:Cart):Observable<any>{
    return this.http.put<any>("http://localhost:8080/api/public/cart",cart);
  }

  delete(id:any):Observable<any>{
    return this.http.delete<any>("http://localhost:8080/api/public/cart/"+id);
  }

  deleteAll(userName:any):Observable<any>{
    return this.http.get<any>("http://localhost:8080/api/public/cart/deleteAll/"+userName);
  }

  findAllCustommerIn4(userName:string):Observable<any>{
    return this.http.get<any>("http://localhost:8080/api/public/cusI4/active/"+userName);
  }

  checkOut(custommerInfo:CustommerInfo,userName:any):Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/public/order/saveAll?userName="+userName, custommerInfo);
  }

  buyNow(userName:any,buyNow:BuyNow):Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/public/order/buyNow?userName="+userName, buyNow);
  }



  addOrder() {
    return this.http.post(this.APIUrl, this.cartItemList);
  }

  getProducts(): Observable<any[]> {
    return of(this.getCartData());
  }


  getTotalPrice(): number {
    let grandTotal = 0;
    this.getCartData().map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(product: any) {
    const index = this.cartItemList.findIndex((x: any) => x.id === product.id);

    if (index > -1) {
      this.cartItemList.splice(index, 1);
      this.setCartData();
    }
  }

  removeAllCart() {
    localStorage.removeItem('cart');
  }


  setCartData() {
    localStorage.setItem('cart', JSON.stringify(this.cartItemList));
  }

  setCartDatad(cartItemList:any) {
    localStorage.setItem('cart', JSON.stringify(cartItemList));
  }

  getCartData(): any {
    return JSON.parse(localStorage.getItem('cart') as any) || [];
  }
}
