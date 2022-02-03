export interface IDeleteRequest {
    params: object;
    query?: object;
}

export interface IGetRequest {
    params?: object;
    query?: object;
}

export interface IPostRequest extends IDeleteRequest {
    body: object;
    files?: object;
}

export interface IPutRequest extends IPostRequest { }