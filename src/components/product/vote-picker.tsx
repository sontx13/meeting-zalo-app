import { FinalPrice } from "components/display/final-price";
import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState,Suspense } from "react";
import { createPortal } from "react-dom";
import { useSetRecoilState } from "recoil";
import { cartState, postData, voteState } from "state";
import { SelectedOptions } from "types/cart";
import { IVote } from "types/vote";
import { isIdentical } from "utils/product";
import { Box, Button, Radio, Text } from "zmp-ui";
import { MultipleOptionPicker } from "./multiple-option-picker";
import { QuantityPicker } from "./quantity-picker";
import { SingleOptionPicker } from "./single-option-picker";
import { IPhoneUser, IResult } from "types/result";
import { PersonPicker, RequestPersonPickerPhone } from "pages/cart/person-picker";

export interface VotePickerProps {
  vote?: IVote;
  phone:string;
  name:string;
  children: (methods: { open: () => void; close: () => void }) => ReactNode;
}


export const VotePicker: FC<VotePickerProps> = ({
  children,vote,phone,name
}) => {
  const [visible, setVisible] = useState(false);
 const [optionsAnswer, setOptionsAnswer] = useState("yes");
  const setVote = useSetRecoilState(voteState);

//   const placeOrder = async (cart: Cart) => {
//     return fetch(`${BASE_URL}/order`, {
//       method: "POST",
//       body: JSON.stringify(cart),
//       headers: {
//         "zalo-access-token": `Bearer ${accessToken}`,
//       },
//     });
//  };
  const postVote = async () => {
    if (vote) {
        const result: IResult={
            answer:optionsAnswer,
            phone: phone,
            token: "string",
            access_token: "string",
            name: name,
            voteId: vote._id as string
        }
        console.log(result);
      
        const resultVote = await postData("https://backend-nest-js-meeting.onrender.com/api/v1/results", result).then((data) => {
          console.log(data); // JSON data parsed by `data.json()` call
        });

        console.log(resultVote);
    }
    setVisible(false);
    
  };

  const optionsVote= [
           {
            key: "yes",
            label: "Đồng ý",
          },  
          {
            key: "no",
            label: "Không đồng ý",
          }, 
          {
            key: "none",
            label: "Không chọn",
          },     
    ]
      
  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          {vote && (
            <Box className="space-y-6 mt-2" p={4}>
              <Suspense fallback={<RequestPersonPickerPhone />}>
                <PersonPicker />
              </Suspense>
              <Box className="space-y-2">
                <Text.Title>{vote.question}</Text.Title>
              </Box>
              <Box className="space-y-5">
                    <Radio.Group
                        className="flex-1 grid grid-cols-3 justify-between"
                        name="answer"
                        options={optionsVote.map((option) => ({
                            value: option.key,
                            label: option.label,
                        }))}
                         value={optionsAnswer as string}
                            onChange={(selectedOption: string) => {
                                setOptionsAnswer(selectedOption)
                        }}
                    />
                <Button
                variant="primary"
                type="highlight"
                fullWidth
                onClick={postVote}
                >
                Biểu quyết
                </Button>
          
              </Box>
            </Box>
          )}
        </Sheet>,
        document.body
      )}
    </>
  );
};
