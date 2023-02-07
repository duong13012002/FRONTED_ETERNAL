import {Injectable} from "@angular/core";
import jwt_decode from 'jwt-decode';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Account} from "../../@core/models/Account";

@Injectable({
  providedIn: 'root',
})

export class UserService{

  private apiServerUrl = environment.apiUrl;

  private readonly baseUrl = `${environment.apiUrl}auth/`;

  constructor(private http: HttpClient, private router: Router) {
  }

  getDecodedAccessToken(): any {
    const token = localStorage.getItem('auth-token');
    try {
      return jwt_decode(token!);
    } catch(Error) {
      return null;
    }
  }

  public login(LoginVM: any): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, LoginVM);
  }

  getAccountByUserName(userName:string):Observable<any>{
    return this.http.get<any>("http://localhost:8080/api/public/cart/byUserName/"+userName);
  }

  signUp(accountSignUp: Account):Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/public/account/signUp",accountSignUp);
  }
}
