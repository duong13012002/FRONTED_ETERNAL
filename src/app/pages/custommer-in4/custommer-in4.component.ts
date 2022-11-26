import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustommerInfo} from "../../@core/models/CustommIn4";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustommerInfoService} from "../../share/service/custommerInfo.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {TokenStorageService} from "../../share/service/token-storage.service";

@Component({
  selector: 'app-custommer-in4',
  templateUrl: './custommer-in4.component.html',
  styleUrls: ['./custommer-in4.component.css']
})
export class CustommerIn4Component implements OnInit {
  formAdd!: FormGroup;
  formSearch!: FormGroup;
  dataCusIn4!: CustommerInfo[];
  indexPage = 0;
  Page: any;
  size = 2;
  search : CustommerInfo ={};
  customemerInfo :CustommerInfo ={};
  message!: String;
  hidden!: boolean;
  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private custommerService:CustommerInfoService,
    private tokenService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.initFormSearch();
    this.initFormAdd();
    this.pagination();
    console.log(this.tokenService.getUser())
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      name: '',
      sdt: '',
      address: '',
    });
  }

  initFormAdd() {
    this.formAdd = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      sdt:  ['', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]],
      address: ['', Validators.required],
    })
  }

  openLg(content: any) {
    this.customemerInfo={};
    this.message="Thêm mới";
    this.initFormAdd();
    this.hidden = true;+
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
  }

  preNextPage(type: string) {
    type == 'pre' ? --this.indexPage
      : type == 'next' ? ++this.indexPage
        : type == 'end' ? this.indexPage = (this.Page['totalPages'] - 1) : this.indexPage = 0;
    this.pagination();

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


  pagination() {
    this.indexPage = this.indexPage < 0 ? 0 : this.indexPage;
    this.custommerService.getPageCusI4(this.tokenService.getUser(),this.indexPage,this.size,this.search).subscribe(
      res => {
      this.Page = res.object;
      this.dataCusIn4 = res.object.content;
      console.log(this.dataCusIn4);
    },error => {  this.toastr.error(error.error.message);})

  }

  countStt(): number {
    let totalItemofPage = this.size * (this.indexPage + 1);
    let totalElements = this.Page["totalElements"];
    let endItem: number = totalItemofPage < totalElements ? totalItemofPage : totalElements;
    return endItem;
  }

  info(id:any,content:any){
    console.log(this.message)
    this.openLg(content);
    this.message ="Cập nhật ";
    this.hidden=false;
    const CusI4 = this.dataCusIn4.find(value => {
      return value.id ==id
    })
    if(CusI4){
      this.customemerInfo = CusI4;
    }
    this.fillValueForm();
  }

  fillValueForm(){
    this.formAdd.patchValue({
      name: this.customemerInfo.name,
      sdt: this.customemerInfo.sdt,
      address: this.customemerInfo.address,
    })
  }

  fillValueSearch() {
    const formSearchValue = this.formSearch.value;
    this.search.name = formSearchValue.name;
    this.search.sdt = formSearchValue.sdt;
    this.search.address = formSearchValue.address;
  }

  addValueFrom() {
    this.customemerInfo.name = this.formAdd.value.name;
    this.customemerInfo.sdt = this.formAdd.value.sdt;
    this.customemerInfo.address = this.formAdd.value.address;
  }

  create(){
    this.addValueFrom();
    console.log(this.customemerInfo.id);
    this.custommerService.create(this.tokenService.getUser(),this.customemerInfo).subscribe(
      res =>{
        this.toastr.success(res.message);
        this.ngOnInit();
        this.customemerInfo={};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error(error.error.message);
      }
    )
    this.router.navigate(['/cart']);
  }

  onSubmitSearch(){
    this.fillValueSearch();
    this.pagination();
    this.initFormSearch();
  }

  delete(){
    this.custommerService.delete(this.customemerInfo.id).subscribe(
      res =>{
        this.toastr.success(res.message);
        this.ngOnInit();
        this.customemerInfo={};
        this.modalService.dismissAll();
      }, error => {
        this.toastr.error(error.error.message);
      }
    );
  }

}
