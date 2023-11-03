import { ListRenderer } from "components/list-renderer";
import React, { FC,Suspense } from "react";
import { Box, Icon, Text, useNavigate } from "zmp-ui";
import { RequestPersonPickerPhone } from "./person-picker";
import { VotePicker } from "components/product/vote-picker";
import { Vote } from "types/vote";
import { Divider } from "components/divider";


export const Utinity: FC = () => {
  const navigate = useNavigate();
  const gotoVoting = () => {
    navigate("/voting");
  };

  const vote: Vote={
    _id: "1",
    question: "Biểu quyết 1",
    answer:"yes",
    userId: "1",
    description: "description",
    status: "1",
  }


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
          //  {
          //   left: <Icon icon="zi-note" className="my-auto" />,
          //   right: (
           
          //       <Box flex className="space-x-2" onClick={() => gotoVoting()}>
          //         <Box className="flex-1 space-y-[2px]">
          //           <Text >
          //               Biểu quyết
          //           </Text>
          //         </Box>
          //         <Icon icon="zi-chevron-right" />
          //       </Box> 
          
          //   ),
          // },
         
        ]}
        limit={4}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
      <Divider size={12} />
      
      <Text.Header>Danh sách Biểu quyết</Text.Header>

      <ListRenderer
        items={[  
          {
            left: <Icon icon="zi-note"  className="my-auto" />,
            right: (
               <VotePicker vote={vote}>
                {({ open }) => (
                  <div className="space-y-2" onClick={open}>
                  
                    <Text>Biểu quyết 1</Text>
                    
                  </div>
                )}
              </VotePicker>
            ),
          }
         
        ]}
        limit={4}
        renderLeft={(item) => item.left}
        renderRight={(item) => item.right}
      />
       
      

    </Box>
  );
};
