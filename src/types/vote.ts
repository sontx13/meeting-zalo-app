export interface IVote {
    _id?: string;
    question: string;
    status: string;
    companyId: string;
    jobId: string;
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}
