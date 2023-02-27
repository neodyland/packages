import { DefString, StringErrorMessage } from "./string";
import { DefBase, BaseErrorMessage } from "./base";

export const string = () => new DefString();

export const any = () => new DefBase();

export {
    StringErrorMessage,
    BaseErrorMessage as AnyErrorMessage,
}