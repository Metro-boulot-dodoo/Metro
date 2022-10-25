export const HTTPResponse = (statusCode: number, message: string, data: any) => {
    const date = new Date().toISOString();
    // console.log("HTTPResponse", statusCode, message, data, date);
    return {"statusCode": statusCode, "message": message, "time": date, "data": data}
}