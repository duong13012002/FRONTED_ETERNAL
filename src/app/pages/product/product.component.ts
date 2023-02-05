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
import {Brand, Cart, Category, Product, ShoeLine, Sole} from "../../@core/models/Cart";
import {ProductDTO} from "../../@core/models/ProductSortDTO";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  formAdd!: FormGroup;
  formSearch!: FormGroup;
  dataSize: Size[] = [];
  dataColor: Color[] = [];
  dataCate!: Category[];
  dataBrand!: Brand[];
  dataSole!: Sole[];
  dataShoeLine!: ShoeLine[];
  product: Product ={};
  productDTO: ProductDTO = {};
  public productList: Product[] = [];
  message!: any;
  findQuantity :FindQuantity ={};
  productAdd: Cart={};
  indexPage = 0;
  Page: any;
  size = 5;


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
    this.productDTO.sortByValues = [];
    this.pagination();
    this.initFormAdd();
    this.initFormSearch();
    this.getAllBrand();
    this.getAllCategory();
    this.getAllSize();
    this.getAllColor();
    this.getAllSole();
    this.getAllShoeLine();
  }


  initFormSearch() {
    this.formSearch = this.fb.group({
      name: '',
      priceStart: '',
      priceEnd: '',
      category: '',
      hang: '',
      size:'',
      mau:'',
      sole:'',
      shoeLine:'',
    });
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

  getAllSole() {
    this.productService.getAllSole().subscribe(
      (res: any) => {
        this.dataSole = res;
      }
    )
  }

  getAllShoeLine() {
    this.productService.getAllShoeLine().subscribe(
      (res: any) => {
        this.dataShoeLine = res;
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


  fillValueSearch() {
    const formSearchValue = this.formSearch.value;
    this.productDTO.name = formSearchValue.name;
    this.productDTO.priceStart = formSearchValue.priceStart;
    this.productDTO.priceEnd = formSearchValue.priceEnd;
    let categoryId = formSearchValue.category;
    this.productDTO.category = this.dataCate.find(category => {
      return category.id == categoryId;
    });
    let brandId = formSearchValue.hang;
    this.productDTO.hang = this.dataBrand.find(brand => {
      return brand.id == brandId;
    });

    let soleId = formSearchValue.sole;
    this.productDTO.sole = this.dataSole.find(sole => {
      return sole.id == soleId;
    });

    let shoeLineId = formSearchValue.shoeLine;
    this.productDTO.shoeLine = this.dataShoeLine.find(shoeLine => {
      return shoeLine.id == shoeLineId;
    });


  }

  pagination() {
    this.indexPage = this.indexPage < 0 ? 0 : this.indexPage;
    this.productService.getPageProduct(this.indexPage, this.size, this.productDTO)
      .subscribe({
        next: res => {
          this.productList = res.object.content;
          this.Page = res.object;
        }, error: error => {
          this.toastr.error(error.error.message);
        }
      });
  }

  pageItem(value: string) {
    const valueNumber = parseInt(value);
    if (valueNumber > this.size) {
      let ratioSize = Math.ceil(valueNumber / this.size);
      this.indexPage = Math.floor(this.indexPage / ratioSize);
    }
    if (valueNumber < this.size) {
      let ratioSize = Math.floor(this.size / valueNumber);
      this.indexPage = Math.floor(this.indexPage * ratioSize);
    }
    this.size = valueNumber;
    this.pagination();
  }

  countStt(): number {
    let totalItemofPage = this.size * (this.indexPage + 1);
    let totalElements = this.Page["totalElements"];
    let endItem: number = totalItemofPage < totalElements ? totalItemofPage : totalElements;
    return endItem;
  }
  preNextPage(type: string) {
    type == 'pre' ? --this.indexPage
      : type == 'next' ? ++this.indexPage
        : type == 'end' ? this.indexPage = (this.Page['totalPages'] - 1) : this.indexPage = 0;
    this.pagination();

  }

  getAllCategory() {
    this.productService.getAllCate().subscribe(
      (res: any) => {
        this.dataCate = res;
        console.log(this.dataCate);
      }
    );
  }

  getAllBrand() {
    this.productService.getAllBrand().subscribe(
      (res: any) => {
        this.dataBrand = res;
      }
    );
  }

  onSubmitSearch() {
    this.fillValueSearch();
    console.log(this.productDTO)
    this.pagination();
  }

  infoProducts(id: any) {
    const url = "productDetails/" + id;
    this.router.navigate([url]);
  }


}
