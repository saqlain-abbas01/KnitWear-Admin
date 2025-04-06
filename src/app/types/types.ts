export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: string[];
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
type OrderItem = {
  [key: string]: unknown; // Replace with exact fields if known
};

type Address = {
  [key: string]: unknown; // Replace with actual address shape if available
};
export type Order = {
  id: string;
  items: OrderItem[];
  totalAmount?: number;
  totalItems?: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
  paymentMethod: string;
  status?: string;
  selectedAddress: Address[];
  createdAt: string;
  updatedAt: string;
};
