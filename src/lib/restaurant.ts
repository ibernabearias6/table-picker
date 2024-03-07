import { RestaurantCreate } from "@/models/restaurant.interface";
import { NextResponse } from "next/server";
import prisma from "../../prisma/index";

export const getAllAsync = async () => {
  const restaurants = await prisma.restaurant.findMany({
    include: { tables: true },
  });
  return NextResponse.json(restaurants, {
    status: 200,
  });
};

export const createAsync = async (restaurant: RestaurantCreate) => {
  let response: NextResponse = new NextResponse();
  const existingResponse = await checkRestaurantExistence(restaurant.name);

  if (!existingResponse) {
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
  } else {
    response = existingResponse;
  }
  return response;
};

export const checkRestaurantExistence = async (name?: string) => {
  const existing = await prisma.restaurant.findFirst({
    where: { name },
  });

  if (existing) {
    return NextResponse.json(
      {
        error: {
          restaurantName: true,
        },
      },
      {
        status: 201,
        statusText: "restaurant already exists",
      }
    );
  }
};
