import { isUndefined } from "../types";
import { error } from "./return";

export class DefBase {
    private _optional = false;
    constructor() { }
    safeParse(value: any) {
        if(!this._optional && isUndefined(value)) {
            return error(value, BaseErrorMessage.ValueIsUndefined)
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