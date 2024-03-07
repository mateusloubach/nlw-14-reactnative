import { ProductCartProps } from "../cartStore/models";

import { ProductProps } from "@/utils";

export const add = (product: ProductCartProps[], newProduct: ProductProps) => {
  const existingProduct = product.find(({ id }) => id === newProduct.id);

  if (existingProduct) {
    return product.map((item) =>
      item.id === existingProduct.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [...product, { ...newProduct, quantity: 1 }];
};

export const remove = (
  product: ProductCartProps[],
  productRemovedId: ProductCartProps["id"],
) => {
  const updatedProducts = product.map((item) =>
    item.id === productRemovedId
      ? {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 0,
        }
      : item,
  );

  return updatedProducts.filter((item) => item.quantity > 0);
};
