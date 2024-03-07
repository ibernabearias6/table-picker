import { NextResponse } from "next/server";
import prisma from "../../prisma/index";
import { ReservationCreate } from "@/models/reservation.interface";

export const getAsync = async (userId: string) => {
  let response: NextResponse = new NextResponse();
  const result = await prisma.reservation.findMany({
    where: { userId },
  });
  response = NextResponse.json(result, {
    status: 200,
    statusText: "reservations",
  });
  return response;
};

export const createAsync = async (reservation: ReservationCreate) => {
  let response: NextResponse = new NextResponse();
  const date = new Date(reservation.date);
  const endDate = new Date(date.setHours(date.getHours() + 1));

  const tableReserved = await prisma.reservation.findFirst({
    where: {
      tableId: reservation.tableId,
      status: {
        not: "Rejected",
      },
      date: {
        lt: endDate,
        gte: date,
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
