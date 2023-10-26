import { FinalPrice } from "components/display/final-price";
import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSetRecoilState } from "recoil";
import { cartState } from "state";
import { SelectedOptions } from "types/cart";
import { Product } from "types/product";
import { isIdentical } from "utils/product";
import { Box, Button, Text } from "zmp-ui";
import { MultipleOptionPicker } from "./multiple-option-picker";
import { QuantityPicker } from "./quantity-picker";
import { SingleOptionPicker } from "./single-option-picker";

export interface ProductPickerProps {
  product?: Product;
  selected?: {
    options: SelectedOptions;
    quantity: number;
  };
  children: (methods: { open: () => void; close: () => void }) => ReactNode;
}


export const ProductPicker: FC<ProductPickerProps> = ({
  children,
  product,
  selected,
}) => {
  const [visible, setVisible] = useState(false);
 
  const [quantity, setQuantity] = useState(1);
  const setCart = useSetRecoilState(cartState);

  useEffect(() => {
    if (selected) {
      setQuantity(selected.quantity);
    }
  }, [selected]);

  // const addToCart = () => {
  //   if (product) {
  //     setCart((cart) => {
  //       let res = [...cart];
  //       if (selected) {
  //         // updating an existing cart item, including quantity and size, or remove it if new quantity is 0
  //         const editing = cart.find(
  //           (item) =>
  //             item.product._id === product._id &&
  //             isIdentical(item.options, selected.options)
  //         )!;
  //         if (quantity === 0) {
  //           res.splice(cart.indexOf(editing), 1);
  //         } else {
  //           const existed = cart.find(
  //             (item, i) =>
  //               i !== cart.indexOf(editing) &&
  //               item.product.id === product.id &&
  //               isIdentical(item.options, options)
  //           )!;
  //           res.splice(cart.indexOf(editing), 1, {
  //             ...editing,
  //             options,
  //             quantity: existed ? existed.quantity + quantity : quantity,
  //           });
  //           if (existed) {
  //             res.splice(cart.indexOf(existed), 1);
  //           }
  //         }
  //       } else {
  //         // adding new item to cart, or merging if it already existed before
  //         const existed = cart.find(
  //           (item) =>
  //             item.product._id === product._id &&
  //             isIdentical(item.options, options)
  //         );
  //         if (existed) {
  //           res.splice(cart.indexOf(existed), 1, {
  //             ...existed,
  //             quantity: existed.quantity + quantity,
  //           });
  //         } else {
  //           res = res.concat({
  //             product,
  //             options,
  //             quantity,
  //           });
  //         }
  //       }
  //       return res;
  //     });
  //   }
  //   setVisible(false);
  // };
  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          {product && (
            <Box className="space-y-6 mt-2" p={4}>
              <Box className="space-y-2">
                <Text.Title>{product.name}</Text.Title>
                <Text>
                  {/* <FinalPrice options={options}>{product}</FinalPrice> */}
                </Text>
                <Text>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description ?? "",
                    }}
                  ></div>
                </Text>
              </Box>
             
            </Box>
          )}
        </Sheet>,
        document.body
      )}
    </>
  );
};
