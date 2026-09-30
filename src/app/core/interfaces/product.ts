export enum CategoryType {
  FASHION_APPAREL = 'FASHION_APPAREL',
  ELECTRONICS_TECHNOLOGY = 'ELECTRONICS_TECHNOLOGY',
  HOME_LIVING = 'HOME_LIVING',
  HEALTH_BEAUTY_PERSONAL_CARE = 'HEALTH_BEAUTY_PERSONAL_CARE',
  SPORTS_HOBBIES_LEISURE = 'SPORTS_HOBBIES_LEISURE',
  ESSENTIALS_FOOD_GROCERY = 'ESSENTIALS_FOOD_GROCERY',
}

export const CATEGORY_LABELS: Record<CategoryType, string> = {
  FASHION_APPAREL: 'Fashion & Apparel',
  ELECTRONICS_TECHNOLOGY: 'Electronics & Technology',
  HOME_LIVING: 'Home & Living',
  HEALTH_BEAUTY_PERSONAL_CARE: 'Health, Beauty & Personal Care',
  SPORTS_HOBBIES_LEISURE: 'Sports, Hobbies & Leisure',
  ESSENTIALS_FOOD_GROCERY: 'Essentials, Food & Grocery',
};

export function formatCategory(category: CategoryType | string): string {
  return CATEGORY_LABELS[category as CategoryType] ?? String(category);
}

export interface Product {
  productId: string;
  name: string;
  description: string;
  pricePerUnit: number;
  stock: number;
  categoryType: CategoryType;
  productImageUrl: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  sellerId: string;
}


export interface ProductRequest {
  name: string;
  description?: string;
  pricePerUnit: number;
  stock: number;
  categoryType: CategoryType;
  sellerId: string;
  productImageUrl?: string;
}