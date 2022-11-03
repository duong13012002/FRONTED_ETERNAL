import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailService } from 'src/app/share/service/order-detail.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  public orderDetail : any[] = [];
  constructor(private orderdetail: OrderDetailService,private router: ActivatedRoute) { }

  ngOnInit(): void {
this.router.params.subscribe(params => {
      this.orderdetail.getOrderDetail(params['id']).subscribe((res:any)=>{
        this.orderDetail = res;
      })
    });


  }
}
