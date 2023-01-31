import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Cart} from "../../@core/models/Cart";
import {AddressTemp, CustomersAddress, CustommerInfo} from "../../@core/models/CustommIn4";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartService} from "../../share/service/cart.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenStorageService} from "../../share/service/token-storage.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {CustommerInfoService} from "../../share/service/custommerInfo.service";
import {Account} from "../../@core/models/Account";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface Address {
  name: string;
  code: string;
}

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  data: Cart[] = [];
  grandTotal!: number;
  dataCusI4: CustommerInfo[] = [];
  formAddress!: FormGroup;
  loading!: boolean;
  hidden!: boolean;
  message!: String;
  customemerInfo: CustomersAddress = {};
  user!: any;
  custommerdefault: CustomersAddress = {}
  custommerId: any;
  hienthi!: number;
  custommerToanCuc: CustomersAddress = {};
  initAdress = {
    code: 0,
    name: '',
  };
  baseUrl = 'https://provinces.open-api.vn/api';
  provinces: Address[] = [];
  districts: Address[] = [];
  warts: Address[] = [];
  provinceSelected: any;
  provinceTemp: AddressTemp ={};
  districtTemp: AddressTemp={};
  wartTemp: AddressTemp={};



  constructor(private cartService: CartService,
              private fb: FormBuilder,
              private router: Router,
              private modalService: NgbModal,
              private tokenStorageService: TokenStorageService,
              private toastr: ToastrService,
              private custommerService: CustommerInfoService,
              private tokenService: TokenStorageService,
              private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.getItembyUser();
    this.initFormAddress();
    this.loading = false;
    this.hidden = false;
    this.getUserLogin();
    this.findCustommerDefault()
    this.findCustommerByUserName();
    this.message = "Thêm mới ";
    this.hienthi = 0;
    this.http.get(`${this.baseUrl}/p`).subscribe((res: any) => {
      this.provinces = res.map((r: any) => ({code: r.code, name: r.name}));
    });
  }

  getUserLogin() {
    this.user = localStorage.getItem('auth-user');
  }

  getItembyUser() {
    if (this.tokenStorageService.getUser() != null && this.tokenStorageService.getToken() != null) {
      this.cartService.findAllByUserName(this.tokenStorageService.getUser()).subscribe(
        res => {
          this.data = res.object;
          this.getTotalPrice();
        }
      )
    }
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

  getTotalPrice() {
    this.grandTotal = 0;
    this.data.map((a: Cart) => {
      console.log(a.product?.outputprice, a.quantity)
      this.grandTotal += (a.product?.outputprice! * a.quantity!);
    })
  }

  openLg(content: any) {
    this.modalService.dismissAll();
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
  }

  checkout() {
    Swal.fire({
      title: 'Xác nhận đặt hàng?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.cartService.checkOut(this.custommerId, this.tokenStorageService.getUser()).subscribe(
          res => {
            this.toastr.success(res.message)
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

  findCustommerDefault() {
    this.custommerService.findCustommerDefault(this.tokenService.getUser()).subscribe(
      res => {
        this.custommerdefault = res;
        this.custommerToanCuc = res;
        this.custommerId = this.custommerToanCuc.id;
      }
    )
  }

  findCustommerByUserName() {
    this.custommerService.findCustommerByUserName(this.tokenService.getUser()).subscribe(
      res => {
        this.dataCusI4 = res;
      }
    )
  }

  custommer(value: any) {
    this.custommerId = value;
    console.log(this.custommerId)
  }

  xacnhan() {
    // this.hienthi=1;
    this.custommerService.findCustommerById(this.custommerId).subscribe(
      res => {
        this.custommerdefault = res;
        if (this.custommerdefault.id == this.custommerToanCuc.id) {
          this.hienthi = 0;
        } else {
          this.hienthi = 1;
        }
        this.toastr.success("Thay đổi địa chỉ thành công");
        this.modalService.dismissAll();
      }
    )
  }

  capnhat(content: any, id: any) {
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

  showAddressDetail(content: any) {
    this.modalService.dismissAll();
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
  }

  changeProvince1(provinceSelected1: any) {
    this.provinceSelected = provinceSelected1;
    console.log(provinceSelected1)
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

  addValueFormAddress() {
    this.customemerInfo.name = this.formAddress.value.name;
    this.customemerInfo.sdt = this.formAddress.value.sdt;
    let cityId = this.formAddress.value.city;
    // @ts-ignore
    this.provinceTemp = this.provinces.find(city => {
      return city.code == cityId;
    });
    this.customemerInfo.city = this.provinceTemp.code
    let districtId = this.formAddress.value.district;
    // @ts-ignore
    this.districtTemp = this.districts.find(district => {
      return district.code == districtId;
    });
    this.customemerInfo.district = this.districtTemp.code
    let wardId = this.formAddress.value.ward;
    // @ts-ignore
    this.wartTemp = this.warts.find(ward => {
      return ward.code == wardId;
    });
    this.customemerInfo.ward = this.wartTemp.code;
    this.customemerInfo.detailAddress = this.formAddress.value.detailAddress;
    this.customemerInfo.address = this.customemerInfo.detailAddress + "-" + this.wartTemp.name+ "-" + this.districtTemp.name+ "-" + this.provinceTemp.name
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

}
