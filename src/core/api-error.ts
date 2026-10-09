/**
 * Class xử lý lỗi API thống nhất cho toàn bộ Frontend
 */
export class ApiError extends Error {
    statusCode: number;
    code?: string;
    errors?: any;

    constructor(
        message: string,
        statusCode: number = 500,
        code?: string,
        errors?: any,
    ) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.code = code;
        this.errors = errors;

        // Giữ nguyên prototype chain cho Custom Error trong TypeScript
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
