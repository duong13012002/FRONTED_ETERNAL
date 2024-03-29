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
    return this.http.get<any>(this.API_URL+"products")
      .pipe(map((res:any)=>{
        return res;
      }))
  }


  getPageProduct(indexPage: any, size:any,dto:ProductDTO): Observable<any>{
    return this.http.put<any>(this.API_URL +"products/sortByKey2?page="+indexPage +"&size="+size,dto) ;
  }

  public getAllCate():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/products/getAllCategory`);
  }

  public getAllBrand():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/products/getAllBrand`);
  }

  public getAllColor():Observable<any>{
    return this.http.get<any>(this.API_URL+"products/getColor");
  }

  public getAllSole():Observable<any>{
    return this.http.get<any>(this.API_URL+"products/getAllSole");
  }

  public getAllSize():Observable<any>{
    return this.http.get<any>(this.API_URL+"products/getAllSize");
  }

  public getAllShoeLine():Observable<any>{
    return this.http.get<any>(this.API_URL+"products/getAllShoeLine");
  }

  findQuantity(search:FindQuantity): Observable<any>{
    return this.http.put<any>("http://localhost:8080/api/public/s_c_details/findQuantity",search) ;
  }

  findProductById(id:any):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/products/`+id);
  }

  findNewProductTop(top:any):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/products/top/`+top);
  }

  findTopSelling():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/products/topbanchay`);
  }

  findHotTrend(idProduct: any):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}public/products/hotTrend/`+ idProduct);
  }

  sizeAvailable(idProduct:any): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/public/s_c_details/sizeAvailable/`+idProduct) ;
  }

  colorAvailable(idProduct:any): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/public/s_c_details/colorAvailable/`+idProduct) ;
  }


}
