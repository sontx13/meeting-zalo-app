import { CategoryId } from "./category";

export interface PercentSale {
  type: "percent";
  percent: number;
}

export interface FixedSale {
  amount: number;
  type: "fixed";
}

export type Sale = PercentSale | FixedSale;

export interface Option {
  key: string;
  label?: string;
  priceChange?: Sale;
}

export interface BaseVariant {
  key: string;
  label?: string;
  options: Option[];
}

export interface SingleOptionVariant extends BaseVariant {
  type: "single";
  default?: string;
}

export interface MultipleOptionVariant extends BaseVariant {
  type: "multiple";
  default?: string[];
}

export type Variant = SingleOptionVariant | MultipleOptionVariant;

// export interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price: number;
//   categoryId: CategoryId[];
//   description?: string;
//   sale?: Sale;
//   variants?: Variant[];
// }

export interface Product {
  _id: string;
  name: string;
  skills: string[];
  company?: {
      _id: string;
      name: string;
      logo?: string;
  }
  location: string;
  salary: number;
  quantity: number;
  level: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;

  createdBy?: string;
  isDeleted?: boolean;
  deletedAt?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}