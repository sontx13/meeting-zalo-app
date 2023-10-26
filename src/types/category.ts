export type CategoryId = "";

// export interface CategoryByProduct {
//   _id: string;
// }
//export type CategoryId = CategoryByProduct;

export interface Category {
  _id: string;
  name?: string;
  address?: string;
  logo: string;
  description?: string;
  createdBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}
