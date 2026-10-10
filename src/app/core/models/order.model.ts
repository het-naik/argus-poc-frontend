export type OrderStatus='PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED';
export type PaymentMethod='CASH' | 'CARD' | 'UPI' | 'NET_BANKING';
export type RoleType = 'ADMIN' | 'CUSTOMER' | 'SELLER'; 

export interface Order{
    orderId:string;
    customerId:string;
    customerUsername:string;
    orderItems:OrderItem[];
    status:OrderStatus;
    paymentMethod:PaymentMethod;
    addressId: string;   
}
export interface OrderItem{
    id:string;
    productId:string;
    productName:string;
    quantity:number;
    price:number;
}
export interface Product{
    id:string;
    name:string;
    description?:string;
    pricePerUnit:number;
    stock:number;
    category:string;
    imageUrl?:string;
}
export interface Address{
    addressId:string;
    customerId:string;
    fullAddress:string;
    city:string;
    state:string;
    zipCode:string;
}
export interface Cart {
  cartId: string;
  customerId: string;
  cartItems: CartItem[];
}
export interface CartItem{
    id:string;
    productId:number;
    productName:string;
    quantity:number;
    pricePerUnit:number;
    stock:number;
}
export interface AppUser {
  id: string; 
  username: string;
  email: string;
  role: RoleType;
  isActive: boolean;
  createdAt?: string; 
}
export function getTotal(order: Order ): number {
    return (order.orderItems ?? []).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }