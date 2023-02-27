import { isString } from "../types";
import { BaseErrorMessage, DefBase } from "./base";
import { error, ok, SafeParseResult } from "./return";

export class DefString extends DefBase {
    private _min?: number
    private _max?: number
    constructor() { 
        super();
    }
    protected safeParseString(value: any): SafeParseResult<string, "string"> {
        const parent = this.safeParseAny(value);
        if(!parent.ok) {
            return parent;
        }
        if(!isString(value)) {
            return error<"string">(value, StringErrorMessage.ValueNotString)
        }
        if(this._min !== undefined && value.length < this._min) {
            return error<"string">(value, StringErrorMessage.ValueTooShort)
        }
        if(this._max !== undefined && value.length > this._max) {
            return error<"string">(value, StringErrorMessage.ValueTooLong)
        }
        return ok(value);
    }
    len(len: number){
        this._min = len;
        this._max = len;
        return this;
    }
    min(len: number) {
        this._min = len;
        return this;
    }
    max(len: number) {
        this._max = len;
        return this;
    }
}

export class ParseString extends DefString {
    constructor() { 
        super();
    }
    safeParse(value: any) {
        return this.safeParseString(value);
    }
    parse(value: any, error: boolean) {
        const result = this.safeParse(value);
        if(!result.ok) {
            if(error) {
                throw new Error(result.error.message);
            }
        }
        return result;
    }
}

export const StringErrorMessage = Object.assign(BaseErrorMessage, {
    ValueNotString: "value is not a string",
    ValueTooShort: "value is too short",
    ValueTooLong: "value is too long",
} as const)