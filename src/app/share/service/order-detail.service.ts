import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  readonly APIUrl = "http://localhost:8080/api/order-detail";

  constructor(private http: HttpClient) {
  }

  getOrderDetail(id : number){
    return this.http.get<any>(`${this.APIUrl}/${id}`);
  }
}
