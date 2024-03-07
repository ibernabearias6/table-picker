import { NextResponse } from "next/server";
import prisma from "../../prisma/index";
import { ReservationCreate } from "@/models/reservation.interface";

export const createAsync = async (reservation: ReservationCreate) => {
  let response: NextResponse = new NextResponse();
  const date = new Date(reservation.date);
  const result = await prisma.reservation.create({
    data: {
      tableId: reservation.tableId,
      date: date,
      endDate: new Date(date.setHours(date.getHours() + 1)),
      userId: reservation.userId,
      status: "Pending"
    },
  });
  response = NextResponse.json(result, {
    status: 201,
    statusText: "reservation created",
  });
};
