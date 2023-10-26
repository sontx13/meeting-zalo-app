import { FinalPrice } from "components/display/final-price";
import React, { FC } from "react";
import { Product } from "types/product";
import { Box, Text, useNavigate } from "zmp-ui";
import { ProductPicker } from "./picker";
import { useSetRecoilState } from "recoil";
import { selectedProductIdState } from "state";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const setSelectedProductId = useSetRecoilState(selectedProductIdState);

  const gotoProduct = (productId: string) => {
    setSelectedProductId(productId);
    navigate("/cart");
  };

  return (
    <ProductPicker product={product}>
      {() => (
        <div className="space-y-2" 
        onClick={() => gotoProduct(product._id)}
        >
          <Box className="w-full aspect-square relative">
            <img
              loading="lazy"
              src={"https://backend-nest-js-meeting.onrender.com/images/company/"+product.company?.logo}
              className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
            />
          </Box>
          <Text>{product.name}</Text>
          <Text size="xxSmall" className="text-gray pb-2">
            {/* <FinalPrice>{product}</FinalPrice> */}
          </Text>
        </div>
      )}
    </ProductPicker>
  );
};
