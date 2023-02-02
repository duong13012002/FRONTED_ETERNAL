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
  productTop!: any;
   index: number =5;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getNewProduct();
    this.getTopSellingProduct();
  }

  infoProducts(id: any) {
    console.log(id);
    const url = "productDetails/" + id;
    this.router.navigate([url]);
  }

  getNewProduct(){
    this.productService.findNewProductTop(this.index).subscribe(
      res =>{
        this.productList = res
        console.log(this.productList)
      }
    )
  }

  getTopSellingProduct(){
    this.productService.findTopSelling().subscribe(
      res =>{
        this.productTop = res
        console.log(this.productTop)
      }
    )
  }

  pageItem(selectSize:any){
  this.index = selectSize;
  this.getNewProduct();
  }
}
