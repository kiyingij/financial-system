import { prisma } from "@/lib/prisma";

/**
 * Numbering Service
 *
 * Generates unique document numbers
 * such as:
 *
 * CUST-000001
 * SUP-000001
 * INV-000001
 */
export class NumberingService {

  /**
   * Generate the next document number.
   */
  async next(name: string): Promise<string> {

    return await prisma.$transaction(async (tx) => {

      const counter = await tx.counter.findUnique({
        where: {
          name,
        },
      });

      if (!counter) {
        throw new Error(`Counter '${name}' does not exist.`);
      }

      const updated = await tx.counter.update({
        where: {
          id: counter.id,
        },
        data: {
          value: {
            increment: 1,
          },
        },
      });

      const number = updated.value
        .toString()
        .padStart(updated.digits, "0");

      return `${updated.prefix}-${number}`;
    });

  }

}

export const numberingService = new NumberingService();