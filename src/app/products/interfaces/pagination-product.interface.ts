import { Product } from "./product.interface";

export interface PaginationProduct {
  content: Product[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastOne: boolean;
}
