export const HTTPResponse = (statusCode: number, message: string, data: any) => {
    console.timeLog("HTTPResponse", statusCode, message, data);
    return {"statusCode": statusCode, "message": message, "time": new Date().toISOString(), "data": data}
}