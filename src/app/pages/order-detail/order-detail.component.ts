import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailService } from 'src/app/share/service/order-detail.service';
import {TokenStorageService} from "../../share/service/token-storage.service";
import {OrderDetails} from "../../@core/models/Order";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  public listOrdderDetails : OrderDetails[] = [];
  constructor(private orderDetailService: OrderDetailService,
              private router: ActivatedRoute,
              private tokenService:TokenStorageService) { }

  ngOnInit(): void {
    this.showHistory();
  }

  showHistory(){
    this.orderDetailService.getOrderDetail(this.tokenService.getUser()).subscribe(
      res =>{
        this.listOrdderDetails = res;
        console.log(this.listOrdderDetails)
      }
    )
  }
}
