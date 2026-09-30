export enum CategoryType {
    FASHION_APPAREL,
    ELECTRONICS_TECHNOLOGY,
    HOME_LIVING,
    HEALTH_BEAUTY_PERSONAL_CARE,
    SPORTS_HOBBIES_LEISURE,
    ESSENTIALS_FOOD_GROCERY
}


export function formatCategory(category: unknown): string {
  return String(category)
    .toLowerCase()
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' & ');
}

export interface Product {
    productId : string;
    name:string;
    description: string;
    pricePerUnit: number;
    stock: number;
    categoryType: CategoryType;
    productImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    sellerId: string;
}

export interface Page<T> {
    content : T[];
    totalElements : number;
    totalPages : number;
    number : number;
    size : number;
    first : boolean;
    last : boolean;
}
