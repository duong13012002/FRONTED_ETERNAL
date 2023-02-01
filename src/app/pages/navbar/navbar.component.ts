import { CartService } from './../../share/service/cart.service';
import { TokenStorageService } from './../../share/service/token-storage.service';
import { Cart } from './../../@core/models/Cart';
import { Component, OnInit } from '@angular/core';

import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  data: Cart[] = [];
  user!: any;

  constructor(
    private tokenService: TokenStorageService,
    private toastService: ToastrService,
    private cartService: CartService,
    private tokenStorageService: TokenStorageService
  ) { }
  ngOnInit(): void {
   this.getUserLogin();
    this.getItembyUser();
  }

  getUserLogin(){
    this.user =localStorage.getItem('auth-user');
  }
  logOut(){
    localStorage.clear();
    this.toastService.success("Đăng xuất thành công");
    this.ngOnInit();
  }
  getItembyUser() {
    if (this.tokenStorageService.getUser() !=null && this.tokenStorageService.getToken()!=null) {
      this.cartService.findAllByUserName(this.tokenStorageService.getUser()).subscribe(
        res => {
          this.data = res.object;
        }
      )
    }
  }

}
