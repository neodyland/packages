import { Buffer as NodeBuffer } from "buffer";
import { SyutokuError } from "./error";
import { Headers, RequestConfig } from "./interface";
import { decode } from "cbor";

export function safeParseUrl(url: string | URL) {
	try {
		if (typeof url === "string") {
			return new URL(url);
		}
		return url;
	} catch (_) {
		throw new Error("Invalid URL");
	}
}

export function getBuffer(){
	if(typeof Buffer !== "undefined"){
		return Buffer;
	} else {
		return NodeBuffer;
	}
}

export function parseHeaders(headers: string) {
	const parsed: Headers = {};
	headers.split("\r\n").forEach((header) => {
		const [key, value] = header.split(":").map(x => x.trim());
		if (key && value) {
			if(parsed[key]){
				if(Array.isArray(parsed[key])){
					(parsed[key] as any[]).push(value);
				} else {
					parsed[key] = [parsed[key] as string, value];
				}
			} else {
				parsed[key] = value;
			}
		}
	});
	return parsed;
}

export function toArrayBuffer(buffer: Buffer) {
	const view = new Uint8Array(buffer.length);
	for (let i = 0; i < buffer.length; i++) {
		view[i] = buffer[i];
	}
	return view.buffer;
}

export function safeParseJson<T = any>(json: string): T {
	try {
		return JSON.parse(json);
	} catch (_) {
		throw new SyutokuError("Invalid JSON");
	}
}

export 
function getData(body: any, responseType: RequestConfig["responseType"], contentType?: string) {
	switch (responseType) {
		case "json":
			return safeParseJson(body);
		case "text":
			return body;
		case "arraybuffer":
			return toArrayBuffer(body);
		case "blob":
			return new Blob([body]);
		case "buffer":
			return Buffer.from(body);
		default:
			if (contentType?.includes("application/json")) {
				try{
					return safeParseJson(body);
				}catch(e){
					return body;
				}
			}
			if (contentType?.includes("application/cbor")) {
				try{
					return decode(body);
				}catch(e){
					return body;
				}
			}
			return body;
	}
}