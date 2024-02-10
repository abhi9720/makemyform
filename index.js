const { validateSchema } = require("./SchemaValidator");

const FormField = require('./FormField');

class MakeMyForm {
    constructor (formConfig) {

        const validationResult = validateSchema(formConfig);
        if (validationResult !== undefined) {
            throw new Error(JSON.stringify(validationResult));
        }

        this.title = formConfig.form.title;
        this.description = formConfig.form.description;
        this.fields = formConfig.form.fields.map(fieldConfig => new FormField(fieldConfig));
    }

    static createForm(jsonConfig) {
        try {
            const form = new MakeMyForm(jsonConfig);
            return form.compile();
        } catch (error) {
            throw error;
        }
    }

    compile() {
        let html = `<form>`;
        html += `<h2>${this.title}</h2>`;
        html += `<p>${this.description}</p>`;

        this.fields.forEach(field => {
            try {
                html += field.generateHtml();
            } catch (error) {
                throw error
            }
        });

        html += `<button type="submit">Submit</button>`;
        html += `</form>`;
        return html;
    }

}

module.exports = MakeMyForm;
