export interface Account{
  id?:number;
  username?:string;
  email?:string;
  password?:string;
  fullname?:string;
  birthday?:Date;
  sdt?:string;
  city?: string;
  nameCity?: string;
  district?: string;
  nameDistrict?: string;
  ward?: string;
  detailAddress?: string;
  address?:string;
}
