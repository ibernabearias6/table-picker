import { RestaurantCreate } from "@/models/restaurant.interface";
import { NextResponse } from "next/server";
import prisma from "../../prisma/index";

export const createAsync = async (restaurant: RestaurantCreate) => {
  let response: NextResponse = new NextResponse();
  const existing = await prisma.restaurant.findFirst({
    where: { name: restaurant.name },
  });

  if (existing) {
    response = NextResponse.json(null, {
      status: 201,
      statusText: "restaurant already exists",
    });
  } else {
    const result = await prisma.restaurant.create({
      data: {
        name: restaurant.name,
        userId: restaurant.userId,
        available: true,
      },
    });
    response = NextResponse.json(result, {
      status: 201,
      statusText: "restaurant created",
    });
  }
  return response;
};
