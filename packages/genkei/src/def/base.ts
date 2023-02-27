import { isUndefined } from "../types";
import { error, SafeParseResult } from "./return";

export class DefBase {
    private _optional = false;
    constructor() { }
    protected safeParseAny(value: any): SafeParseResult<any,"any"> {
        if(!this._optional && isUndefined(value)) {
            return error<"any">(value, BaseErrorMessage.ValueIsUndefined)
        }
        return {
            value: value,
            ok: true
        };
    }
    optional() {
        this._optional = true;
        return this;
    }
    required() {
        this._optional = false;
        return this;
    }
}

export const BaseErrorMessage = {
    ValueIsUndefined: "value is undefined",
} as const;