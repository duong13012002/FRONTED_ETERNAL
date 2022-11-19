import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../share/service/product.service";
import {CartService} from "../../share/service/cart.service";
import Swal from 'sweetalert2'
import {Size} from "../../@core/models/Size";
import {Color} from "../../@core/models/Color";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FindQuantity, ProductAdd} from "../../@core/models/FindQuantity";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../share/service/token-storage.service";
import {Cart, Product} from "../../@core/models/Cart";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  formAdd!: FormGroup;
  dataSize: Size[] = [];
  dataColor: Color[] = [];
  product: Product ={};
  public productList: any = [];
  message!: any;
  findQuantity :FindQuantity ={};
  productAdd: Cart={};

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private cartService: CartService,
    private modalService :NgbModal,
    private toastr :ToastrService,
    private router: Router,
    private tokenService: TokenStorageService,
  ) {
  }

  ngOnInit(): void {
    this.prepareData()
    this.initFormAdd();
  }

  public prepareData(): void {
    this.getProduct()
  }

  initFormAdd() {
    this.formAdd = this.fb.group({
      size: ['', Validators.required],
      mau: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('[0-9]{1,10}')]],
    })
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

  getProduct(): any {
    this.productService.getProduct().subscribe((data: any) => {
      this.productList = data;

      this.productList.forEach((a: any) => {
        Object.assign(a, {quantity: 1, total: a.outputprice});
      });
    })
  }

  // addToCart(product: any) {
  //   this.cartService.addtoCart(product);
  //   Swal.fire('Add to card success');
  // }

  addToCart(){
    this.productAdd.product =this.product;
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

  choiseProduct(data: any, content: any) {
    this.product = data;
    this.message =null;
    this.initFormAdd();
    this.getAllColor();
    this.getAllSize();
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
  }

  changeSC(size:any,color:any){
    this.findQuantity.product =this.product;
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
   this.modalService.dismissAll();
   this.toastr.error("Bạn cần đăng nhập để sử dụng chức năng này")
   localStorage.setItem("cart",JSON.stringify(this.productAdd));
   this.router.navigate((['/login']));
 } else {
   console.log(this.productAdd);
   this.cartService.create(this.productAdd).subscribe(
     res => {
       this.toastr.success(res.message);
       const url = "cart/" + this.tokenService.getUser();
       this.router.navigate([url]);
     }
   );
   this.modalService.dismissAll();
 }
  }



}
