import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly APIUrl = "http://localhost:8080/api/order/dathang";
  public cartItemList : any[] =[]
  constructor(private http: HttpClient) {
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


  addtoCart(product: any) {
    if (this.cartItemList.length == 0) {
      this.cartItemList.push(product);
    }else {
      let temp = this.cartItemList.filter((a: any) => a.id == product.id)[0];
      if (temp) {
        let index = this.cartItemList.indexOf(temp);
        this.cartItemList[index].quantity++;
        this.cartItemList[index].total += product.total;
      } else {
        this.cartItemList.push(product);
      }
    }
    this.setCartData();
  }

  setCartData() {
    localStorage.setItem('cart', JSON.stringify(this.cartItemList));
  }

  getCartData(): any {
    return JSON.parse(localStorage.getItem('cart') as any) || [];
  }
}
