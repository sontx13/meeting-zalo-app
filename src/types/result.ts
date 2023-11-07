export interface IResult {
    //_id: string;
    answer: string;
    phone: string;
    token: string;
    access_token: string;
    name: string;
    voteId: string;
    // createdBy?: string;
    // isDeleted?: boolean;
    // deletedAt?: boolean | null;
    // createdAt?: string;
    // updatedAt?: string;
}

export interface IPhoneUser {
    phone: string;
    token: string;
    access_token: string;
    name: string;
}
