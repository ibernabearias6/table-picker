import {
  RestaurantCreate,
  RestaurantEdit,
} from "@/models/restaurant.interface";
import { NextResponse } from "next/server";
import prisma from "../../prisma/index";

export const getAllAsync = async () => {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      tables: true,
    },
    where: {
      available: true,
      tables: {
        some: {
          id: {
            not: undefined,
          },
        },
      },
    },
  });
  return NextResponse.json(restaurants, {
    status: 200,
  });
};

export const editAsync = async (restaurant: RestaurantEdit) => {
  let response: NextResponse = new NextResponse();
  const existing = await checkRestaurantExistence(restaurant.name);
  const existingResponse = await existing?.json();
  if (
    (existing && existingResponse?.error?.data?.id === restaurant.id) ||
    !existing
  ) {
    const tablesResponse = await prisma.table.findMany({
      where: {
        restaurantId: restaurant.id,
      },
    });
    const tablesId = tablesResponse.map((x) => x.order);
    const tables = restaurant.tables.filter((x) => !tablesId.includes(x.order));
    const result = await prisma.restaurant.update({
      where: {
        id: restaurant.id,
      },
      data: {
        name: restaurant.name,
        available: restaurant.available,
      },
    });
    const list = tables.map((x) => ({
      restaurantId: restaurant.id,
      order: x.order,
      capacity: x.capacity,
    }));

    if (list.length > 0) {
      await prisma.table.createMany({
        data: list,
      });
    }

    response = NextResponse.json(result, {
      status: 200,
      statusText: "restaurant updated",
    });
  } else {
    response = NextResponse.json(null, {
      status: 400,
      statusText: "restaurant does not exists",
    });
  }
  return response;
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
    where: { name: name },
  });

  if (existing) {
    return NextResponse.json(
      {
        error: {
          restaurantName: true,
          data: existing,
        },
      },
      {
        status: 201,
        statusText: "restaurant already exists",
      }
    );
  }
};
