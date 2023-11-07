import { ListRenderer } from "components/list-renderer";
import React, { FC,Suspense } from "react";
import { Box, Icon, Text, useNavigate } from "zmp-ui";
import { Divider } from "components/divider";
import { RequestVotePickerPhone, VotePage } from "./vote";
import { PersonPicker } from "./person-picker";

export const Utinity: FC = () => {

  return (
    
    <Box className="space-y-3 px-4">
      <Text.Header>Tiện ích</Text.Header>
      <ListRenderer
        items={[  
          {
            left: <Icon icon="zi-location"  className="my-auto" />,
            right: (
              <Box flex className="space-x-2">
                <Box className="flex-1 space-y-[2px]">
                  <Text>
                      Điểm danh
                   </Text>
                 </Box>
               <Icon icon="zi-chevron-right" />
              </Box> 
            ),
          },
          {
            left: <Icon icon="zi-list-1" className="my-auto" />,
            right: (
              <Box flex className="space-x-2">
                <Box className="flex-1 space-y-[2px]">
                  <Text >
                      Tài liệu
                   </Text>
                 </Box>
               <Icon icon="zi-chevron-right" />
              </Box> 
            ),
          },
          {
            //left: <Icon icon="zi-user" className="my-auto" />,
            right: (
              <Suspense fallback={<RequestVotePickerPhone />}>
                <VotePage />
              </Suspense>
            ),
          },
         
        ]}
        limit={4}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
      <Divider size={12} /> 

      {/* <Box className="bg-white space-y-3 px-4">
        <Suspense fallback={<RequestVotePickerPhone />}>
          <VotePage />
        </Suspense>
      </Box> */}
      {/* <VotePage/> */}
    </Box>
  );
};
