import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ProductDTO} from "../../@core/models/ProductSortDTO";
import {Observable} from "rxjs";
import {CustomersAddress, CustommerInfo} from "../../@core/models/CustommIn4";

@Injectable({
  providedIn: 'root'
})
export class CustommerInfoService{
  readonly APIUrl = "http://localhost:8080/api/public/cusI4/";

  constructor(private http: HttpClient) {
  }

  getPageCusI4(id:any,indexPage: any, size:any,dto:ProductDTO): Observable<any>{
    return this.http.put<any>(this.APIUrl +"findByKey?id="+id +"&page="+indexPage +"&size="+size,dto) ;
  }

  create(userName:any,custommerInfo:CustommerInfo): Observable<any>{
    return this.http.post<any>(this.APIUrl +userName,custommerInfo) ;
  }

  delete(id:any): Observable<any>{
    return this.http.get<any>(this.APIUrl +"delete/" +id) ;
  }

  findCustommerByUserName(userName:any): Observable<any>{
    return this.http.get<any>(this.APIUrl+"active/"+userName);
  }

  findCustommerDefault(userName:string):Observable<any>{
    return this.http.get<any>(this.APIUrl+"custommerDefault?userName="+userName);
  }

  findCustommerById(id:number):Observable<any>{
    return this.http.get<any>(this.APIUrl+"findById?id="+id);
  }

  createCustomerInfo(userName:any,custommerInfo:CustomersAddress): Observable<any>{
    return this.http.post<any>(this.APIUrl +userName,custommerInfo) ;
  }

}
