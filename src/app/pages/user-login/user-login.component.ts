import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../share/service/UserService";
import {TokenStorageService} from "../../share/service/token-storage.service";
import {SessionService} from "../../share/service/session.service";
import {ToastrService} from "ngx-toastr";
import {CartService} from "../../share/service/cart.service";
import {Cart} from "../../@core/models/Cart";
import {toJSDate} from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  formLogin!: FormGroup;
  isSubmitted = false;
  isLoggedIn = false;
  loading = false;
  productAdd: Cart={};
  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private tokenService: TokenStorageService,
    private router: Router,
    private  userService: UserService,
    private sessionService: SessionService,
    private  toastr: ToastrService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    if(this.tokenService.getUser()!==null){
      this.tokenService.logout();
      this.toastr.success("Đăng  xuất thành công");
      this.ngOnInit();
    }
  }

  initForm() {
    this.formLogin = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
    });
  }

  onSubmit() {
    this.loading=true;
    this.isSubmitted = true;
    if (this.formLogin.valid) {
      this.userService.login(this.formLogin.value).subscribe(
        data => {
          this.isLoggedIn = true;
          this.tokenService.saveToken(data.token);
          const jwtDecode = this.userService.getDecodedAccessToken();
          this.tokenService.saveUser(jwtDecode.sub);
          // this.saveUserId();
          // let role = jwtDecode.auth.split(',')
          if (localStorage.getItem('auth-token')!= null && localStorage.getItem('auth-user')!=null) {
            this.loading =false;
            if(localStorage.getItem("cart")!=null){
              console.log(this.tokenService.getCart());
              this.productAdd =this.tokenService.getCart();
              this.productAdd.userName =this.tokenService.getUser();
              this.cartService.create(this.productAdd).subscribe(
                res =>{
                  this.toastr.success("Thêm vào giỏ hàng thành công")
                  localStorage.setItem('cart','');
                  this.router.navigate(['/cart']);
                },error => {
                  this.toastr.error("Thêm vào giỏ hàng thất bại");
                  this.router.navigate(['/pages']);
                  return;
                }
              )
            }else {
              this.toastr.success("Đăng nhập thành công")
              this.router.navigate(['/pages']);
              return;
            };
            this.router.navigate(['/cart']);
            return;
          }
          this.toastr.error("Đăng nhập thất bại")
          this.router.navigate(['/login']);

        },error => {
          this.loading=false;
          this.toastr.error("Đăng nhập thất bại");

        }
      );
    }
  }

}
