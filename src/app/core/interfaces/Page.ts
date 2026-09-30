// Spring Data Page<T> JSON shape
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // current page (0-based)
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface PageParams {
  page?: number;
  size?: number;
  sort?: string; // e.g. 'pricePerUnit,asc'
}