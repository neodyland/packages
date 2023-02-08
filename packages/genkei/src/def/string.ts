import { isString } from "../types";
import { BaseErrorMessage, DefBase } from "./base";
import { error, ok } from "./return";

export class DefString extends DefBase {
    private _min?: number
    private _max?: number
    constructor() { 
        super();
    }
    safeParse(value: any) {
        const parent = super.safeParse(value);
        if(!parent.ok) {
            return parent;
        }
        if(!isString(value)) {
            return error<"string">(value, StringErrorMessage.ValueNotString)
        }
        if(this._min !== undefined && value.length < this._min) {
            return error(value, StringErrorMessage.ValueTooShort)
        }
        if(this._max !== undefined && value.length > this._max) {
            return error(value, StringErrorMessage.ValueTooLong)
        }
        return ok(value);
    }
    length(len: number){
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

export const StringErrorMessage = Object.assign(BaseErrorMessage, {
    ValueNotString: "value is not a string",
    ValueTooShort: "value is too short",
    ValueTooLong: "value is too long",
} as const)