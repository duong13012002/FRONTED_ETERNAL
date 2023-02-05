import { Component, OnInit } from '@angular/core';
import {Account} from "../../@core/models/Account";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../share/service/token-storage.service";
import {CartService} from "../../share/service/cart.service";
import {UserService} from "../../share/service/UserService";

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css']
})
export class PersonalPageComponent implements OnInit {

  account!: Account;
  formValue!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService,
    private accountService: UserService
  ) { }

  ngOnInit(): void {
    this.accountService.getAccountByUserName(this.tokenStorageService.getUser()).subscribe(
      res => {
        this.account = res;
      }
    )
  }

  initForm(){

  }

  fillValueForm(){
   this.formValue.patchValue({

   })
  }


}
