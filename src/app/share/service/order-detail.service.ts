import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  readonly APIUrl = "http://localhost:8080/api/public/order";

  constructor(private http: HttpClient) {
  }

  getOrderDetail(userName : any):Observable<any>{
    return this.http.get<any>(`${this.APIUrl}/showHistory?userName=`+userName);
  }

  getOrderByStatus(userName:any,status : number):Observable<any>{
    return this.http.get<any>(`${this.APIUrl}/getByStatus?userName=`+userName +"&status="+status);
  }

  chiTiet(id :any):Observable<any>{
    return this.http.get<any>(`${this.APIUrl}/orderDeails/`+id);
  }

  huydon(id:any, note:string){
    return this.http.post<any>(`${this.APIUrl}/huyDon/`+id,note);
  }

  getOrderById(id:any){
    return this.http.get<any>(`${this.APIUrl}/`+id);
  }

  updateOrder(idOrder:any, idCustommer:any):Observable<any>{
    return this.http.get<any>(`${this.APIUrl}/updateOrder?idOrder=`+idOrder +"&idCustommer="+idCustommer);
  }

  xoaDonHang(idOrderDetail:number):Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}public/order-detail/delete/`+idOrderDetail);
  }

}
