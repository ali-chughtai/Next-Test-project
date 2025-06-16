

// import { revalidatePath } from 'next/cache';
import { MongoClient } from 'mongodb';

// Define the form data type
type AppointmentFormData = {
  name: string;
  fatherName: string;
  city: string;
  education: string;
  lastDegreeName: string;
  university: string;
  scholarshipCountry: string;
  levelFor: string;
  bankAccountNumber: string;
  confirmationReceipt: string;
  appointment_day: string;
  package: string;
  timezone: string;
};

// Connect to MongoDB
async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to .env.local');
  }
  
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return client.db(process.env.MONGODB_DB);
}

// Server action to save appointment
export async function saveAppointment(formData: AppointmentFormData) {
  try {
    const db = await connectToDatabase();
    
    // Insert the form data into the appointments collection
    const result = await db.collection('appointments').insertOne({
      ...formData,
      createdAt: new Date()
    });
    
    // Revalidate the page to show updated data
    // revalidatePath('/');
    
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