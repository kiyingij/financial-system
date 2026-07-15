import { NextRequest, NextResponse } from "next/server";

import { customerSchema } from "@/validators/customer.schema";
import { customerService } from "@/services/customer.service";
import { getCurrentUser } from "@/lib/current-user";
import { handleApiError } from "@/lib/errors/error-handler";

/**
 * GET /api/customers
 * Returns all customers.
 */
export async function GET() {
  try {
    return NextResponse.json({
      message: "Customer list endpoint coming next.",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/customers
 * Create a new customer.
 */
export async function POST(request: NextRequest) {
  try {
;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const data = customerSchema.parse(body);

    const customer =
      await customerService.createCustomer(
        data,
        {
          id: currentUser.id,
          companyId: currentUser.companyId,
        }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Customer created successfully.",
        data: customer,
      },
      {
        status: 201,
      }
    );

  } catch (error) {
    return handleApiError(error);
  }
}