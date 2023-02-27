export class DefBase {
    private _optional = false;
    constructor() { }
    optional() {
        this._optional = true;
        return this;
    }
    required() {
        this._optional = false;
        return this;
    }
}