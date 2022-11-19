import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";
import {FindQuantity} from "../../@core/models/FindQuantity";
import {ProductDTO} from "../../@core/models/ProductSortDTO";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  readonly API_URL ="http://localhost:8080/api/public/"

  constructor(private http:HttpClient){}

  getProduct():Observable<any>{
    return this.http.get<any>(this.API_URL+"rest/products")
      .pipe(map((res:any)=>{
        return res;
      }))
  }


  getPageProduct(indexPage: any, size:any,dto:ProductDTO): Observable<any>{
    return this.http.put<any>(this.API_URL +"rest/products/sortByKey?page="+indexPage +"&size="+size,dto) ;
  }

  public getAllCate():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/rest/products/getAllCategory`);
  }

  public getAllBrand():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/rest/products/getAllBrand`);
  }

  public getAllColor():Observable<any>{
    return this.http.get<any>(this.API_URL+"rest/products/getColor");
  }

  public getAllSize():Observable<any>{
    return this.http.get<any>(this.API_URL+"rest/products/getAllSize");
  }

  findQuantity(search:FindQuantity): Observable<any>{
    return this.http.put<any>("http://localhost:8080/api/public/rest/s_c_details/findQuantity",search) ;
  }

}
