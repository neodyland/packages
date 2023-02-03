import {
	ClientRequest,
	IncomingMessage,
	request as httpRequest,
	RequestOptions,
} from "node:http";
import { request as httpsRequest } from "node:https";
import { FollowOptions, http, https } from "follow-redirects";
import { URLSearchParams } from "node:url";
import { SyutokuError } from "../error";
import { NodeRequestResponse, RequestConfig } from "../interface";
import { getData, safeParseUrl } from "../util";

const httpFollowRequest = http.request;
const httpsFollowRequest = https.request;

const isHttps = /https:?/;

function httpRequester(max?: number) {
	if (max === 0) {
		return httpRequest;
	}
	return httpFollowRequest;
}

function httpsRequester(max?: number) {
	if (max === 0) {
		return httpsRequest;
	}
	return httpsFollowRequest;
}

function isUsingRedirect(max?: number) {
	return max !== 0;
}

export async function request<T = any>(
	config: RequestConfig
): Promise<NodeRequestResponse<T>> {
	let url = safeParseUrl(config.url);
	if (config.auth) {
		if (!config.headers) {
			config.headers = {};
		}
		config.headers["Authorization"] = `Basic ${Buffer.from(
			config.auth.username + ":" + config.auth.password
		).toString("base64")}`;
	}
	const httpRequestConfig: RequestOptions & FollowOptions<RequestOptions> = {
		method: config.method.toUpperCase(),
		headers: config.headers,
	};
	const request = isHttps.test(url.protocol)
		? httpsRequester(config.maxRedirects)
		: httpRequester(config.maxRedirects);
	if (config.proxy) {
		url.hostname = config.proxy.host;
		url.port = String(config.proxy.port);
		url.pathname = config.url.toString();
		if (config.proxy.auth) {
			if (!config.headers) {
				config.headers = {};
			}
			config.headers["Proxy-Authorization"] = `Basic ${Buffer.from(
				config.proxy.auth.username + ":" + config.proxy.auth.password
			).toString("base64")}`;
		}
		if (isUsingRedirect(config.maxRedirects)) {
			httpRequestConfig.maxRedirects = config.maxRedirects;
			httpRequestConfig.beforeRedirect = (options, response) => {
				if (!options.headers) {
					options.headers = {};
				}
				options.headers.host = options.host || undefined;
				if (!config.headers) {
					config.headers = {};
				}
				if (config.proxy) {
					url.hostname = config.proxy.host;
					url.port = String(config.proxy.port);
					url.pathname = `${options.protocol}//${options.host || ""}${
						options.path || ""
					}`;
				}
				options.headers["Proxy-Authorization"] =
					config.headers["Proxy-Authorization"];
			};
		}
	}
	const { req, res, body } = await new Promise<{
		req: ClientRequest;
		res: IncomingMessage;
		body: any;
	}>((resolve, reject) => {
		const req = request(url, httpRequestConfig, (res) => {
			res.on("error", (e) => {
				throw new SyutokuError(e.message);
			});
			let body = "";
			res.on("data", (chunk) => {
				body += chunk;
			});
			res.on("end", () => {
				resolve({ req: req as ClientRequest, res, body });
			});
		});
		if (config.timeout) req.setTimeout(config.timeout);
		const body =
			config.body instanceof URLSearchParams
				? config.body.toString()
				: config.body;
		req.on("error", (e) => {
			reject(new SyutokuError(e.message));
		});
		if (body) {
			req.write(body);
		}
		req.end();
	});
	if (req.aborted) {
		throw new SyutokuError("Request Aborted");
	}
	return {
		status: res.statusCode ?? 0,
		headers: res.headers,
		data: getData(body, config.responseType, res.headers?.["content-type"]),
		statusText: res.statusMessage ?? "",
		request: req,
	};
}
