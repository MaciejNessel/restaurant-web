export interface Dish {
  id?: string;
  name: string;
  cusine: string;
  categories: string[];
  price: string;
  ingredients: string[];
  max_orders: number;
  image_src: string;
  image_src_optional: string[];
  rate : number;
  rate_counter : number;
  description : string;
}
