import { z } from 'zod';

export const DayDataSchema = z.object({
    day_int: z.number().int(),
    metadata: z.record(z.string(), z.any()),
    user_id: z.string()
});

export const MonthDataSchema = z.object({
    month_int: z.number().int(),
    metadata: z.record(z.string(), z.any()),
    user_id: z.string()
});

export type DayData = z.infer<typeof DayDataSchema>;
export type MonthData = z.infer<typeof MonthDataSchema>;
