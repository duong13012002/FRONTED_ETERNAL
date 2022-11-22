import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UserService} from "./share/service/UserService";
import {TokenStorageService} from "./share/service/token-storage.service";
import {Router} from "@angular/router";
import {SessionService} from "./share/service/session.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eternal_01';
  user!: any;

  constructor(
    private tokenService: TokenStorageService,
    private toastService: ToastrService,
  ) { }
  ngOnInit(): void {
    this.getUserLogin();
  }

  getUserLogin(){
    this.user =localStorage.getItem('auth-user');
  }
  logOut(){
    localStorage.clear();
    this.toastService.success("Đăng xuất thành công");
    this.ngOnInit();
  }
}
