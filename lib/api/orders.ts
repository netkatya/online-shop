import { Order, OrderItem } from "@/types/orders";
import { nextServer } from "./api";

export const createOrderNext = async (
  items: OrderItem[],
  totalPrice: number
): Promise<Order> => {
  const res = await nextServer.post("/orders", { items, totalPrice });
  return res.data.order;
};

export const getMyOrdersNext = async (): Promise<Order[]> => {
  const res = await nextServer.get("/orders/my");
  return res.data;
};
