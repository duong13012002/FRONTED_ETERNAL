import { Component, OnInit } from '@angular/core';
import {Cart} from "../../@core/models/Cart";
import {AddressTemp, CustomersAddress, CustommerInfo} from "../../@core/models/CustommIn4";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../share/service/cart.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenStorageService} from "../../share/service/token-storage.service";
import {ToastrService} from "ngx-toastr";
import {CustommerInfoService} from "../../share/service/custommerInfo.service";
import Swal from "sweetalert2";
import {Order, OrderDetails} from "../../@core/models/Order";
import {OrderDetailService} from "../../share/service/order-detail.service";
import {ProductService} from "../../share/service/product.service";
import {FindQuantity} from "../../@core/models/FindQuantity";
import {toJSDate} from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar";
import loader from "@angular-devkit/build-angular/src/webpack/plugins/single-test-transform";
import {Address} from "../bill/bill.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {
  formAddress!: FormGroup;
  dataOrderDetails!: OrderDetails[];
  dataOrderDetailsTemp!: OrderDetails[];
  dataOrder: Order ={};
  grandTotal!: number;
  dataCusI4: CustomersAddress[] = [];
  formHuy!: FormGroup;
  loading!: boolean;
  hidden!: boolean;
  message!: String;
  customemerInfo: CustomersAddress = {};
  custommerToanCuc: CustomersAddress = {};
  user!: any;
  custommerId:any;
  customerConfirm: CustommerInfo = {};
  trangthai!: number;
  addresses: CustomersAddress[] = [];
  findQuantity: FindQuantity ={};
  quantity!: any;
  baseUrl = 'https://provinces.open-api.vn/api';
  provinces: Address[] = [];
  districts: Address[] = [];
  warts: Address[] = [];
  provinceSelected: any;
  provinceTemp: AddressTemp ={};
  districtTemp: AddressTemp={};
  wartTemp: AddressTemp={};
  shippingFee!: number;

  constructor(private cartService: CartService,
              private fb: FormBuilder,
              private router: Router,
              private modalService: NgbModal,
              private tokenStorageService: TokenStorageService,
              private toastr: ToastrService,
              private custommerService: CustommerInfoService,
              private tokenService: TokenStorageService,
              private orderDetailService: OrderDetailService,
              private activceRoute: ActivatedRoute,
              private productService: ProductService,
              private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.movingOrder();
    this.initFormHuy();
    this.initFormAddress();
    this.loading = false;
    this.hidden = false;
    this.getUserLogin();
    this.findCustommerByUserName();
    this.findCustommerDefault();
    this.getcity();
    this.message = "Thêm mới ";
  }

  movingOrder() {
    this.activceRoute.paramMap.subscribe(
      params => {
        const idOrder = params.get('id');
        if (idOrder) {
          this.orderDetailService.chiTiet(idOrder).subscribe(
            res => {
              this.dataOrderDetails = res.object;
              this.dataOrderDetailsTemp = res.object;
              this.getTotalPrice();
            }
          )

          this.orderDetailService.getOrderById(idOrder).subscribe(
            res => {
              this.dataOrder = res;
              this.customerConfirm = res.diaChi;
              this.getFeeShip(res.diaChi);
              this.trangthai = res.status;
            }
          )
        }
      }
    )
  }

  initFormAddress() {
    this.formAddress = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      sdt: ['', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]],
      city: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      detailAddress: ['', Validators.required],
      address:'',
    })
  }


  getcity(){
    this.http.get(`${this.baseUrl}/p`).subscribe((res: any) => {
      this.provinces = res.map((r: any) => ({code: r.code, name: r.name}));
    });
  }

  getUserLogin() {
    this.user = localStorage.getItem('auth-user');
  }

  findCustommerDefault() {
    this.custommerService.findCustommerDefault(this.tokenService.getUser()).subscribe(
      res => {
        this.custommerToanCuc = res;
      }
    )
  }


  initFormHuy() {
    this.formHuy = this.fb.group({
      lido: ['', [Validators.required]]
    });
  }

  getTotalPrice() {
    this.grandTotal = 0;
    this.dataOrderDetails.map((a: OrderDetails) => {
      console.log(a.product?.outputprice, a.quantity)
      this.grandTotal += (a.product?.outputprice! * a.quantity!);
      console.log(this.grandTotal)
    })
  }


  create(content : any) {
    this.addValueFormAddress();
    console.log(this.customemerInfo.id);
    this.custommerService.create(this.tokenService.getUser(), this.customemerInfo).subscribe(
      res => {
        this.toastr.success(res.message);
        this.ngOnInit();
        this.customemerInfo = {};
        this.message = "Thêm mới";
        this.modalService.dismissAll();
        this.findCustommerByUserName();
        this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
      }, error => {
        this.toastr.error(error.error.message);
      }
    )
    this.hidden = true;
  }

  addValueFormAddress() {
    this.customemerInfo.name = this.formAddress.value.name;
    this.customemerInfo.sdt = this.formAddress.value.sdt;
    let cityId = this.formAddress.value.city;
    // @ts-ignore
    this.provinceTemp = this.provinces.find(city => {
      return city.code == cityId;
    });
    this.customemerInfo.city = this.provinceTemp.code
    this.customemerInfo.nameCity = this.provinceTemp.name
    let districtId = this.formAddress.value.district;
    // @ts-ignore
    this.districtTemp = this.districts.find(district => {
      return district.code == districtId;
    });
    this.customemerInfo.district = this.districtTemp.code
    this.customemerInfo.nameDistrict = this.districtTemp.name
    let wardId = this.formAddress.value.ward;
    // @ts-ignore
    this.wartTemp = this.warts.find(ward => {
      return ward.code == wardId;
    });
    this.customemerInfo.ward = this.wartTemp.code;
    this.customemerInfo.detailAddress = this.formAddress.value.detailAddress;
    this.customemerInfo.address = this.customemerInfo.detailAddress + "-" + this.wartTemp.name+ "-" + this.districtTemp.name+ "-" + this.provinceTemp.name
  }

  openLg(content:any) {
    this.modalService.dismissAll();
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
    console.log(this.custommerId)
  }

  checkout() {
    Swal.fire({
      title: 'Xác nhận cập nhật?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.orderDetailService.updateOrder(this.dataOrder.id, this.customerConfirm.id).subscribe(
          res => {
           this.toastr.success("Cập nhật đơn hàng thành công")
            this.router.navigate(['/order-detail'])
          }, error => {
            this.toastr.error(error.error.message)
          }
        )
      } else if (result.isDenied) {
        Swal.close();
      }
    })
  }

   findCustommerByUserName(){
    this.custommerService.findCustommerByUserName(this.tokenService.getUser()).subscribe(
      res => {
        this.dataCusI4 = res;
      }
    )
  }

  custommer(value:any){
    this.custommerId = value;
    console.log(this.custommerId)
  }
  xacnhan(){
    // this.hienthi=1;
    this.custommerService.findCustommerById(this.custommerId).subscribe(
      res =>{
        this.customerConfirm = res;
        this.getFeeShip(res);
        this.toastr.success("Thay đổi địa chỉ thành công");
        this.modalService.dismissAll();
      }
    )
  }

  capnhat(content:any,id:any){
    this.modalService.dismissAll();
    this.message = "Cập nhật"
    this.custommerService.findCustommerById(id).subscribe(
      (res) => {
        this.customemerInfo = res;
        this.changeProvince1(this.customemerInfo.city);
        this.changeDistrict1(this.customemerInfo.district);
        this.fillValueForm();
      }
    )
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
  }

  huydon(content:any){
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
  }

  xacNhanHuyDon(){
    this.orderDetailService.huydon(this.dataOrder.id,this.formHuy.value.lido).subscribe(
      res =>{
        this.modalService.dismissAll();
        this.toastr.success(res.message)
        this.router.navigate(['/order-detail'])
      },error => {
        this.toastr.error("Hủy đơn thất bại")
      }
    );
  }

  removeItem(id: any) {
    console.log(this.dataOrderDetailsTemp);
    Swal.fire({
      title: 'Bạn muốn xóa sản phẩm khỏi đơn hàng?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if(this.dataOrderDetailsTemp.length <= 1){
          this.toastr.error("Số lượng sản phẩm trong đơn hàng phải lớn hơn 0!")
        } else if(this.dataOrderDetailsTemp.length > 1){
       this.dataOrderDetailsTemp = this.dataOrderDetails.filter(data => {
        return data.id !== id;
       })
       }
      } else if (result.isDenied) {
        Swal.close();
      }
    })
  }

  changeQuantity(quantityInput: any, item: OrderDetails){
    this.findQuantity.product = item.saimau?.product;
    this.findQuantity.size = item.saimau?.size;
    this.findQuantity.mau = item.saimau?.mau;
    this.productService.findQuantity(this.findQuantity).subscribe(
      (res) => {
        this.quantity = res.object;
      }, error => {
        console.log(error.error.message)
      }
    );
    if(quantityInput <= 0) {
      this.toastr.error("Số lượng sản phẩm phải hơn 0");
      item.quantity = this.quantity;
    } else if(quantityInput > this.quantity) {
      this.toastr.error("Số lượng sản phẩm trong kho không đủ");
      item.quantity = this.quantity;
    } else if(quantityInput <=  this.quantity) {
      item.quantity = this.quantity;
    }
  }

  fillValueForm() {
    this.formAddress.patchValue({
      name: this.customemerInfo.name,
      sdt: this.customemerInfo.sdt,
      city: this.customemerInfo.city,
      district: this.customemerInfo.district,
      ward: this.customemerInfo.ward,
      detailAddress: this.customemerInfo.detailAddress,
    })
  }

  changeProvince1(provinceSelected1: any) {
    this.provinceSelected = provinceSelected1;
    console.log(provinceSelected1);
    this.districts = [];
    this.warts = [];
    if (provinceSelected1) {
      this.http
        .get(`${this.baseUrl}/d/search/?p=${provinceSelected1}&q=*`)
        .subscribe((res: any) => {
          this.districts = res.map((r: any) => ({
            code: r.code,
            name: r.name,
          }));
        });
    }
  }

  changeDistrict1(districtSelected1: any) {
    this.warts = [];
    if (districtSelected1 && this.provinceSelected) {
      this.http
        .get(
          `${this.baseUrl}/w/search/?d=${districtSelected1}&p=${this.provinceSelected}&q=*`
        )
        .subscribe((res: any) => {
          this.warts = res.map((r: any) => ({code: r.code, name: r.name}));
        });
    }
  }

  addAddress(content: any) {
    this.addValueFormAddress();
    this.custommerService.createCustomerInfo(this.tokenService.getUser(),this.customemerInfo).subscribe(
      res => {
        this.toastr.success(res.message);
        this.ngOnInit();
        this.customemerInfo = {};
        this.message = "Thêm mới";
        this.modalService.dismissAll();
        this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
      },error => {
        this.toastr.error(error.error.message)
      }
    );
    this.hidden = true;
  };

  getFeeShip(addResscustommerdefault: any) {
    console.log(addResscustommerdefault);
    this.cartService
      .getFeeShip(
        addResscustommerdefault.address,addResscustommerdefault.nameCity,addResscustommerdefault.nameDistrict
      )
      .subscribe((res) => {
        this.shippingFee = res;
      },error => {
        this.toastr.error("Lỗi tính phí ship");
      });
  };



}
