import { ZodObject, ZodRawShape, ZodFirstPartySchemaTypes } from "zod";

export function useZodFormFields(schema: ZodObject<ZodRawShape>) {
  return Object.entries(schema.shape).map(([key, value]) => {
    const fieldType = (value as ZodFirstPartySchemaTypes)._def.typeName;

    let type: string;
    switch (fieldType) {
      case "ZodString":
        type = "text";
        break;
      case "ZodNumber":
        type = "number";
        break;
      case "ZodBoolean":
        type = "checkbox";
        break;
      case "ZodDate":
        type = "date";
        break;
      default:
        type = "text";
        break;
    }

    return { name: key, type, validation: value };
  });
}
