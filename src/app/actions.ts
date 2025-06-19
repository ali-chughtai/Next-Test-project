"use server"
import { MongoClient } from 'mongodb';

// Define the form data type
type AppointmentFormData = {
  name: string;
  fatherName: string;
  city: string;
  education: string;
  last_degree_Name: string;
  university: string;
  scholarship_Country: string;
  applied_For: string;
  contact_Number: string;
  email: string;
  confirmation_receipt: string;
  appointment_day: string;
  package: string;
  timezone: string;
};

async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to .env.local');
  }
  
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return client.db(process.env.MONGODB_DB);
}

export async function saveAppointment(formData: AppointmentFormData) {
  try {
    const db = await connectToDatabase();
    
    const result = await db.collection('appointments').insertOne({
      ...formData,
      createdAt: new Date()
    });
    
    
    return { 
      success: true, 
      message: 'Appointment created successfully',
      id: result.insertedId.toString()
    };
  } catch (error) {
    console.error('Error saving appointment:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to create appointment'
    };
  }
}