import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "@/utils/jwt";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
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

    const payload = await jwtUtils.verify(token);

    return NextResponse.json({
      success: true,
      payload,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }
}