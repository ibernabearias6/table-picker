import { UserCreate } from "@/models/user.interface";
import prisma from "../../prisma/index";
import { NextResponse } from "next/server";
import { RestaurantCreate } from "@/models/restaurant.interface";
import { createAsync as createRestaurantAsync } from "./restaurant";

export const createAsync = async (user: UserCreate) => {
  let response: NextResponse = new NextResponse();
  const userType = await prisma.userType.findFirst({
    where: { type: user.type },
  });

  const existing = await prisma.user.findFirst({
    where: { user: user.user },
  });

  if (existing) {
    response = NextResponse.json(null, {
      status: 201,
      statusText: "user already exists",
    });
  } else if (userType?.id) {
    const result = await prisma.user.create({
      data: {
        user: user.user,
        password: user.password,
        typeId: userType.id,
        name: user.name,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
      },
    });

    if (user.type === "Adm" && user.restaurantName) {
      const restaurant: RestaurantCreate = {
        name: user.restaurantName,
        userId: result.id,
      };
      const res = await createRestaurantAsync(restaurant);
      console.log(res);
    }
    response = NextResponse.json(result, {
      status: 201,
      statusText: "user created",
    });
  } else {
    response = NextResponse.json(null, {
      status: 400,
      statusText: "user type not found",
    });
  }
  return response;
};
