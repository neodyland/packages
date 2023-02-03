import { SyutokuError } from "../error";
import { request as nodeRequester } from "./node";
import { request as xhrRequester } from "./xhr";

export function getRequester() {
	if (typeof XMLHttpRequest !== "undefined") {
		return xhrRequester;
	} else if (
		typeof process !== "undefined" &&
		Object.prototype.toString.call(process) === "[object process]"
	) {
		return nodeRequester;
	} else {
        throw new SyutokuError("Unsupported environment");
    }
}