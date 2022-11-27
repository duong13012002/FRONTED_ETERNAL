import { Component, OnInit } from '@angular/core';
import {Cart} from "../../@core/models/Cart";
import {CustommerInfo} from "../../@core/models/CustommIn4";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../share/service/cart.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenStorageService} from "../../share/service/token-storage.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {CustommerInfoService} from "../../share/service/custommerInfo.service";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  data : Cart[]=[];
  grandTotal!:number;
  dataCusI4:CustommerInfo[]=[];
  formI4!:FormGroup;
  formAdd!:FormGroup;
  loading!:boolean;
  hidden!:boolean;
  message!: String;
  customemerInfo :CustommerInfo ={};
  user!:any;


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
    this.getAllCusI4();
    this.hidden=false;
    this.getUserLogin();
  }
  getUserLogin(){
    this.user =localStorage.getItem('auth-user');
  }
  getItembyUser() {
    if (this.tokenStorageService.getUser() !=null && this.tokenStorageService.getToken()!=null) {
      this.cartService.findAllByUserName(this.tokenStorageService.getUser()).subscribe(
        res => {
          this.data = res.object;
          this.getTotalPrice();
        }
      )
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


  getTotalPrice() {
    this.grandTotal = 0;
    this.data.map((a: Cart) => {
      console.log(a.product?.outputprice,a.quantity)
      this.grandTotal += (a.product?.outputprice! * a.quantity!);
    })
  }

  getAllCusI4(){
    this.cartService.findAllCustommerIn4(this.tokenStorageService.getUser()).subscribe(
      res =>{
        this.dataCusI4 =res;

      }
    )
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
    this.customemerInfo={};
    this.initFormAdd();
    this.hidden = true;
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
        console.log(this.formI4.value.cusI4)
        this.cartService.checkOut(this.formI4.value.cusI4,this.tokenStorageService.getUser()).subscribe(
          res =>{
            this.toastr.success(res.message)
            this.modalService.dismissAll();
            this.router.navigate(['/order-detail'])
          },error => {
            this.toastr.error(error.error.message)
          }
        )

      } else if (result.isDenied) {
        Swal.close();
      }
    })
  }

  rollBack(){
    this.hidden=false;
  }
}
