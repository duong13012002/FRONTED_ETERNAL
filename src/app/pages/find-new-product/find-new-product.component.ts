import { Component, OnInit } from '@angular/core';
import {Product} from "../../@core/models/Cart";
import {FormBuilder} from "@angular/forms";
import {ProductService} from "../../share/service/product.service";
import {CartService} from "../../share/service/cart.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../share/service/token-storage.service";

@Component({
  selector: 'app-find-new-product',
  templateUrl: './find-new-product.component.html',
  styleUrls: ['./find-new-product.component.css']
})
export class FindNewProductComponent implements OnInit {

   productList: Product[] =[];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private cartService: CartService,
    private modalService :NgbModal,
    private toastr :ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  infoProducts(id: any) {
    const url = "productDetails/" + id;
    this.router.navigate([url]);
  }

  getProduct(){
    this.productService.findNewProductTop(3).subscribe(
      res =>{
        this.productList = res
        console.log(this.productList)
      }
    )
  }
}
