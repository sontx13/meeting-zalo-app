import React, { FC } from "react";
import { Divider } from "components/divider";
import { Header, Page } from "zmp-ui";
import { CartItems } from "./cart-items";
import { CartPreview } from "./preview";
import { TermsAndPolicies } from "./term-and-policies";
import { Delivery } from "./delivery";
import { useVirtualKeyboardVisible } from "hooks";
import { useRecoilValue } from "recoil";
import { productState } from "state";
import { Box, Text } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { Utinity } from "./utinity";

const CartPage: FC = () => {
  //const keyboardVisible = useVirtualKeyboardVisible();
  const productSelect = useRecoilValue(productState);

  // const result = useRecoilValue(searchResultState);
  console.log("result==");
  console.log(productSelect);

  return (
    <Page className="flex flex-col">
      <Header title="Thông tin cuộc họp" />
      <Box className="bg-background grid grid-cols-2 gap-4 p-4">
        <Box className="w-full aspect-square relative">
          <img
            loading="lazy"
            src={
              "https://backend-nest-js-meeting.onrender.com/images/company/" +
              productSelect.company?.logo
            }
            className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
          />
        </Box>
        <Text>{productSelect.name}</Text>
      </Box>
      {/* <Product productId={selectedProductId} />  */}
      <Utinity />
      <Divider size={12} />
      {/* <TermsAndPolicies /> */}
      <Divider size={32} className="flex-1" />
      {/* {!keyboardVisible && <CartPreview />} */}
    </Page>
  );
};

export default CartPage;
