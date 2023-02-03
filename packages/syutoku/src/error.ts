export type SyutokuErrorMessage = "Request Timeout" | "Request Aborted";

export class SyutokuError extends Error {
    constructor(message: SyutokuErrorMessage | string) {
        super(message);
    }
}