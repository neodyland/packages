export function isString(value: any): value is string {
    return typeof value === 'string';
}

export function isNumber(value: any): value is number {
    return typeof value === "number";
}

export function isBoolean(value: any): value is boolean {
    return typeof value === "boolean";
}

export function isUndefined(value: any): value is undefined {
    return value === undefined;
}

export function isNull(value: any): value is null {
    return value === null;
}

export function isObject(value: any): value is object {
    return typeof value === "object";
}

export function isArray(value: any): value is any[] {
    return Array.isArray(value);
}

export function isFunction(value: any): value is Function {
    return typeof value === "function";
}

export function isAny(value: any): value is any {
    return true;
}