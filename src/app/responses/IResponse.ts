export interface IResponse<T = Object>{
    succeeded: boolean;
    bug: boolean;
    statusCode: number;
    message: string;
    result: T;
}