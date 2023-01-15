import { Component, OnInit } from '@angular/core';
import {Cart} from "../../@core/models/Cart";
import {CustommerInfo} from "../../@core/models/CustommIn4";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../share/service/cart.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenStorageService} from "../../share/service/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {CustommerInfoService} from "../../share/service/custommerInfo.service";
import Swal from "sweetalert2";
import {Order, OrderDetails} from "../../@core/models/Order";

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {

  dataOrderDetails: OrderDetails[] = [];
  dataOrder: Order ={};
  grandTotal!: number;
  dataCusI4: CustommerInfo[] = [];
  formI4!: FormGroup;
  formAdd!: FormGroup;
  loading!: boolean;
  hidden!: boolean;
  message!: String;
  customemerInfo: CustommerInfo = {};
  user!: any;
  custommerdefault: CustommerInfo = {}
  custommerId:any;
  hienthi!:number;
  custommerToanCuc: CustommerInfo = {};


  constructor(private cartService: CartService,
              private fb: FormBuilder,
              private router: Router,
              private modalService: NgbModal,
              private tokenStorageService: TokenStorageService,
              private toastr: ToastrService,
              private custommerService: CustommerInfoService,
              private tokenService: TokenStorageService,
  ) {
  }

  ngOnInit(): void {
    this.getItembyUser();
    this.initFormAdd();
    this.loading = false;
    this.hidden = false;
    this.getUserLogin();
    this.findCustommerDefault()
    this.findCustommerByUserName();
    this.message = "Thêm mới ";
    this.hienthi=0;
  }

  getUserLogin() {
    this.user = localStorage.getItem('auth-user');
  }

  getItembyUser() {
    if (this.tokenStorageService.getUser() != null && this.tokenStorageService.getToken() != null) {
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
      sdt: ['', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]],
      address: ['', Validators.required],
    })
  }



  getTotalPrice() {
    this.grandTotal = 0;
    this.data.map((a: Cart) => {
      console.log(a.product?.outputprice, a.quantity)
      this.grandTotal += (a.product?.outputprice! * a.quantity!);
    })
  }


  create(content : any) {
    this.addValueFrom();
    console.log(this.customemerInfo.id);
    this.custommerService.create(this.tokenService.getUser(), this.customemerInfo).subscribe(
      res => {
        this.toastr.success(res.message);
        this.ngOnInit();
        this.customemerInfo = {};
        this.message = "Thêm mới";
        this.modalService.dismissAll();
        this.findCustommerByUserName();
        this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
        this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
      }, error => {
        this.toastr.error(error.error.message);
      }
    )
    this.hidden = true;
  }

  addValueFrom(){
    this.customemerInfo.name = this.formAdd.value.name;
    this.customemerInfo.sdt = this.formAdd.value.sdt;
    this.customemerInfo.address = this.formAdd.value.address;
  }

  openLg(content:any) {
    this.modalService.dismissAll();
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
    console.log(this.custommerId)
  }

  checkout() {
    Swal.fire({
      title: 'Xác nhận đặt hàng?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.cartService.checkOut(this.custommerId, this.tokenStorageService.getUser()).subscribe(
          res => {
            this.toastr.success(res.message)
            this.router.navigate(['/order-detail'])
          }, error => {
            this.toastr.error(error.error.message)
          }
        )
      } else if (result.isDenied) {
        Swal.close();
      }
    })
  }

  findCustommerDefault() {
    this.custommerService.findCustommerDefault(this.tokenService.getUser()).subscribe(
      res => {
        this.custommerdefault = res;
        this.custommerToanCuc = res;
        this.custommerId = this.custommerToanCuc.id;
      }
    )
  }

  findCustommerByUserName(){
    this.custommerService.findCustommerByUserName(this.tokenService.getUser()).subscribe(
      res => {
        this.dataCusI4 = res;
      }
    )
  }

  custommer(value:any){
    this.custommerId = value;
    console.log(this.custommerId)
  }
  xacnhan(){
    // this.hienthi=1;
    this.custommerService.findCustommerById(this.custommerId).subscribe(
      res =>{
        this.custommerdefault = res;
        if(this.custommerdefault.id == this.custommerToanCuc.id){
          this.hienthi=0;
        }else {
          this.hienthi =1;
        }
        this.toastr.success("Thay đổi địa chỉ thành công");
        this.modalService.dismissAll();
      }
    )
  }

  capnhat(content:any,id:any){
    this.modalService.dismissAll();
    this.message="Cập nhật"
    this.custommerService.findCustommerById(id).subscribe(
      (res) => {
        this.customemerInfo = res;
        console.log(this.customemerInfo)
        this.fillValueForm();
      }
    )
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
  }


  fillValueForm(){
    this.formAdd.patchValue({
      name: this.customemerInfo.name,
      sdt: this.customemerInfo.sdt,
      address: this.customemerInfo.address,
    })
  }



}
