export class AppError extends Error {
    constructor(
        public statusCode: number,
        message: string,
    ){
        super(message);
        this.name = "App Error";
        Error.captureStackTrace(this, this.constructor);
    }
}