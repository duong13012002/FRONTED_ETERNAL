import { Component, OnInit } from '@angular/core';
import {Cart, Product} from "../../@core/models/Cart";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FindQuantity} from "../../@core/models/FindQuantity";
import {Size} from "../../@core/models/Size";
import {Color} from "../../@core/models/Color";
import {ProductService} from "../../share/service/product.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../share/service/token-storage.service";
import {CartService} from "../../share/service/cart.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  item!:Product;
  formAdd!:FormGroup;
  message!: any;
  findQuantity :FindQuantity ={};
  dataSize: Size[] = [];
  dataColor: Color[] = [];
  productAdd: Cart={};
  loading!:boolean;

  constructor(
    private fb:FormBuilder,
    private productService: ProductService,
    private toastr :ToastrService,
    private router: Router,
    private activceRoute: ActivatedRoute,
    private tokenService: TokenStorageService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.initFormAdd();
    this.movingProduct();
    this.getAllColor();
    this.getAllSize();
    this.loading= false;
  }

  movingProduct(){
    this.activceRoute.paramMap.subscribe(
      params => {
        const idProduct = params.get('id');
        if (idProduct) {
          this.productService.findProductById(idProduct).subscribe(
            res => {
              this.item = res;
            }
          )
        }
      }
    )
  }

  initFormAdd() {
    this.formAdd = this.fb.group({
      size: ['', Validators.required],
      mau: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('[0-9]{1,10}')]],
    })
  }

  changeSC(size:any,color:any){
    this.findQuantity.product =this.item;
    let sizeId = this.formAdd.value.size;
    this.findQuantity.size = this.dataSize.find(size => {
      return size.id == sizeId;
    });
    let colorID = this.formAdd.value.mau;
    this.findQuantity.mau = this.dataColor.find(mau => {
      return mau.id == colorID;
    });
    this.finQuantityBySC();
  }

  finQuantityBySC(){
    console.log(this.findQuantity);
    this.productService.findQuantity(this.findQuantity).subscribe(
      (res) => {
        this.message=res.object;
      }, error => {
        console.log(error.error.message)
      }
    );
  }

  checkChange(quantity:any){
    if(quantity <= this.message ){
      return true;
    }else {
      return false;
    }
  }


  checklogin(){
    this.addToCart();
    if(localStorage.getItem('auth-token')==null || localStorage.getItem('auth-user')==null){
      this.toastr.error("Bạn cần đăng nhập để sử dụng chức năng này")
      localStorage.setItem("cart",JSON.stringify(this.productAdd));
      this.router.navigate((['/login']));
    } else {
      console.log(this.productAdd);
      this.loading=true;
      this.cartService.create(this.productAdd).subscribe(
        res => {
          this.loading=false;
          this.toastr.success(res.message);
          const url = "cart/" + this.tokenService.getUser();
          this.router.navigate([url]);
        }
      );
    }
  }

  addToCart(){
    this.productAdd.product =this.item;
    let sizeId = this.formAdd.value.size;
    this.productAdd.size = this.dataSize.find(size => {
      return size.id == sizeId;
    });
    let colorID = this.formAdd.value.mau;
    this.productAdd.mau = this.dataColor.find(mau => {
      return mau.id == colorID;
    });

    this.productAdd.quantity = this.formAdd.value.quantity;
    this.productAdd.userName = this.tokenService.getUser();
  }

  getAllSize() {
    this.productService.getAllSize().subscribe(
      (res: any) => {
        this.dataSize = res
      }
    )
  }

  getAllColor() {
    this.productService.getAllColor().subscribe(
      (res: any) => {
        this.dataColor = res;
      }
    )
  }

  buyNow(){
    this.addToCart();
    if(localStorage.getItem('auth-token')==null || localStorage.getItem('auth-user')==null){
      this.toastr.error("Bạn cần đăng nhập để sử dụng chức năng này")
      localStorage.setItem("cart",JSON.stringify(this.productAdd));
      this.router.navigate((['/login']));
    } else {
      localStorage.setItem("cart",JSON.stringify(this.productAdd));
      console.log(this.productAdd);
      this.router.navigate((['/buyNow']));
    }
  }



}