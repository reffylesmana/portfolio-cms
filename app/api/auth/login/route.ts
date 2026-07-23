import { NextRequest, NextResponse } from "next/server";

import { loginSchema } from "@/validators/auth.validator";
import { authService } from "@/services/auth.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { username, password } = result.data;

    const resultLogin = await authService.login(username, password);

    const response = NextResponse.json({
      success: true,
      admin: resultLogin.admin,
    });

    response.cookies.set({
      name: "token",
      value: resultLogin.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    return response;
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