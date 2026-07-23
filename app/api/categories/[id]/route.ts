import { NextRequest, NextResponse } from "next/server";

import { categoryService } from "@/services/category.service";


export async function DELETE(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {

    const { id } =
      await context.params;


    await categoryService.delete(id);


    return NextResponse.json({
      success: true,
      message: "Category deleted",
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



export async function PUT(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {

    const { id } =
      await context.params;


    const body =
      await request.json();


    const category =
      await categoryService.update(
        id,
        body
      );


    return NextResponse.json({
      success: true,
      data: category,
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