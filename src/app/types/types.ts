export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  size: string;
  brand: string;
  category: string;
  images: string[];
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type OrderItem = {
  product: string;
  name: string;
  quantity: number;
  price: number;
};

type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type Order = {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  totalItems: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
  paymentMethod: string;
  status: string;
  selectedAddress: Address;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  address: Address;
  orders: Order[];
  createdAt: string;
  updatedAt: string;
};

export type Brand = {
  id: string;
  label: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiErrorResponse = {
  message?: string;
  type?: string;
  details?: Record<string, unknown>;
};

export type UserProfile = {
  id?: string;
  name: string;
  email: string;
  password: Buffer;
  role: string;
  image?: string;
  address: Address;
  orders: Array<Order>; // This assumes ObjectId of Order is stored as a string, but it can also be typed as ObjectId if needed
  salt: Buffer;
  createdAt: Date;
  updatedAt: Date;
};
