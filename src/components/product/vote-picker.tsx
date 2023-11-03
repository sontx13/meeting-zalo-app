import { FinalPrice } from "components/display/final-price";
import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSetRecoilState } from "recoil";
import { cartState, voteState } from "state";
import { SelectedOptions } from "types/cart";
import { Vote } from "types/vote";
import { isIdentical } from "utils/product";
import { Box, Button, Radio, Text } from "zmp-ui";
import { MultipleOptionPicker } from "./multiple-option-picker";
import { QuantityPicker } from "./quantity-picker";
import { SingleOptionPicker } from "./single-option-picker";

export interface VotePickerProps {
  vote?: Vote;
  children: (methods: { open: () => void; close: () => void }) => ReactNode;
}


export const VotePicker: FC<VotePickerProps> = ({
  children,vote 
}) => {
  const [visible, setVisible] = useState(false);
 const [optionsAnswer, setOptionsAnswer] = useState("yes");
   // console.log("options==",optionsAnswer);
  const setVote = useSetRecoilState(voteState);

  const postVote = () => {
    if (vote) {
        const vote2: Vote={
            ...vote,
            answer:optionsAnswer,
        }
        console.log("vote2==",vote2);
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
              <Box className="space-y-2">
                <Text.Title>{vote.question}</Text.Title>
                
                <Text>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: vote.description ?? "",
                    }}
                  ></div>
                </Text>
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
                            console.log("answer==",selectedOption);
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
