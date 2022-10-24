export type JSONResponse<T> = {
    statusCode: number,
    message: string,
    data?: T,
    time: Date
}