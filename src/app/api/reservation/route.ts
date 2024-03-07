import { createAsync, getAsync } from "@/lib/reservation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let response;
  try {
    const reservation = await request.json();
    const result = await createAsync(reservation);
    response = result;
  } catch (error: any) {
    response = NextResponse.json(null, {
      status: 500,
      statusText: "Server error",
    });
  }
  return response;
}

export async function GET(request: NextRequest) {
  let response;
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const result = await getAsync(userId || "");
    response = result;
  } catch (error: any) {
    response = NextResponse.json(null, {
      status: 500,
      statusText: "Server error",
    });
  }
  return response;
}
