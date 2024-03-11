import { NextResponse } from "next/server";
import prisma from "./index";
import { ReservationCreate } from "@/models/reservation.interface";

export const updateAsync = async (reservationId: string, status: string) => {
  let response: NextResponse = new NextResponse();
  const reservation = await prisma.reservation.findFirst({
    where: { id: reservationId },
  });

  if (reservation) {
    const result = await prisma.reservation.update({
      where: {
        id: reservation.id,
      },
      data: {
        status: status,
      },
    });
    response = NextResponse.json(result, {
      status: 200,
      statusText: "reservations",
    });
  } else {
    response = NextResponse.json(null, {
      status: 400,
      statusText: "This reservation does not exists",
    });
  }
  return response;
};

export const getAsync = async (userId: string) => {
  let result;
  let filter = {};
  let response: NextResponse = new NextResponse();

  const restaurant = await prisma.restaurant.findFirst({
    where: {
      userId,
    },
  });

  if (restaurant) {
    filter = { restaurantId: restaurant.id };
  } else {
    filter = { userId, status: { not: "Cancelled" } };
  }

  result = await prisma.reservation.findMany({
    where: { ...filter },
    orderBy: {
      date: "desc",
    },
    include: {
      restaurant: true,
      table: true,
      user: true,
    },
  });

  response = NextResponse.json(result, {
    status: 200,
    statusText: "reservations",
  });
  return response;
};

export const createAsync = async (reservation: ReservationCreate) => {
  let response: NextResponse = new NextResponse();
  const resDate = reservation.date + ":00.000Z";
  const date = new Date(resDate);
  let endDate = new Date(date);
  endDate.setHours(date.getHours() + 1);

  const tableReserved = await prisma.reservation.findFirst({
    where: {
      tableId: reservation.tableId,
      status: {
        not: "Rejected",
      },
      endDate: {
        gt: date,
        lte: endDate,
      },
    },
  });

  if (tableReserved) {
    response = NextResponse.json(
      {
        error: {
          date: true,
        },
      },
      {
        status: 400,
        statusText: "table reserved",
      }
    );
  } else {
    const result = await prisma.reservation.create({
      data: {
        tableId: reservation.tableId,
        restaurantId: reservation.restaurantId,
        date: date,
        endDate: endDate,
        userId: reservation.userId,
        status: "Pending",
      },
    });
    response = NextResponse.json(result, {
      status: 201,
      statusText: "reservation created",
    });
  }
  return response;
};
