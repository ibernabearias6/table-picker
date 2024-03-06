import { createAsync } from "../../../lib/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let response;
  try {
    const user = await request.json();
    const result = await createAsync(user);
    response = result;
  } catch (error: any) {
    response = NextResponse.json(null, {
      status: 500,
      statusText: "Server error",
    });
  }
  return response;
}
