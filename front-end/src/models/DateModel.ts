import { z } from "zod";

const DateSchema = z.preprocess((v) => {
  if (typeof v === 'string' || typeof v === 'number') {
    const parsed = new Date(v);
    return isNaN(parsed.getTime()) ? v : parsed;
  }
  return v;
}, z.date());

export { DateSchema };