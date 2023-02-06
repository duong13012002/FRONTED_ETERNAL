import { HttpClient } from '@angular/common/http';
import { Account } from './../../@core/models/Account';
import { AddressTemp } from './../../@core/models/CustommIn4';
import { Address } from './../bill/bill.component';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loading = false;
  formSignUp!: FormGroup;
  baseUrl = 'https://provinces.open-api.vn/api';
  provinces: Address[] = [];
  districts: Address[] = [];
  warts: Address[] = [];
  provinceSelected: any;
  provinceTemp: AddressTemp ={};
  districtTemp: AddressTemp={};
  wartTemp: AddressTemp={};
  account: Account ={};

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getcity();
  }

  getcity(){
    this.http.get(`${this.baseUrl}/p`).subscribe((res: any) => {
      this.provinces = res.map((r: any) => ({code: r.code, name: r.name}));
    });
  }
  initForm() {
    this.formSignUp = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      // repassword: ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      sdt: ['',[Validators.required, Validators.maxLength(10), Validators.pattern('(84|0|[3|5|7|8|9])+([0-9]{8})')]],
      fullname: ['', [Validators.required, Validators.maxLength(20)]],
      city: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      detailAddress: ['', Validators.required],
    });
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

  addValueForm() {
    this.account.fullname = this.formSignUp.value.fullname;
    this.account.sdt = this.formSignUp.value.sdt;
    this.account.password = this.formSignUp.value.password;
    let cityId = this.formSignUp.value.city;
    // @ts-ignore
    this.provinceTemp = this.provinces.find(city => {
      return city.code == cityId;
    });
    this.account.city = this.provinceTemp.code
    this.account.nameCity = this.provinceTemp.name
    let districtId = this.formSignUp.value.district;
    // @ts-ignore
    this.districtTemp = this.districts.find(district => {
      return district.code == districtId;
    });
    this.account.district = this.districtTemp.code
    this.account.nameDistrict = this.districtTemp.name
    let wardId = this.formSignUp.value.ward;
    // @ts-ignore
    this.wartTemp = this.warts.find(ward => {
      return ward.code == wardId;
    });
    this.account.ward = this.wartTemp.code;
    this.account.detailAddress = this.formSignUp.value.detailAddress;
    this.account.address = this.account.detailAddress + "-" + this.wartTemp.name+ "-" + this.districtTemp.name+ "-" + this.provinceTemp.name
  }

  signUp(){
    this.addValueForm();
    console.log(this.account);
  }


}
