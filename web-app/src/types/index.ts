export type Product = {
  id: number;
  created_at?: string;
  title: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  features?: string[];
  stock?: number;
};

export type Order = {
  id: string; // UUID
  created_at?: string;
  user_email?: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address?: {
    full_name: string;
    address: string;
    city: string;
    phone: string;
  };
};

export type OrderItem = {
  id: number;
  order_id: string;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
};

export type CartItem = Product & {
  quantity: number;
};
