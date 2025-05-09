+++
title = "How to validate a JSON in Python"
description = "How to validate a JSON in Python using JSON Schema."
date = "2023-03-08"
updated = "2024-01-13"
[extra]
social_media_card = "/images/posts/json-validation.webp"

[taxonomies]
tags=["python", "json", "apis", "api-testing", "json-schema", "pydantic"]

+++

_Edit on 13 Jan 2024:_

Pydantic looks to be a better alternative than the schema validation mentioned in the original post below. Please look into [JSON - Pydantic](https://docs.pydantic.dev/2.5/concepts/json/) to learn how to validate and parse a JSON using Pydantic. Here is a code snippet from the documentation:

```python
from datetime import date
from pydantic import BaseModel, ConfigDict, ValidationError


class Event(BaseModel):
    model_config = ConfigDict(strict=True)
    when: date
    where: tuple[int, int]


json_data = '{"when": "1987-01-28", "where": [51, -1]}'
print(Event.model_validate_json(json_data))
#> when=datetime.date(1987, 1, 28) where=(51, -1)

try:
    Event.model_validate({'when': '1987-01-28', 'where': [51, -1]})
except ValidationError as e:
    print(e)
    """
    2 validation errors for Event
    when
      Input should be a valid date [type=date_type, input_value='1987-01-28', input_type=str]
    where
      Input should be a valid tuple [type=tuple_type, input_value=[51, -1], input_type=list]
    """
```

_Original Post:_

## Introduction

JSONSchema validation is a powerful tool for validating JSON data. It helps ensure that the data you receive conforms to a particular schema or structure. With JSONSchema validation, you can define the expected format of the JSON data and then validate it against that schema. This is particularly useful when working with APIs or other data sources that provide JSON data.

Here is an example of how to use JSONSchema validation in Python:

First, we need to install the `jsonschema` Library. You can do this using pip:

```bash
pip install jsonschema
```

Next, we'll create a JSON schema that defines the structure of our expected data. Here's an example schema:

```json
schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "age": {"type": "integer"},
        "email": {"type": "string", "format": "email"},
        "address": {"type": "string"}
    },
    "required": ["name", "age"]
}
```

This schema defines an object with four properties: name, age, email, and address. The name and age properties are required. The email property must be a valid email address.

Now, let's create some JSON data that we want to validate against this schema:

```json
data = {
    "name": "John Doe",
    "age": 30,
    "email": "john.doe@example.com",
    "address": "123 Main St."
}
```

Finally, we'll use the `jsonschema` Library to validate our data against the schema:

```python
import jsonschema
from loguru import logger

class JSONSchemaValidator:
    @classmethod
    def validate(cls, json_data: dict, schema: dict):
        validator = jsonschema.Draft7Validator(schema)
        errors = validator.iter_errors(json_data)
        err_list = []
        for error in errors:
            logger.error(f"The JSON data is not valid: {error=}")
            err_list.append(error)
        return err_list
```

That's it! With just a few lines of code, we've used JSONSchema validation to ensure that our JSON data conform to a particular structure. This can be incredibly useful when working with APIs or other data sources that provide JSON data.

## JSON schema Keywords

### anyOf

This keyword is used to specify a list of schemas where at least one schema must validate the data. Here's an example:

```python
schema = {
    "anyOf": [
        {"type": "string"},
        {"type": "number"}
    ]
}
```

This schema defines the data as a string or a number. If the data is a string, it must be a valid string; if it's a number, it must be a valid number.

### allOf

This keyword is used to specify a list of schemas, where all of them must validate the data. Here's an example:

```python
schema = {
    "allOf": [
        {"type": "object"},
        {"required": ["name", "age"]}
    ]
}
```

This schema defines the data as an object with the properties "name" and "age". If any of these conditions are not met, the validation will fail.

### OneOf

To validate against `oneOf`, the given data must be valid against **exactly one** of the given subschemas. Here's an example:

```python
schema = {
  "oneOf": [
    { "type": "number", "multipleOf": 5 },
    { "type": "number", "multipleOf": 3 }
  ]
}
```

Here the field can be either a multiple of 3 or 5, like 100, 12, 18. However, the validation will fail if it happens to be a multiple of 3 and 5, like 15, 90, or 150.

### enum

This keyword is used to specify a list of allowed values for the data. Here's an example:

```python
schema = {
    "type": "string",
    "enum": ["red", "green", "blue"]
}
```

This schema defines that the data must be a string and can only be one of the values "red," "green," or "blue." Any other value will fail validation.

### if/else

These keywords are used to define conditional schemas. The `if` schema is tested first, and if it validates the data, the `then` schema is used. If the `if` schema fails, the `else` schema is used (if it exists). Here's an example:

```python
schema = {
    "type": "object",
    "properties": {
        "is_employee": {"type": "boolean"},
        "salary": {"type": "number"}
    },
    "if": {"properties": {"is_employee": {"const": True}}},
    "then": {"required": ["salary"]},
    "else": {"not": {"required": ["salary"]}}
}
```

This schema defines that if the `is_employee` property is `True`, the `salary` property is required. If the `is_employee` property is `False`, the `salary` property is not allowed.

### type

This keyword is used to specify the type of data expected. Here's an example:

```python
schema = {"type": "string"}
```

This schema defines that the data must be a string.

### format

This keyword is used to specify a format for a string or number. Here's an example:

```python
schema = {"type": "string", "format": "email"}
```

This schema defines that the data must be a string in email format.

### properties

This keyword is used to define an object's properties and schemas. Here's an example:

```python
schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "age": {"type": "integer"}
    }
}
```

This schema defines the data as an object with the properties "name" and "age". The "name" property must be a string, and the "age" property must be an integer.

### **additionalProperties**

This keyword is used to specify whether additional properties are allowed in an object. Here's an example:

```python
schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "age": {"type": "integer"}
    },
    "additionalProperties": False
}
```

This schema defines that only the "name" and "age" properties are allowed in the object. Any additional properties will not be permitted. To enable you can make the value `` True` ``

### items

This keyword is used to specify the schema of the items in an array. Here's an example:

```python
schema = {
    "type": "array",
    "items": {"type": "string"}
}
```

### **required**

This keyword is used to define the required properties of an object. Here's an example:

```python
schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "age": {"type": "integer"}
    },
    "required": ["name", "age"]
}
```

This schema defines the required "name" and "age" properties.

### minimum/maximum

The `minimum` keyword is used to specify the minimum value of a number. Similarly, the `maximum` keyword is used for maximum value. Here's an example:

```python
schema = {"type": "number", "minimum": 0, "maximum": 100}
```

### pattern

This keyword is used to specify a regular expression pattern that the data must match. Here's an example:

```python
schema = {"type": "string", "pattern": "^\\d{3}-\\d{2}-\\d{4}$"}
```

This schema defines that the data must be a string that matches the pattern of a social security number.

### **minLength/maxLength**

The \`**minLength\`** keyword is used to specify the minimum length of a string, and \`**maxLength**\` for the maximum length. Here's an example:

```python
schema = {"type": "string", "minLength": 5, "maxLength": 10}
```

This schema defines that the data must be a string of at least five characters and a maximum of 10 characters.

To learn more about the possible keywords, follow the [Understanding JSON Schema — Understanding JSON Schema 2020-12 documentation (](https://json-schema.org/understanding-json-schema/)[json-schema.org](https://json-schema.org)[)](https://json-schema.org/understanding-json-schema/).
