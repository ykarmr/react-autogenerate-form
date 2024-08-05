import { useForm, UseFormReturn } from "react-hook-form";
import { z, ZodObject, ZodRawShape, ZodFirstPartySchemaTypes } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function useZodForm<T extends ZodObject<ZodRawShape>>(
  schema: T
): UseFormReturn<z.infer<T>> {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
  });
}
