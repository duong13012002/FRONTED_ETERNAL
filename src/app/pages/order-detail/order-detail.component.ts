import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { OrderDetailService } from 'src/app/share/service/order-detail.service';
import {TokenStorageService} from "../../share/service/token-storage.service";
import {Order, OrderDetails} from "../../@core/models/Order";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  public listOrdderDetails! : Order[];
  listChiTiet:OrderDetails[]=[];
  id:any;
  formHuy!: FormGroup;
  hidden!:boolean;
  listChoXacNhan : Order[]=[];
  listDangGiao: Order[]=[];
  listHoanThanh: Order[] = [];
  listDaHuy : Order[]=[];



  constructor(private orderDetailService: OrderDetailService,
              private fb: FormBuilder,
              private tokenService:TokenStorageService,
              private router: Router,
              private modalServie:NgbModal,
              private toastService: ToastrService) { }

  ngOnInit(): void {
    this.showHistory();
    this.initFormHuy();
    this.hidden=true;
    this.choXacNhan();
    this.dangGiao();
    this.hoanThanh();
    this.daHuy();
  }

  initFormHuy() {
    this.formHuy = this.fb.group({
       lido: ['', [Validators.required]]
    });
  }

  showHistory(){
    this.orderDetailService.getOrderDetail(this.tokenService.getUser()).subscribe(
      res =>{
        this.listOrdderDetails = res.object;
        console.log(this.listOrdderDetails)
      }
    )
  }

  showChiTiet(){
    this.orderDetailService.chiTiet(this.id).subscribe(
       res =>{
         this.listChiTiet =res.object;
       }
    )
  }

  info(id:any){
    // this.hidden=true;
    // this.id=id;
    // this.showChiTiet();
    // const orderId = this.listOrdderDetails.find(value => {
    //   return value.id ==this.id;
    // })
    // if(orderId!.status==0){
    //   this.hidden=false;
    // }
    // this.modalServie.open(content, {size: 'lg', centered: true, scrollable: true});

    const url = "updateOder/" + id;
    this.router.navigate([url]);

  }

  huydon(conten1:any) {
    this.orderDetailService.huydon(this.id,this.formHuy.value.lido).subscribe(
      res =>{
        this.id=null;
        this.toastService.success(res.message);
        this.modalServie.dismissAll();
        this.initFormHuy();
        this.showHistory();
      },error => {
        this.toastService.error("Hủy đơn thất bại")
      }
    );
  }

  openlg(conten1:any){
    this.modalServie.dismissAll();
    this.modalServie.open(conten1, {size: 'lg', centered: true, scrollable: true});
  }

  choXacNhan(){
    this.orderDetailService.getOrderByStatus(this.tokenService.getUser(),0).subscribe(
      res =>{
        this.listChoXacNhan = res;
        console.log(this.listChoXacNhan);
      }
    )
  }

  dangGiao(){
    this.orderDetailService.getOrderByStatus(this.tokenService.getUser(),1).subscribe(
      res =>{
        this.listDangGiao = res;
        console.log(this.listChoXacNhan);
      }
    )
  }

  hoanThanh(){
    this.orderDetailService.getOrderByStatus(this.tokenService.getUser(),2).subscribe(
      res =>{
        this.listHoanThanh = res;
        console.log(this.listChoXacNhan);
      }
    )
  }


  daHuy(){
    this.orderDetailService.getOrderByStatus(this.tokenService.getUser(),4).subscribe(
      res =>{
        this.listDaHuy = res;
        console.log(this.listChoXacNhan);
      }
    )
  }



}
