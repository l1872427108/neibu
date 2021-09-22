export default class FieldBuilder {
    constructor (field, fieldName, defaultOpts) {
        this.field = field;
        this.defaultOpts = { fullField: fieldName, ...defaultOpts };
    }

    append (rule, opts) {
        this.rules.push(Object.assign(rule, this.defaultOpts, opts));
        return this;
    }

    fixedLength (opts) {
        return this.append({ len: 3, pattern: '^[A-Za-z]+$' }, opts);
    }

    required (otherRules, opts) {
        return this.append({ required: true, ...otherRules }, opts);
    }

    NumberAndString (opts) {
        this.required({ max: 10, pattern: '^[A-Za-z0-9]+$' }, opts);
    }

    typeStringRequired (opts) {
        this.required({ type: 'array' }, opts);
    }

    typesNumberRequired (opts) {
        this.required({ type: 'number' }, opts);
    }

    min (value, opts) {
        return this.append({ max: value }, opts);
    }

    range (min, max, opts) {
        return this.append({ min, max }, opts);
    }
}
