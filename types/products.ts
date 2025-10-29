export interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
  category: string;
  description: string;
  quantity?: number;
}
