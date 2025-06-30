import { connectToDatabase } from "@/app/utils/databaseConnectionClient";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    const db = await connectToDatabase();

    const appointment = await db.collection("appointments").findOne(
      {
        _id: new ObjectId(id),
      },
      {
        projection: {
          _id:0,
          name: 0,
          fatherName: 0,
          city: 0,
          education: 0,
          lastDegreeName: 0,
          university: 0,
          scholarshipCountry: 0,
          levelFor: 0,
          contactNumber: 0,
          email: 0,
          appointment_day: 0,
          package: 0,
          timezone: 0,
          createdAt: 0,
        },
      }
    );

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }
    if (
      appointment.confirmationReceipt &&
      appointment.confirmationReceipt.data
    ) {
      appointment.confirmationReceipt = Buffer.from(
        appointment.confirmationReceipt.data
      ).toString("base64");
    } else {
      appointment.confirmationReceipt = null;
    }

    return NextResponse.json(
      {
        message: "success",
        appointment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving appointment:", error);
    return NextResponse.json(
      { error: "Failed to retrieve appointment" },
      { status: 500 }
    );
  }
}
