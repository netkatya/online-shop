export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export type Order = {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: "paid" | "shipped" | "delivered" | "cancelled";
  paymentDate: string;
};
