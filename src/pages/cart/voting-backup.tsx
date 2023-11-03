import { ListRenderer } from "components/list-renderer";
import React, { FC,Suspense } from "react";
import { PersonPicker, RequestPersonPickerPhone } from "./person-picker";
import { Box,Text,Icon, Page, Header, Button } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { phoneState, productState, userState } from "state";
import { ElasticTextarea } from "components/elastic-textarea";

export const VotingPageBackup: FC = () => {
    const productSelect = useRecoilValue(productState);  

    const voted = () =>{
      console.log("aa==");
    }

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
        <Box className="space-y-3 px-4">
          <Text.Header>Biểu quyết</Text.Header>
          <ListRenderer
            items={[
              {
                left: <Icon icon="zi-user" className="my-auto" />,
                right: (
                  <Suspense fallback={<RequestPersonPickerPhone />}>
                    <PersonPicker />
                  </Suspense>
                ),
              },
               {
                left: <Icon icon="zi-note" className="my-auto" />,
                right: (
                  <Box flex>
                    <ElasticTextarea
                      placeholder="Nhập nội dung..."
                      className="border-none px-0 w-full focus:outline-none"
                      maxRows={4}
                    />
                  </Box>
                ),
              },
            ]}
            limit={4}
            renderLeft={(item) => item.left}
            renderRight={(item) => item.right}
          />
        </Box>
        <Box flex className="sticky bottom-0 bg-background p-4 space-x-4">
          <Button
             fullWidth
              onClick={() => voted()}
          >
            Biểu quyết
          </Button>
        </Box>
    </Page>

    
  );
};


