import { Component, OnInit } from '@angular/core';
import {BuyNow, Cart} from "../../@core/models/Cart";
import {CustommerInfo} from "../../@core/models/CustommIn4";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../share/service/cart.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenStorageService} from "../../share/service/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {CustommerInfoService} from "../../share/service/custommerInfo.service";
import Swal from "sweetalert2";
import {Account} from "../../@core/models/Account";

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {

  data! : Cart;
  grandTotal!:number;
  dataCusI4:CustommerInfo[]=[];
  formI4!:FormGroup;
  formAdd!:FormGroup;
  loading!:boolean;
  hidden!:boolean;
  message!: String;
  customemerInfo :CustommerInfo ={};
  user!:any;
  custommerdefault: CustommerInfo = {};
  accountLogin: Account = {};
  hienthi!: number;
  buyNow!: BuyNow;

  constructor(private cartService : CartService,
              private fb: FormBuilder,
              private router: Router,
              private modalService :NgbModal,
              private tokenStorageService: TokenStorageService,
              private toastr: ToastrService,
              private custommerService:CustommerInfoService,
              private tokenService: TokenStorageService,

  ) { }

  ngOnInit(): void {
    this.getItembyUser();
    this.initForI4();
    this.initFormAdd();
    this.loading=false;
    this.hidden=false;
    this.getUserLogin();
    this.findCustommerDefault()
    this.hienthi = 1;
  }
  getUserLogin(){
    this.user =localStorage.getItem('auth-user');
  }


  getItembyUser() {
    if (this.tokenStorageService.getUser() !=null && this.tokenStorageService.getToken()!=null) {
          this.data = this.tokenService.getCart();
        }
    }


  initFormAdd() {
    this.formAdd = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      sdt:  ['', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]],
      address: ['', Validators.required],
    })
  }

  initForI4() {
    this.formI4 = this.fb.group({
      cusI4: ['', Validators.required],
    })
  }


  create(){
    this.addValueFrom();
    console.log(this.customemerInfo.id);
    this.custommerService.create(this.tokenService.getUser(),this.customemerInfo).subscribe(
      res =>{
        this.toastr.success(res.message);
        this.ngOnInit();
        this.customemerInfo={};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error(error.error.message);
      }
    )
    this.hidden=false;
  }

  addValueFrom() {
    this.customemerInfo.name = this.formAdd.value.name;
    this.customemerInfo.sdt = this.formAdd.value.sdt;
    this.customemerInfo.address = this.formAdd.value.address;
  }

  openLg() {
    this.initFormAdd();
    this.hidden = true;
    this.hienthi==0;
  }

  checkout(){
    Swal.fire({
      title: 'Xác nhận đặt hàng?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log("aaaa")
        if (this.hienthi == 1) {
          this.addValueBuyNow();
          console.log("ddax baof")
          this.cartService.buyNow(this.tokenStorageService.getUser(),this.buyNow).subscribe(
            res => {
              this.toastr.success(res.message);
              this.router.navigate(['/order-detail'])
            }, error => {
              this.toastr.error(error.error.message)
            }
          )
        } else if (this.hienthi == 0) {
          this.addValueBuyNow();
          this.cartService.buyNow(this.tokenStorageService.getUser(),this.buyNow).subscribe(
            res => {
              this.toastr.success(res.message);
              this.router.navigate(['/order-detail'])
            }, error => {
              this.toastr.error(error.error.message)
            }
          )
        }
      } else if (result.isDenied) {
        Swal.close();
      }
    })
  }
  rollBack(){
    this.hidden=false;
  }


  changeQuantity(quantity: any,data:Cart){
    data.quantity= quantity;
    localStorage.setItem("cart",JSON.stringify(this.data));
    this.getItembyUser();
  }
  findCustommerDefault() {
    this.custommerService.findAccountLogin(this.tokenService.getUser()).subscribe(
      res => {
        this.accountLogin = res;
        this.addValueCustommerDefault();
      }
    )
  }

  addValueCustommerDefault() {
    this.custommerdefault.name = this.accountLogin.fullname;
    this.custommerdefault.sdt = this.accountLogin.sdt;
    this.custommerdefault.address = this.accountLogin.address;
  }

  addValueBuyNow(){
    this.buyNow.cart = this.data;
    if(this.hienthi==1){
      this.buyNow!.custommerInfo= this.custommerdefault;
    }else if(this.hienthi==0){
      this.addValueFrom();
      this.buyNow!.custommerInfo= this.customemerInfo
    }
  }
}
