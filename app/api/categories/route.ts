import { NextRequest, NextResponse } from "next/server";

import { categoryService } from "@/services/category.service";


export async function GET() {
  try {
    const categories =
      await categoryService.getAll();

    return NextResponse.json({
      success: true,
      data: categories,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}


export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    const category =
      await categoryService.create(body);

    return NextResponse.json({
      success: true,
      data: category,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}