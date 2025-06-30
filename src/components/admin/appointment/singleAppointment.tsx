import Confirmation from "@/components/global/confirmation";
import Loader from "@/components/global/loadingSpinner";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface Appointment {
  _id: string;
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
  confirmationReceipt: string | null;
  appointment_day: string;
  package: string;
  timezone: string;
}

export default function SingleAppointment({
  appointment,
  onBack,
  deleteTrigger
}: {
  appointment: Appointment;
  onBack: () => void;
  deleteTrigger: () => void
}) {
const [confirmationMessageVisible, setConfirmationMessageVisible] = useState(false);
const [confirmationReceipt, setConfirmationReceipt] = useState(null);

  useEffect(() => {
    async function getImage() {
      try {
        const response = await fetch("/api/appointments/getImage", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ id: appointment._id }),
        });

        if (!response.ok) {
          console.error("Failed to fetch image:", response.statusText);
          return;
        }

        const data = await response.json(); // Parse the JSON response

        if (data.appointment && data.appointment.confirmationReceipt) {
          setConfirmationReceipt(data.appointment.confirmationReceipt); // Set the receipt
        } else {
          setConfirmationReceipt(null); // No receipt available
        }
      } catch (error) {
        console.error("Error occurred while fetching image:", error);
      }
    }

    getImage();
  }, []);

  function packageDetails(amount: string) {
    switch (Number(amount)) {
      case 5:
        return " - Consultation";
        break;
      case 10:
        return " - Document Preparation";
        break;
      case 20:
        return " - Research Proposal & Docs Preparation";
        break;
      case 25:
        return " - Visa Filing";
        break;
      default:
        break;
    }
  }

  async function handleDelete(appointment_no : string) {
    try {
      const response = await fetch("/api/appointments/deleteAppointment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: appointment_no }),
      });
  
      if (response.ok) {
        deleteTrigger();
        onBack();
      } else {
        const errorMessage = await response.text();
        console.error("Failed to delete appointment:", errorMessage);
      }
    } catch (error) {
      console.error("Error deleting appointment occurred:", error);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Appointments
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-end py-4">
          <Trash onClick={()=>setConfirmationMessageVisible(true)} className="text-red-700 fill-red-400 hover:cursor-pointer hover:fill-red-600"/>  
          </div>
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {appointment.name}
            </h1>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                appointment.package === "Premium"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              ${appointment.package}{packageDetails(appointment.package)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                Personal Information
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-600">Full Name:</span>
                  <p className="text-gray-800">{appointment.name}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Father's Name:
                  </span>
                  <p className="text-gray-800">{appointment.fatherName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">City:</span>
                  <p className="text-gray-800">{appointment.city}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Contact Number:
                  </span>
                  <p className="text-gray-800">{appointment.contactNumber}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Email:</span>
                  <p className="text-blue-600">{appointment.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                Academic Information
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-600">
                    Current Education:
                  </span>
                  <p className="text-gray-800">{appointment.education}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Last Degree:
                  </span>
                  <p className="text-gray-800">{appointment.lastDegreeName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">University:</span>
                  <p className="text-gray-800">{appointment.university}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Scholarship Country:
                  </span>
                  <p className="text-gray-800">
                    {appointment.scholarshipCountry}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Level Applying For:
                  </span>
                  <p className="text-gray-800">{appointment.levelFor}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                Appointment Details
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-600">
                    Appointment Day:
                  </span>
                  <p className="text-gray-800">{appointment.appointment_day}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Package:</span>
                  <p className="text-gray-800">{appointment.package}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Timezone:</span>
                  <p className="text-gray-800">{appointment.timezone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                Confirmation Receipt
              </h2>
              {confirmationReceipt ? (
                <div className="text-center">
                  <img
                    src={`data:image/jpeg;base64,${confirmationReceipt}`}
                    alt="Confirmation Receipt"
                    className="max-w-full h-auto max-h-96 border border-gray-300 rounded-lg shadow-md mx-auto"
                    onError={(e) => {
                      e.currentTarget.src = `data:image/png;base64,${confirmationReceipt}`;
                    }}
                  />
                </div>
              ) : (
                <div className=" flex items-center justify-center h-full"><Loader/></div>
              )}
            </div>
          </div>
        </div>
      </div>
      {confirmationMessageVisible && 
        <div>
          <Confirmation
          message={"Are you sure to delete the appointment? All the data will be lost"}
          onOk={()=> handleDelete(appointment._id)}
          onCancel={()=>setConfirmationMessageVisible(false)}
          waitingMessage={"Deleting Appointment"}
          />
        </div>
        
      }
    </div>
  );
}
