import { schema } from "./data"

function parsingEditor(inputEditor: object): { valid: boolean, errors?: any[] } {
    const Ajv = require("ajv")
    const ajv = new Ajv({ allErrors: true, logger: false })
    const validate = ajv.compile(schema)
    const valid = validate(inputEditor)
    return { valid }
}

export { parsingEditor }