import { schema } from "./data";

function parsingEditor(inputEditor: object): boolean 
{
    const Ajv = require("ajv")
    const ajv = new Ajv({ strictTypes: false })
    const validate = ajv.compile(schema)
    const valid = validate(inputEditor)
    return valid
}

export { parsingEditor }