import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/**
 * Customer Repository
 *
 * Responsible ONLY for database operations.
 */
export class CustomerRepository {

  /**
   * Create a new customer
   */
  async create(data: Prisma.CustomerCreateInput) {
    return prisma.customer.create({
      data,
    });
  }

  /**
   * Get all customers
   */
  async findAll() {
    return prisma.customer.findMany({
      include: {
        company: true,
        createdBy: true,
      },
      orderBy: {
        customerNumber: "asc",
      },
    });
  }

  /**
   * Find customer by ID
   */
  async findById(id: string) {
    return prisma.customer.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
        createdBy: true,
      },
    });
  }

  /**
   * Update customer
   */
  async update(
    id: string,
    data: Prisma.CustomerUpdateInput
  ) {
    return prisma.customer.update({
      where: {
        id,
      },
      data,
    });
  }

  /**
   * Delete customer
   */
  async delete(id: string) {
    return prisma.customer.delete({
      where: {
        id,
      },
    });
  }
}

export const customerRepository = new CustomerRepository();