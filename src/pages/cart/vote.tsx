import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { phoneState, productState, requestPhoneTriesState, userState, votesByProductState } from "state";
import { Box, Icon,Text } from "zmp-ui";
import { VoteItemSkeleton } from "components/skeletons";
import { ListRenderer } from "components/list-renderer";
import { VotePicker } from "components/product/vote-picker";
import { ListItem } from "components/list-item";

export const VoteListContent: FC = () => {
  const productSelect = useRecoilValue(productState);

  const votesByProduct = useRecoilValue(votesByProductState(productSelect._id));
  //console.log("votesByProduct");
  console.log(votesByProduct);

  const user = useRecoilValue(userState);
  const phone = useRecoilValue(phoneState);
 
  if (!phone) {
    return <RequestVotePickerPhone />;
  }
  else{
    if (votesByProduct.length === 0 ) {
      return (
        <Text>Chưa có biểu quyết nào</Text>
      );
    }
    return (
        <Section title="Danh sách biểu quyết">
          <ListItem title={`${user.name} - ${phone}`} subtitle="Thông tin người dùng" />
          <Box className="space-y-3 px-4">
            {votesByProduct.map((vote) => (
              <VotePicker key={vote._id} vote={vote} phone={phone as string} name={user.name as string}>
                  {({ open }) => (
                    <div  className="space-y-2" onClick={open}>
                      <ListRenderer
                          items={[  
                            {
                              left: <Icon icon="zi-note"  className="my-auto" />,
                              right: (
                                  <Text>{vote.question}</Text>
                              ),
                            }
                          
                          ]}
                          limit={4}
                          renderLeft={(item) => item.left}
                          renderRight={(item) => item.right}
                        /> 
                    </div>
                  )}
                </VotePicker>
            ))}
          </Box>
        </Section>
    );
  }
};

export const VoteListFallback: FC = () => {
  const products = [...new Array(10)];
   console.log("VoteListFallback");
   console.log(products);
  return (
    <Section title="Danh sách biểu quyết">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <VoteItemSkeleton key={i} />
        ))}
      </Box>
    </Section>
  );
};

export const VotePage: FC = () => {
  return (
    // <Suspense fallback={<VoteListFallback />}>
      <VoteListContent />
    // </Suspense>
  );
};

export const RequestVotePickerPhone: FC = () => {
  const retry = useSetRecoilState(requestPhoneTriesState);
  return (
    <ListItem
      onClick={() => retry((r) => r + 1)}
      title="Biểu quyết"
      subtitle="Yêu cầu truy cập số điện thoại"
    />
  );
};
