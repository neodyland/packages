import { BaseErrorMessage } from "./base";
import { StringErrorMessage } from "./string";

export type SafeParseResult<T, S extends DefType> =
	| {
			value: T;
			readonly ok: true;
	  }
	| {
			error: {
				value: any;
				message: GetErrorMessage<S>;
			};
			readonly ok: false;
	  };

export type DefType =
	| "string"
	| "number"
	| "boolean"
	| "object"
	| "array"
	| "any";

export type ValueOf<T> = T[keyof T];

export type DefTypeErrorMap = {
	string: ValueOf<typeof StringErrorMessage>;
	number: ValueOf<typeof BaseErrorMessage>;
	boolean: ValueOf<typeof BaseErrorMessage>;
	object: ValueOf<typeof BaseErrorMessage>;
	array: ValueOf<typeof BaseErrorMessage>;
	any: ValueOf<typeof BaseErrorMessage>;
};

export type GetErrorMessage<T extends DefType> = DefTypeErrorMap[T];

export function ok<V>(value: V) {
	return {
		value,
		ok: true as const,
	};
}

export function error<T extends DefType>(
	value: any,
	message: GetErrorMessage<T>
) {
	return {
		error: {
			value,
			message,
		},
		ok: false as const,
	};
}
