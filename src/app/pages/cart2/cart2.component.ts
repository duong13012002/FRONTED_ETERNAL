import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/share/service/cart.service';
import Swal from "sweetalert2";
import {OrderDetailService} from "../../share/service/order-detail.service";
import {TokenStorageService} from "../../share/service/token-storage.service";
import {Cart} from "../../@core/models/Cart";
import {ToastrService} from "ngx-toastr";
import {CustommerInfo} from "../../@core/models/CustommIn4";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-cart2',
  templateUrl: './cart2.component.html',
  styleUrls: ['./cart2.component.scss']
})
export class Cart2Component implements OnInit {
  data : Cart[]=[];
  grandTotal!:number;
  dataCusI4:CustommerInfo[]=[];
  formI4!:FormGroup;
  loading!:boolean;


  constructor(private cartService : CartService,
              private fb: FormBuilder,
              private router: Router,
              private modalService :NgbModal,
              private tokenStorageService: TokenStorageService,
              private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
 this.getItembyUser();
 this.initForI4();
 this.loading=false;
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


  removeItem(id:any){

    Swal.fire({
      title: 'Bạn muốn xóa sản phẩm khỏi giỏ hàng?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
     this.cartService.delete(id).subscribe(
       res => {
         this.toastr.success("Xóa thành công")
         this.ngOnInit();
       },error => {
         this.toastr.error("Xóa thất bại")
       }
     )
      } else if (result.isDenied) {
        Swal.close();
      }
    })
  }


  emptycart(){
    Swal.fire({
      title: 'Bạn muốn xóa giỏ hàng?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.cartService.deleteAll(this.tokenStorageService.getUser()).subscribe(
          res => {
            this.toastr.success(res.message)
            this.ngOnInit();
          },error => {
            this.toastr.error(error.error.message)
          }
        )
      } else if (result.isDenied) {
        Swal.close();
      }
    })
  }


  checkout(){
    this.router.navigate(['/order']);
  }

  getAllCusI4(){
    this.cartService.findAllCustommerIn4(this.tokenStorageService.getUser()).subscribe(
      res =>{
        this.dataCusI4 =res;

      }
    )
  }

  choiseIn4(){
    Swal.fire({
      title: 'Xác nhận đặt hàng?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

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

  create(){
    this.modalService.dismissAll();
    this.router.navigate(['/cusI4']);
  }

  changeQuantity(quantity: any,item:Cart){
    item.quantity= quantity;
    this.cartService.update(item).subscribe(
      res =>{
        this.getItembyUser();
      }
    )
  }
}
