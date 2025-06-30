import { connectToDatabase } from "@/app/utils/databaseConnectionClient";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { id }: { id: string } = await request.json(); // Expect ID wrapped in an object

    const db = await connectToDatabase();
    const result = await db.collection("appointments").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Appointment not found or could not be deleted",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to delete appointment",
      },
      { status: 500 }
    );
  }
}