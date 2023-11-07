export interface IAttendance {
     _id: string;
    name: string;
    access_token: string;
    code: string;
    latitude: string;
    longitude: string;
    isActive: boolean;
    timestamp: string;
    companyId: string | {
        _id: string;
        name: string;
        logo: string;
    };
    jobId: string | {
        _id: string;
        name: string;
    };
    createdBy?: string;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}
