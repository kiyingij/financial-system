import { customerRepository } from "@/repositories/customer.repository";
import { CustomerInput } from "@/validators/customer.schema";
import { numberingService } from "@/services/numbering.service";
import { ApiError } from "@/lib/errors/api-error";

export class CustomerService {
  async createCustomer(
    data: CustomerInput,
    user: {
      id: string;
      companyId: string | null;
    }
  ) {
    if (!user.companyId) {
      throw new ApiError(
        "User is not assigned to a company.", 
        400
    );
    }

    const customerNumber =
      await numberingService.next("CUSTOMER");

    return customerRepository.create({
      customerNumber,

      customerName: data.customerName,
      companyName: data.companyName,

      email: data.email || null,

      phone: data.phone,
      alternativePhone: data.alternativePhone,

      tinNumber: data.tinNumber,
      vatNumber: data.vatNumber,

      address: data.address,
      city: data.city,
      country: data.country,

      creditLimit:
        data.creditLimit !== undefined
            ? data.creditLimit.toString()
            : undefined,

      openingBalance:
        data.openingBalance.toString(),

      
      notes: data.notes,

      isActive: data.isActive,

      company: {
        connect: {
          id: user.companyId,
        },
      },

      createdBy: {
        connect: {
          id: user.id,
        },
      },
    });
  }
}

export const customerService = new CustomerService();