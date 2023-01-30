import { ClientRequest } from "node:http";
import { SyutokuError as SyutokuCommonError } from "./error";

export interface RequestConfig {
    url: string | URL;
    method: string;
    body?: string | ArrayBuffer | ArrayBufferView | Blob | Buffer | FormData | URLSearchParams | null | any;
    withCredentials?: boolean;
    responseType?: "json" | "text" | "arraybuffer" | "blob" | "buffer";
    headers?: Headers;
    timeout?: number;
    auth?: BasicCredentials;
    maxRedirects?: number;
    proxy?: ProxyConfig | false;
}

export interface BasicCredentials {
    username: string;
    password: string;
}

export interface ProxyConfig {
    host: string;
    port: number;
    auth?: BasicCredentials;
    protocol?: "http" | "https";
}

interface RClientOptions extends RequestConfig {
    baseURL?: string | URL;
}

export type ClientOptions = Omit<RClientOptions,"url" | "method">;

export type CommonHeaders = "User-Agent" | "Authorization" | "Content-Type" | "Accept" | "Accept-Encoding" | "Accept-Language" | "Accept-Charset" | "Cache-Control" | "Connection" | "Cookie" | "Cookie2" | "Date" | "Expect" | "Host" | "Keep-Alive" | "Referer" | "TE" | "Trailer" | "Transfer-Encoding";

export type Headers = Record<CommonHeaders | string, string | string[] | undefined>;

export interface XHRRequestResponse<T> {
    status: number;
    statusText: string;
    data?: T;
    request: XMLHttpRequest;
    headers: Headers
}

export interface NodeRequestResponse<T> {
    status: number;
    statusText: string;
    data?: T;
    request: ClientRequest;
    headers: Headers
}

export interface SyutokuHttpError extends Error {
    status: number;
    statusText: string;
    data?: any;
    request: XMLHttpRequest | ClientRequest;
    headers: Headers;
}

export type SyutokuError  = SyutokuCommonError | SyutokuHttpError;