import { UserCreate } from "@/models/user.interface";
import prisma from "../../prisma/index";
import { NextResponse } from "next/server";
import { RestaurantCreate } from "@/models/restaurant.interface";
import {
  checkRestaurantExistence,
  createAsync as createRestaurantAsync,
} from "./restaurant";

export const getUserByCredential = async (user: string, password: string) => {
  let response: NextResponse = new NextResponse();
  const result = await prisma.user.findFirst({
    where: { user, password },
    include: { type: true },
  });
  if (result) {
    response = NextResponse.json(result, {
      status: 200,
      statusText: "User found",
    });
  } else {
    response = NextResponse.json(result, {
      status: 400,
      statusText: "User Not found",
    });
  }
  return response;
};

export const createAsync = async (user: UserCreate) => {
  let response: NextResponse = new NextResponse();
  const userType = await prisma.userType.findFirst({
    where: { type: user.type },
  });

  const existing = await prisma.user.findFirst({
    where: { user: user.user },
  });

  if (existing) {
    response = NextResponse.json(
      {
        error: {
          userName: true,
        },
      },
      {
        status: 201,
        statusText: "user already exists",
      }
    );
  } else if (userType?.id) {
    if (user.type === "Adm" && user.restaurantName) {
      const existingRestaurantResponse = await checkRestaurantExistence(
        user.restaurantName
      );
      if (!existingRestaurantResponse) {
        response = await saveUserInDb(user, userType.id);
        const result = await response.json();

        const restaurant: RestaurantCreate = {
          name: user.restaurantName,
          userId: await result.typeId,
        };
        await createRestaurantAsync(restaurant);
      } else {
        response = existingRestaurantResponse;
      }
    } else {
      response = await saveUserInDb(user, userType.id);
    }
  } else {
    response = NextResponse.json(null, {
      status: 400,
      statusText: "user type not found",
    });
  }
  return response;
};

const saveUserInDb = async (user: UserCreate, userTypeId: string) => {
  const result = await prisma.user.create({
    data: {
      user: user.user,
      password: user.password,
      typeId: userTypeId,
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
    },
  });
  return NextResponse.json(result, {
    status: 201,
    statusText: "user created",
  });
};

export const saveUserInStore = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserInStore = () => {
  const result = localStorage.getItem("user");
  if (result) {
    return JSON.parse(result);
  }
  return null;
};

export const logOut = () => {
  localStorage.removeItem("user");
};
