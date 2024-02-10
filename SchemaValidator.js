const Ajv = require("ajv");
const schema = require("./schema.json");

class SchemaValidator {
    static validateSchema(formConfig) {
        const ajv = new Ajv({ allowUnionTypes: true });
        const validate = ajv.compile(schema);

        const isValid = validate(formConfig);

        if (!isValid) {
            return validate.errors;
        }
    }
}

module.exports = SchemaValidator;
