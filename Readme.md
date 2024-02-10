## MakeMyForm
![MIT license](https://img.shields.io/badge/License-MIT-blue.svg?longCache=true)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?longCache=true)
![NPM: released](https://img.shields.io/npm/v/makemyform.svg)


---

### Description

MakeMyForm is a simple and lightweight JavaScript library designed to generate HTML forms dynamically based on JSON input. It provides an easy way to create custom HTML forms using a JSON schema.

---

### Dependencies

MakeMyForm relies on the following npm packages:

- **Ajv**: A JSON Schema validator for Node.js and browser. It is used for validating the JSON schema input provided by the user.

  ![Ajv](https://img.shields.io/npm/v/ajv.svg)

- **Jsdom**: A pure-JavaScript implementation of many web standards, notably the WHATWG DOM and HTML Standards. It is used for parsing and manipulating HTML documents in Node.js.

  ![Jsdom](https://img.shields.io/npm/v/jsdom.svg)
---

### Installation

You can install MakeMyForm via npm:

```bash
npm install makemyform
```

---

### Usage

#### Schema Format

The library expects a JSON schema following a specific format:

```json
{
    "form": {
        "title": "string",
        "description": "string",
        "fields": [
            {
                "label": "string",
                "element": "string",
                "options": [
                    {
                        "name": "string",
                        "label": "string",
                        "value": "string"
                    }
                ],
                "validation": {
                    "required": "boolean",
                    "regex": "string",
                    "minLength": "number",
                    "maxLength": "number",
                    "minValue": "number",
                    "maxValue": "number"
                },
                "attributes": {
                    "attributeName": "value"
                }
            }
        ]
    }
}
```

#### Example Usage

```javascript
const MakeMyForm = require("makemyform");

const jsonFormData = {
    "form": {
        "title": "Student Registration Form",
        "description": "Form for registering students at the university",
        "fields": [
            {
                "label": "Enter your Email",
                "element": "email",
                "validation": {
                    "required": true
                }
            },
            {
                "label": "Enter your password",
                "element": "password",
                "validation": {
                    "minLength": 5,
                    "maxLength": 10,
                    "required": true
                }
            }
        ]
    }
};

const htmlOutput = MakeMyForm.createForm(jsonFormData);

console.log(htmlOutput);
```

#### Output

```html
<form>
    <h2>Student Registration Form</h2>
    <p>Form for registering students at the university</p>
    <div>
        <label>Enter your Email *</label>
        <input type="email">
    </div>
    <div>
        <label>Enter your password *</label>
        <input type="password" minlength="5" maxlength="10">
    </div>
    <button type="submit">Submit</button>
</form>
```

---

### Repository
[![GitHub issues](https://img.shields.io/github/issues/abhi9720/makemyform)](https://github.com/abhi9720/makemyform/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/abhi9720/makemyform)](https://github.com/abhi9720/makemyform/pulls)

[GitHub Repository](https://github.com/abhi9720/makemyform)



---

### License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/abhi9720/makemyform/blob/main/LICENSE) file for details.
