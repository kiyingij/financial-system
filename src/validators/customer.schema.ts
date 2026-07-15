import { z } from "zod";

/**
 * Customer validation schema
 */
export const customerSchema = z.object({
  customerName: z
    .string()
    .min(3, "Customer name must be at least 3 characters."),

  companyName: z.string().optional(),

  email: z
    .email("Invalid email address.")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .min(10, "Phone number is required."),

  alternativePhone: z.string().optional(),

  tinNumber: z.string().optional(),

  vatNumber: z.string().optional(),

  address: z.string().optional(),

  city: z.string().optional(),

  country: z.string().optional(),

  creditLimit: z.coerce.number().optional(),

  openingBalance: z.coerce.number().default(0),

  notes: z.string().optional(),

  isActive: z.boolean().default(true),
});

export type CustomerInput = z.infer<typeof customerSchema>;