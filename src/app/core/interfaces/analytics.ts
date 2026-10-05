import { CategoryType, Product } from "./product"

export type TotalSalesResponse = Record<string, number>

export type SalesByCategoryResponse = Partial<Record<CategoryType, number>>

export type TopProductsByCategoryResponse = Partial<Record<CategoryType, Product[]>>

