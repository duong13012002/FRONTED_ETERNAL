import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  readonly API_URL ="http://localhost:8080/rest/products"

  constructor(private http:HttpClient){}

  getProduct(){
    return this.http.get<any>(this.API_URL)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
}
