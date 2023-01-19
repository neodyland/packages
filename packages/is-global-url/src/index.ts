import { isGlobalHostname } from "is-global-hostname";

export type ParsedGlobalUrl<U extends string> =
	U extends `${infer P}://${infer H}/${infer Pn}?${infer S}#${infer Hs}`
		? {
				protocol: P;
				hostname: H;
				pathname: `/${Pn}`;
				search: `?${S}`;
				hash: `#${Hs}`;
		  }
		: U extends `${infer P}://${infer H}/${infer Pn}?${infer S}`
		? {
				protocol: P;
				hostname: H;
				pathname: `/${Pn}`;
				search: `?${S}`;
				hash: "";
		  }
		: U extends `${infer P}://${infer H}/${infer Pn}#${infer Hs}`
		? {
				protocol: P;
				hostname: H;
				pathname: `/${Pn}`;
				search: "";
				hash: `#${Hs}`;
		  }
		: U extends `${infer P}://${infer H}/${infer Pn}`
		? {
				protocol: P;
				hostname: H;
				pathname: `/${Pn}`;
				search: "";
				hash: "";
		  }
		: U extends `${infer P}://${infer H}?${infer S}#${infer Hs}`
		? {
				protocol: P;
				hostname: H;
				pathname: "/";
				search: `?${S}`;
				hash: `#${Hs}`;
		  }
		: U extends `${infer P}://${infer H}?${infer S}`
		? {
				protocol: P;
				hostname: H;
				pathname: "/";
				search: `?${S}`;
				hash: "";
		  }
		: U extends `${infer P}://${infer H}#${infer Hs}`
		? {
				protocol: P;
				hostname: H;
				pathname: "/";
				search: "";
				hash: `#${Hs}`;
		  }
		: U extends `${infer P}://${infer H}`
		? {
				protocol: P;
				hostname: H;
				pathname: "/";
				search: "";
				hash: "";
		  }
		: never;

export function parseGlobalUrl<U extends string>(url: U) {
	try {
		const parsed = new URL(url);
		if (!isGlobalHostname(parsed.hostname)) {
			return null;
		}
		const p = {
			protocol: parsed.protocol.slice(0, -1) as ParsedGlobalUrl<U>["protocol"],
			hostname: parsed.hostname as ParsedGlobalUrl<U>["hostname"],
			pathname: parsed.pathname as ParsedGlobalUrl<U>["pathname"],
			search: parsed.search as ParsedGlobalUrl<U>["search"],
			hash: parsed.hash as ParsedGlobalUrl<U>["hash"],
		};
		return p;
	} catch {
		return null;
	}
}

export function isGlobalUrl<U extends string>(url: U) {
	return parseGlobalUrl(url) !== null;
}

export function isGlobalHttpUrl<U extends string>(url: U) {
	const parsed = parseGlobalUrl(url);
	return (
		parsed &&
		((parsed.protocol as ParsedGlobalUrl<U>["protocol"]) === "http" ||
			(parsed.protocol as ParsedGlobalUrl<U>["protocol"]) === "https")
	);
}
