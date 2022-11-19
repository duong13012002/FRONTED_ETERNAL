export interface ProductDTO {
  id?: number;
  name?: string;
  outputprice?: number,
  // status?:number;
  category?:Category;
  hang?:Brand;
  sortByValues?:SortByValue[]
}

export interface Category {
  id?:number;
  name?: string;
}

export interface Brand{
  id?:number;
  name?: string;
}

export interface SortByValue{
  name?:string,
  type?:string
}
