import { MongoClient, ObjectId } from "mongodb";

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
  confirmationReceipt: Buffer | null; // ✅ Allow null
  appointment_day: string;
  package: string;
  timezone: string;
};

async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MongoDB URI to .env.local");
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return client.db(process.env.MONGODB_DB);
}

export async function saveAppointment(formData: AppointmentFormData) {
  try {
    const db = await connectToDatabase();

    const result = await db.collection("appointments").insertOne({
      ...formData,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "Appointment created successfully",
      id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Error saving appointment:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create appointment",
    };
  }
}

export async function getAppointment(id: string) {
  try {
    const db = await connectToDatabase();
    const appointment = await db.collection("appointments").findOne({ _id: new ObjectId(id) });
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    return appointment;
  } catch (error) {
    console.error("Error retrieving appointment:", error);
    throw error;
  }
}