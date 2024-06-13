import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    cookies().delete("token")
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
