import FieldBuilder from './fieldBuilder';

const DEFAULT_OPTS = {
    trigger: 'blur'
};

export default class RulesBuilder {
    constructor (defaultOpts) {
        this.defaultOpts = { ...DEFAULT_OPTS, ...defaultOpts };
    }

    field (field, fieldName, opts) {
        const b = new FieldBuilder(field, fieldName, { ...this.defaultOpts, ...opts });
        this.fields.push(b);
        return b;
    }

    build () {
        const rules = {};
        this.fields.forEach(f => {
            rules[f.field] = f.rules;
        });
        return rules;
    }
}
