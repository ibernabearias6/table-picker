import { createAsync } from "@/lib/restaurant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let response;
  try {
    const restaurant = await request.json();
    const result = await createAsync(restaurant);
    response = result;
  } catch (error: any) {
    response = NextResponse.json(null, {
      status: 500,
      statusText: "Server error",
    });
  }
  return response;
}
