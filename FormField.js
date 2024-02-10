const { JSDOM } = require('jsdom');

class FormField {
    constructor (fieldConfig) {
        this.label = fieldConfig.label;
        this.element = fieldConfig.element;
        this.validation = fieldConfig.validation || null;
        this.options = fieldConfig.options || [];
        this.attributes = fieldConfig.attributes || {};
    }

    generateHtml() {
        const dom = new JSDOM();
        const document = dom.window.document;
        let container = document.createElement('div');

        if (this.label) {
            let labelElement = document.createElement('label');
            labelElement.textContent = this.label;
            container.appendChild(labelElement);
            if (this.validation?.required) {
                labelElement.innerHTML += " *";
            }
        }

        switch (this.element) {
            case 'text':
            case 'password':
            case 'email':
            case 'number':
                container.appendChild(this.generateInputHtml(document, this.element));
                break;
            case 'textarea':
                container.appendChild(this.generateTextareaHtml(document));
                break;
            case 'button':
                container.appendChild(this.generateButtonHtml(document));
                break;
            case 'fieldset':
                container.appendChild(this.generateFieldsetHtml(document));
                break;
            case 'legend':
                container.appendChild(this.generateLegendHtml(document));
                break;
            case 'form':
                container.appendChild(this.generateFormHtml(document));
                break;
            case 'select':
                container.appendChild(this.generateSelectHtml(document));
                break;
            case 'radio':
                this.generateRadioHtml(document, container);
                break;
            case 'checkbox':
                this.generateCheckboxHtml(document, container);
                break;
            case 'file': // Handle Upload Photo
                container.appendChild(this.generateFileInputHtml(document));
                break;
            case 'date': // Handle Date of Birth
                container.appendChild(this.generateDateInputHtml(document));
                break;
            default:
                throw new Error(`Invalid form element specified : ${this.element}`);
        }

        return container.outerHTML;
    }

    generateInputHtml(document, type) {
        let inputElement = document.createElement('input');
        inputElement.setAttribute('type', type || 'text');
        if (this.validation) {
            if (this.validation.regex !== undefined) {
                inputElement.setAttribute('pattern', this.validation.regex);
            }
            if (this.validation.minLength !== undefined) {
                inputElement.setAttribute('minlength', this.validation.minLength);
            }
            if (this.validation.maxLength !== undefined) {
                inputElement.setAttribute('maxlength', this.validation.maxLength);
            }
            if (this.validation.minValue !== undefined) {
                inputElement.setAttribute('min', this.validation.minValue);
            }
            if (this.validation.maxValue !== undefined) {
                inputElement.setAttribute('max', this.validation.maxValue);
            }
        }

        this.setCustomAttributes(inputElement);
        return inputElement;
    }

    generateTextareaHtml(document) {
        let textareaElement = document.createElement('textarea');
        this.setCustomAttributes(textareaElement);
        return textareaElement;
    }

    generateButtonHtml(document) {
        let buttonElement = document.createElement('button');
        buttonElement.textContent = this.label;
        this.setCustomAttributes(buttonElement);
        return buttonElement;
    }

    generateFieldsetHtml(document) {
        let fieldsetElement = document.createElement('fieldset');
        let legendElement = document.createElement('legend');
        legendElement.textContent = this.label;
        fieldsetElement.appendChild(legendElement);
        return fieldsetElement;
    }

    generateLegendHtml(document) {
        let legendElement = document.createElement('legend');
        legendElement.textContent = this.label;
        return legendElement;
    }

    generateFormHtml(document) {
        let formElement = document.createElement('form');
        let h2Element = document.createElement('h2');
        h2Element.textContent = this.label;
        formElement.appendChild(h2Element);
        this.setCustomAttributes(formElement);
        return formElement;
    }

    generateSelectHtml(document) {
        let selectElement = document.createElement('select');
        this.options.forEach(option => {
            let optionElement = document.createElement('option');
            optionElement.textContent = option.label;
            optionElement.setAttribute('value', option.value);
            selectElement.appendChild(optionElement);
        });
        this.setCustomAttributes(selectElement);
        return selectElement;
    }

    generateRadioHtml(document, container) {
        this.options.forEach(option => {
            let radioContainer = document.createElement('div');
            let radioElement = document.createElement('input');
            radioElement.setAttribute('type', 'radio');
            radioElement.setAttribute('name', option.name || this.generateRandomName());
            radioElement.setAttribute('value', option.value);
            if (this.validation?.required) {
                radioElement.setAttribute('required', '');
            }
            let labelElement = document.createElement('label');
            labelElement.setAttribute('for', radioElement.name);
            labelElement.textContent = option.label;
            radioContainer.appendChild(radioElement);
            radioContainer.appendChild(labelElement);
            container.appendChild(radioContainer);
        });
    }

    generateCheckboxHtml(document, container) {
        this.options.forEach(option => {
            let checkboxContainer = document.createElement('div');
            let checkboxElement = document.createElement('input');
            checkboxElement.setAttribute('type', 'checkbox');
            checkboxElement.setAttribute('name', option.name || this.generateRandomName());
            checkboxElement.setAttribute('value', option.value);
            if (this.validation?.required) {
                checkboxElement.setAttribute('required', '');
            }
            let labelElement = document.createElement('label');
            labelElement.setAttribute('for', checkboxElement.name);
            labelElement.textContent = option.label;
            checkboxContainer.appendChild(checkboxElement);
            checkboxContainer.appendChild(labelElement);
            container.appendChild(checkboxContainer);
        });
    }

    generateFileInputHtml(document) {
        let fileInputElement = document.createElement('input');
        fileInputElement.setAttribute('type', 'file');
        if (this.validation?.required) {
            fileInputElement.setAttribute('required', '');
        }
        this.setCustomAttributes(fileInputElement);
        return fileInputElement;
    }

    generateDateInputHtml(document) {
        let dateInputElement = document.createElement('input');
        dateInputElement.setAttribute('type', 'date');
        if (this.validation?.required) {
            dateInputElement.setAttribute('required', '');
        }
        this.setCustomAttributes(dateInputElement);
        return dateInputElement;
    }

    setCustomAttributes(element) {
        for (const [key, value] of Object.entries(this.attributes)) {
            element.setAttribute(key, value);
        }
    }

    generateRandomName() {
        return 'default_name_' + Math.floor(Math.random() * 1000);
    }
}

module.exports = FormField;
