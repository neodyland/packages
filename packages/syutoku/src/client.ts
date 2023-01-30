import { ClientOptions, NodeRequestResponse, RequestConfig, XHRRequestResponse } from "./interface";
import { getRequester } from "./requesters";

type NoMethodUrlConfig = Omit<RequestConfig, "method" | "url">;

function deepMergeOptions(o: ClientOptions, n: RequestConfig) {
	const headers = { ...o.headers, ...n.headers };
	return { ...o, ...n, headers };
}

export class Client {
	request: ReturnType<typeof getRequester>;
	options: ClientOptions;
	constructor(
		options: ClientOptions = {
			headers: {
				"User-Agent": "Syutoku-Client/0.1.0",
			},
		}
	) {
		this.request = getRequester();
		this.options = options;
	}
	create(options: ClientOptions = this.options) {
		return new Client(options);
	}
	private _request<T>(config: RequestConfig): Promise<XHRRequestResponse<T> | NodeRequestResponse<T>> {
		config = deepMergeOptions(this.options, config);
		if(!config.headers)	config.headers = {};
		if (this.options.baseURL && typeof config.url === "string") {
			config.url = this.options.baseURL + config.url;
		}
		if(config.body) {
			if(config.body instanceof FormData) {
				config.headers["Content-Type"] = "multipart/form-data";
			} else if(typeof config.body === "object"){
				config.body = JSON.stringify(config.body);
				config.headers["Content-Type"] = "application/json";
			}
		}
		return this.request<T>(config);
	}
	get<T = undefined>(url: string | URL, options: NoMethodUrlConfig = {}) {
		return this._request<T>({ ...options, url, method: "GET" });
	}
	post<T = undefined>(
		url: string | URL,
		body: RequestConfig["body"],
		options: NoMethodUrlConfig = {}
	) {
		return this._request<T>({ ...options, url, method: "POST", body });
	}
	put<T = undefined>(
		url: string | URL,
		body: RequestConfig["body"],
		options: NoMethodUrlConfig = {}
	) {
		return this._request<T>({ ...options, url, method: "PUT", body });
	}
	patch<T = undefined>(
		url: string | URL,
		body: RequestConfig["body"],
		options: NoMethodUrlConfig = {}
	) {
		return this._request<T>({ ...options, url, method: "PATCH", body });
	}
	delete<T>(url: string | URL, options: NoMethodUrlConfig = {}) {
		return this._request<T>({ ...options, url, method: "DELETE" });
	}
}
