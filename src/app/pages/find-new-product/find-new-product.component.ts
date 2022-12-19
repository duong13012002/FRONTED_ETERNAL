import { Component, OnInit } from '@angular/core';
import {Product} from "../../@core/models/Cart";
import {FormBuilder} from "@angular/forms";
import {ProductService} from "../../share/service/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-find-new-product',
  templateUrl: './find-new-product.component.html',
  styleUrls: ['./find-new-product.component.css']
})
export class FindNewProductComponent implements OnInit {

   productList!: Product[];
   index: number =3;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
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
    this.productService.findNewProductTop(this.index).subscribe(
      res =>{
        this.productList = res
        console.log(this.productList)
      }
    )
  }

  pageItem(selectSize:any){
  this.index = selectSize;
    console.log('kk')
  this.getProduct();
  }
}
