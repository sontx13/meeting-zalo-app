import React, { useState } from "react";
import { Box, Button, Icon, Input, Page } from "zmp-ui";
import { useForm } from "react-hook-form";


export interface IUploadImageResponse {
    domain: string;
    images: string[];
}

export interface FormItemValidate {
    status: "default" | "error";
    errorText?: string;
}

export interface FormValidate {
    title: FormItemValidate;
    content: FormItemValidate;
}


export const VotingPage: React.FC = () => {

    const [type, setType] = useState<string>();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const onSubmit = async data => {
        const { title, content } = data;
        console.log("data==",data);
         console.log("title==",title);
        try {
            // const res = await getPhoneNumber({});

            await postFeedback({
                token: "",
                title,
                content,
                feedBackTypeId: Number(type),
            });
        } catch (err) {
           
        }
    };

    const handleFeedbackTypeChange = id => {
        setType(id);
    };

    const getFieldName = (field: string) => {
        switch (field) {
            case "title":
                return "Tiêu đề";
            case "content":
                return "Nội dung";
            default:
                return "";
        }
    };

    const getErrorMessage = (field: string) => {
        if (errors[field]) {
            const name = getFieldName(field);
            if (errors[field]?.type === "required")
                return `${name} không được để trống`;
            return `${name} không hợp lệ`;
        }
        return "";
    };

    const postFeedback = async (params: {
        token: string;
        title: string;
        content: string;
        imageUrls?: string[];
        feedBackTypeId: number;
    }) => {
        try {
            
            const feedback = {
                title: params.title,
                content: params.content,
                imageUrls: params.imageUrls,
                feedbackTypeId: params.feedBackTypeId,
                token: params.token,
            };
           
        } catch (err) {
            if (err) {
                
            }
        }
    };

    return (
        <Page>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Input
                        placeholder="Nhập nội dung"
                        label="Tiêu đề*"
                        {...register("title", { required: true })}
                        status={errors?.title ? "error" : "default"}
                    />
                </Box>
                <Box mt={4}>
                    <Input
                        placeholder="Nhập nội dung"
                        label="Nội dụng phản ánh*"
                        {...register("content", { required: true })}
                        status={errors?.content ? "error" : "default"}
                    />
                </Box>
                <Button
                    htmlType="submit"
                    suffixIcon={<Icon icon="zi-chevron-right" />}
                >
                    Gửi phản ánh
                </Button>
            </form>
        </Page>
    );
};