export interface User{
  id?: number;
  dni: string;
  fullName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: string;
}

export interface PaginationUser{
  content: User[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  lastOne: boolean;
}
