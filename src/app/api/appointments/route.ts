import { connectToDatabase } from "@/app/utils/databaseConnectionClient";
import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

type AppointmentFormData = {
  name: string;
  fatherName: string;
  city: string;
  education: string;
  lastDegreeName: string;
  university: string;
  scholarshipCountry: string;
  levelFor: string;
  contactNumber: string;
  email: string;
  confirmationReceipt: Buffer | null;
  appointment_day: string;
  package: string;
  timezone: string;
};



export async function POST(request: NextRequest) {
  try {
    const formData: AppointmentFormData = await request.json();
    
    const db = await connectToDatabase();
    const result = await db.collection("appointments").insertOne({
      ...formData,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Appointment created successfully",
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Error saving appointment:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to create appointment",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");
  
      const db = await connectToDatabase();
  
      if (id) {
        const appointment = await db.collection("appointments").findOne({
          _id: new ObjectId(id),
        });
  
        if (!appointment) {
          return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
        }
        if (appointment.confirmationReceipt && appointment.confirmationReceipt.data) {
            appointment.confirmationReceipt = Buffer.from(appointment.confirmationReceipt.data).toString('base64');
        } else {
            appointment.confirmationReceipt = null; 
        }
  
        return NextResponse.json(appointment);
      }
  
      const allAppointments = await db.collection("appointments").find({}, { projection: { confirmationReceipt: 0 } }).toArray();
            const processedAppointments = allAppointments.map((appointment) => {
        if (appointment.confirmationReceipt && appointment.confirmationReceipt.data) {
            appointment.confirmationReceipt = Buffer.from(appointment.confirmationReceipt.data).toString('base64');
        } else {
            appointment.confirmationReceipt = null; 
        }
        return appointment;
      });

      return NextResponse.json(processedAppointments);
  
    } catch (error) {
      console.error("Error retrieving appointment(s):", error);
      return NextResponse.json({ error: "Failed to retrieve appointment(s)" }, { status: 500 });
    }
}