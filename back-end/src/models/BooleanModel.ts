import { z } from "zod";

const BooleanSchema = z.union([z.boolean(), z.number()]).transform(v => typeof v === "boolean" ? v : v !== 0);

type CustomBoolean = z.infer<typeof BooleanSchema>;

export { BooleanSchema };
export type { CustomBoolean };