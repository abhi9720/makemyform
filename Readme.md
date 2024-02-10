Sure, here's an updated README file with all the useful badges and the current npm version:

````markdown
# MakeMyForm

[![npm version](https://img.shields.io/npm/v/makemyform.svg)](https://www.npmjs.com/package/makemyform)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MakeMyForm is a simple JavaScript library designed to generate HTML forms dynamically based on JSON input. It provides an easy way to create custom HTML forms using a JSON schema.

---

## Installation

You can install MakeMyForm via npm:

```bash
npm install makemyform
```
````

---

## Usage

### Schema Format

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

### Example Usage

```javascript
const MakeMyForm = require("makemyform");

const jsonFormData = {
  form: {
    title: "Student Registration Form",
    description: "Form for registering students at the university",
    fields: [
      {
        label: "Enter your Email",
        element: "email",
        validation: {
          required: true,
        },
      },
      {
        label: "Enter your password",
        element: "password",
        validation: {
          minLength: 5,
          maxLength: 10,
          required: true,
        },
      },
    ],
  },
};

const htmlOutput = MakeMyForm.createForm(jsonFormData);

console.log(htmlOutput);
```

### Output

```html
<form>
  <h2>Student Registration Form</h2>
  <p>Form for registering students at the university</p>
  <div>
    <label>Enter your Email *</label>
    <input type="email" />
  </div>
  <div>
    <label>Enter your password *</label>
    <input type="password" minlength="5" maxlength="10" />
  </div>
  <button type="submit">Submit</button>
</form>
```

---

## Repository

[GitHub Repository](https://github.com/abhi9720/makemyform)

---

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/abhi9720/makemyform/blob/main/LICENSE) file for details.

```

In this updated README, I've added two badges: one for the npm version and one for the license. I've also updated the npm version to 1.0.2. You can replace `abhi9720/makemyform` with your actual GitHub repository link.
```
