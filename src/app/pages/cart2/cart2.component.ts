import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/share/service/cart.service';
import Swal from "sweetalert2";
import {OrderDetailService} from "../../share/service/order-detail.service";
@Component({
  selector: 'app-cart2',
  templateUrl: './cart2.component.html',
  styleUrls: ['./cart2.component.scss']
})
export class Cart2Component implements OnInit {

  public products : any = [];
  public orderDetail : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService,private orderdetail: OrderDetailService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res=>{
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      })
  }
  removeItem(item: any){
    Swal.fire({
      title: 'Do you want to delete?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Delete!', '', 'success')
        this.cartService.removeCartItem(item);
      } else if (result.isDenied) {
        Swal.fire('Delete are not saved', '', 'info')
      }
    })
  }
  emptycart(){
    Swal.fire({
      title: 'Do you want to delete?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Delete!', '', 'success')
        this.cartService.removeAllCart();
      } else if (result.isDenied) {
        Swal.fire('Delete are not saved', '', 'info')
      }
    })
  }

  checkout() {
    Swal.fire({
      title: 'Do you want to checkout?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.cartService.addOrder().subscribe((res: any) => {
          this.orderdetail.getOrderDetail(res.id).subscribe((data: any) => {
            this.orderDetail = data;
          });
          this.cartService.removeAllCart();
        });
        Swal.fire('Checkout Success!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
