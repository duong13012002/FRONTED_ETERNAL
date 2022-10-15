import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ProductService} from "../../share/service/product.service";
import {CartService} from "../../share/service/cart.service";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productList: any = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.prepareData()
  }

  public prepareData(): void {
    this.getProduct()
  }

  getProduct() : any {
    this.productService.getProduct().subscribe((data: any) => {
      this.productList = data;

      this.productList.forEach((a: any) => {
        Object.assign(a, {quantity: 1, total: a.outputprice});
      });
    })
  }
  addToCart(product: any) {
    this.cartService.addtoCart(product);
    Swal.fire('Add to card success');
  }

}
