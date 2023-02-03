import { RequestConfig, XHRRequestResponse } from "../interface";
import { getBuffer, getData, parseHeaders, toArrayBuffer } from "../util";

export async function request<T = any>(
	config: RequestConfig
): Promise<XHRRequestResponse<T>> {
	if (config.auth) {
		if (!config.headers) {
			config.headers = {};
		}
		config.headers["Authorization"] = `Basic ${Buffer.from(
			config.auth.username + ":" + config.auth.password
		).toString("base64")}`;
	}
	const buffer = getBuffer();
	const xhr = new XMLHttpRequest();
	if (config.timeout) {
		xhr.timeout = config.timeout;
	}
	xhr.open(config.method.toUpperCase(), config.url);
	if (config.headers) {
		for (const [key, value] of Object.entries(config.headers)) {
			if (Array.isArray(value)) {
				value.forEach((v) => xhr.setRequestHeader(key, v));
			} else if (value) {
				xhr.setRequestHeader(key, value);
			}
		}
	}
	if (config.responseType && config.responseType !== "buffer") {
		xhr.responseType = config.responseType;
	}
	if (config.withCredentials) {
		xhr.withCredentials = true;
	}
	const res = await new Promise<XHRRequestResponse<T>>((resolve, reject) => {
		xhr.onload = () => {
			const headers =
				"getAllResponseHeaders" in xhr
					? parseHeaders(xhr.getAllResponseHeaders())
					: {};
			resolve({
				status: xhr.status,
				statusText: xhr.statusText,
				data: getData(
					xhr.response,
					config.responseType,
					headers["content-type"]
						? headers["content-type"].toString()
						: undefined
				),
				headers,
				request: xhr,
			});
		};
		xhr.onerror = () => {
			reject(new Error("Network Error"));
		};
	});
	const body = buffer.isBuffer(config.body)
		? toArrayBuffer(config.body)
		: config.body;
	xhr.send(body);
	return res;
}
