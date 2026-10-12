export type SchoolDepartment = 
  | 'imrd' 
  | 'rcpacs' 
  | 'polytechnic' 
  | 'rcpit' 
  | 'generals';

export type ProductCategory = 
  | 't-shirts' 
  | 'uniforms' 
  | 'generals';

export interface ProductVariant {
  id: string;
  name: string;
  colorName?: string;
  colorHex?: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  title: string;
  shortTitle: string;
  school?: SchoolDepartment;
  schoolName?: string;
  category: ProductCategory;
  subCategory?: string; // e.g. "BCA Uniform", "MCA Uniform", "Department T-Shirt", "Lab Uniform", "Varsity Winter"
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  storeLocation: string; // e.g. "Aisle 1 · Apparel Rack A"
  stockCount: number;
  description: string;
  specs: { label: string; value: string }[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  isUniformApproved?: boolean;
  departmentSlogan?: string;
}

export interface CartItem {
  id: string; // unique cart entry id
  productId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  customization?: {
    customText?: string;
    gradYear?: string;
  };
  storeLocation: string;
}

export interface PickupOrder {
  orderNumber: string;
  timestamp: string;
  customerName: string;
  studentId: string;
  phoneNumber: string;
  pickupLocation: string;
  pickupTimeSlot: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  pickupCode: string;
  status: 'Ready for Pickup' | 'Processing at Desk' | 'Completed';
  createdAt: string;
}

export interface RegisteredStudent {
  studentId: string;
  name: string;
  phoneNumber: string;
  registeredDate: string;
  ordersCount: number;
  totalSpent: number;
  department?: string;
}
