export type CartItem = {
  id: number;
  quantity: number;
};

export type Cart = readonly CartItem[];

export type CartLine = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  lineTotal: number;
};

export type CartAction = "increase" | "decrease" | "remove";
