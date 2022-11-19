import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie";
import {UserService} from "./UserService";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor(
    private cookie: CookieService,
    private userService: UserService,
  ) {
  }

  getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  }
  getUserLogin(){
    const jwt = this.getToken();
    const decodeJwt =  jwtDecode(jwt!);
    return JSON.parse(JSON.stringify(decodeJwt));
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  removeToken() {
    this.cookie.remove(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    const data = this.userService.getDecodedAccessToken();
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return user;
  }

  public getCart(): any {
    const cart = localStorage.getItem(CART_KEY);
    if (cart) {
      return JSON.parse(cart);
    }

    return cart;
  }


}

