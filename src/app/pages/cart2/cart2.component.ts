import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public grandTotal !: number;
  constructor(private cartService : CartService,private router: Router) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe((res:any)=>{
        this.products = res;
        console.log('grandTotalbefore',this.grandTotal)
        this.grandTotal = this.cartService.getTotalPrice();
        console.log('grandTotalafter',this.grandTotal)

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
        this.cartService.getProducts().subscribe((res:any)=>{
          this.products = res;
          this.grandTotal = this.cartService.getTotalPrice();
        });
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
        this.cartService.getProducts().subscribe((res:any)=>{
          this.products = res;
          this.grandTotal = this.cartService.getTotalPrice();
        });
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
          // console.log('idOrder',this.idOrder)
          this.cartService.removeAllCart();
          this.router.navigate(['/order-detail/'+res.id]);
        });
        Swal.fire('Checkout Success!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}
