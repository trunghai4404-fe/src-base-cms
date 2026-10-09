export class ApiResponse<T = unknown> {
    success: boolean;
    data: T;
    message?: string;
    code?: number | string;
    errors?: any;

    constructor(
        data: T,
        success: boolean = true,
        message?: string,
        code?: number | string,
        errors?: any,
    ) {
        this.data = data;
        this.success = success;
        this.message = message;
        this.code = code;
        this.errors = errors;
    }

    static from<T>(rawData: any): ApiResponse<T> {
        if (rawData instanceof ApiResponse) {
            return rawData;
        }

        return new ApiResponse<T>(
            rawData?.data !== undefined ? rawData.data : rawData,
            rawData?.success ?? true,
            rawData?.message,
            rawData?.code,
            rawData?.errors,
        );
    }
}

export interface PaginatedResponse<T = unknown> {
    items: T[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
