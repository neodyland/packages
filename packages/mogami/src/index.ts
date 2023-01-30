import type { IncomingMessage, ServerResponse } from "node:http";
import { createServer as createHttpServer } from "node:http";
import { URLSearchParams } from "node:url";

export function createServer() {
	return new Server();
}

export type Path = string;

export type GetParamStrings<P extends string> =
	P extends `${infer _}:${infer Param}/${infer Rest}`
		? Param | GetParamStrings<Rest>
		: P extends `${infer _}:${infer Param}`
		? Param
		: never;

export type GetParams<P extends string> = {
	[K in GetParamStrings<P>]: string;
};

export type Request<P extends string> = IncomingMessage & {
	params: GetParams<P>;
	query: Record<string, string>;
	body: any;
};

export type Response = ServerResponse & {
	send: (body: string) => void;
	json: (body: any) => void;
};

export type NextFunction = () => Promise<void>;

export type RequestHandler<P extends string> = (
	req: Request<P>,
	res: Response,
	next: NextFunction
) => void;

export type Listener<P extends string> = {
	handler: RequestHandler<P>;
	path: P;
};

function getParams<P extends string>(url: string, path: P): GetParams<P> {
	const params: Record<string, string> = {};
	const pathParts = path.split("/");
	const urlParts = url.split("/");
	for (let i = 0; i < pathParts.length; i++) {
		const pathPart = pathParts[i];
		if (pathPart.startsWith(":")) {
			params[pathPart.slice(1)] = urlParts[i];
		}
	}
	return params as GetParams<P>;
}

function getQuery(url: string) {
	const query: Record<string, string> = {};
	const search = new URLSearchParams(url.slice(url.indexOf("?") + 1));
	for (const [key, value] of search) {
		query[key] = value;
	}
	return query;
}

async function makeRequest<P extends string>(
	req: IncomingMessage,
	path: P
): Promise<Request<P>> {
	const body = await new Promise<string>((resolve) => {
		let body = "";
		req.on("data", (chunk) => {
			body += chunk;
		});
		req.on("end", () => {
			resolve(body);
		});
	});
	(req as Request<P>).params = getParams<P>(req.url ?? "/", path);
	(req as Request<P>).query = getQuery(req.url ?? "/");
	(req as Request<P>).body = body;
	return req as Request<P>;
}

function makeResponse(res: ServerResponse) {
	const send = (body: string) => {
		res.end(body);
	};
	const json = <X extends any>(body: X) => {
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(body));
	};

	(res as Response).send = send;
	(res as Response).json = json;
	return res as Response;
}

function isUrlMatched<P extends string>(path: P, url: string) {
	path = path.split("?")[0] as P;
	url = url.split("?")[0];
	const pathParts = path.split("/");
	const urlParts = url.split("/");
	if (pathParts.length !== urlParts.length) {
		return false;
	}
	for (let i = 0; i < pathParts.length; i++) {
		const pathPart = pathParts[i];
		if (pathPart.startsWith(":")) {
			continue;
		}
		if (pathPart !== urlParts[i]) {
			return false;
		}
	}
	return true;
}

export class Server {
	listeners: Listener<any>[];
	finalHandler: (req: IncomingMessage, res: ServerResponse) => void;
	constructor() {
		this.listeners = [];
		this.finalHandler = (_, res) => {
			res.statusCode = 404;
			res.end();
		};
	}
	dispatch(req: IncomingMessage, res: ServerResponse) {
		if (req.url) {
			if (req.url.endsWith("/")) {
				req.url = req.url.slice(0, -1);
			}
		}
		const listeners = Array.from(this.listeners);
		const response = makeResponse(res);
		res.setHeader("X-Powered-By", "Mogami");
		const next = async (): Promise<void> => {
			const listener = listeners.shift();
			if (listener) {
				if (isUrlMatched(listener.path, req.url ?? "/")) {
					const request = await makeRequest(req, listener.path);
					return listener.handler(request, response, next);
				} else {
					return next();
				}
			} else {
				return this.finalHandler(req, res);
			}
		};
		return next();
	}
	use<P extends string>(path: P, handler: RequestHandler<P>) {
		this.listeners.push({
			path,
			handler,
		});
	}
	get<P extends string>(path: P, handler: RequestHandler<P>) {
		this.use(path, (req, res, next) => {
			if (req.method === "GET") {
				handler(req, res, next);
			} else {
				next();
			}
		});
	}
	post<P extends string>(path: P, handler: RequestHandler<P>) {
		this.use(path, (req, res, next) => {
			if (req.method === "POST") {
				handler(req, res, next);
			} else {
				next();
			}
		});
	}
	put<P extends string>(path: P, handler: RequestHandler<P>) {
		this.use(path, (req, res, next) => {
			if (req.method === "PUT") {
				handler(req, res, next);
			} else {
				next();
			}
		});
	}
	delete<P extends string>(path: P, handler: RequestHandler<P>) {
		this.use(path, (req, res, next) => {
			if (req.method === "DELETE") {
				handler(req, res, next);
			} else {
				next();
			}
		});
	}
	patch<P extends string>(path: P, handler: RequestHandler<P>) {
		this.use(path, (req, res, next) => {
			if (req.method === "PATCH") {
				handler(req, res, next);
			} else {
				next();
			}
		});
	}
	final(handler: (req: IncomingMessage, res: ServerResponse) => void) {
		this.finalHandler = handler;
	}
	listen(port: number) {
		const server = createHttpServer((req, res) => {
			this.dispatch(req, res);
		});
		return new Promise((resolve) =>
			server.listen(port, () => resolve(undefined))
		);
	}
}
