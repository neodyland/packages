import { tld } from "./tld";

type HostnameLastPart<H extends string> = H extends `${infer _}.${infer T}`
    ? HostnameLastPart<T>
    : H;

export type IsGlobalHostname<H extends string> = string extends H ? boolean : HostnameLastPart<H> extends `${infer T}`
    ? T extends typeof tld[number]
        ? true
        : false
    : false;

export function isGlobalHostname<H extends string>(hostname: H): IsGlobalHostname<H> {
    const parts = hostname.split(".");
    const tldPart = parts[parts.length - 1];
    return (tld as readonly string[]).includes(tldPart) as IsGlobalHostname<H>;
}

export { tld }