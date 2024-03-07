import { ProductProps } from "@/utils";

export interface ProductCartProps extends ProductProps {
  quantity: number;
}

export interface StateProps {
  products: ProductCartProps[];
  add: (product: ProductProps) => void;
  remove: (productId: string) => void;
  clear: () => void;
}
