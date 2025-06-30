"use client";
import isTokenExpired from "@/app/utils/tokenExpiry";
import SingleAppointment from "@/components/admin/appointment/singleAppointment";
import Appointment from "@/components/main/appointment";

import { useRouter } from "next/navigation";
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

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>();
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [shouldRefetch, setShouldRefetch] = useState<Boolean>(false);  
  const router = useRouter();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (typeof window !== "undefined") {
      intervalId = setInterval(() => {
        const currentToken = localStorage.getItem("token");
        if (isTokenExpired(currentToken)) {
          console.log("Token expired or missing, redirecting to login.");
          localStorage.removeItem("token");
          router.push("/admin/login");
          clearInterval(intervalId);
        }
      }, 600000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [router]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/admin/login");
    }
    async function fetchAllAppointments() {
      try {
        const response = await fetch("/api/appointments");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    }

    if (shouldRefetch || appointments === undefined) {
      setAppointments(undefined);
      fetchAllAppointments();
      setShouldRefetch(false); 
    }
  }, [shouldRefetch, appointments, router]); 
  if (!appointments) {
    return <p className="text-black">Loading...</p>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {!selectedAppointment ? (
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Admin Dashboard - Appointments Overview
          </h1>
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No appointments found.</p>
            </div>
          ) : (
            <>
              <div className="block lg:hidden space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="bg-white rounded-lg shadow-md p-4 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {appointment.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.package === "Premium"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        ${appointment.package}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">City:</span>
                        <p className="font-medium text-black">
                          {appointment.city}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">University:</span>
                        <p className="font-medium text-black">
                          {appointment.university}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Country:</span>
                        <p className="font-medium text-black">
                          {appointment.scholarshipCountry}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Appointment Day:</span>
                        <p className="font-medium text-black">
                          {appointment.appointment_day}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-black">
                        <span className="text-gray-600">Contact:</span>{" "}
                        {appointment.contactNumber}
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden lg:block bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Father's Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          City
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Education
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          University
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Scholarship Country
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Appointment Day
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Package
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timezone
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appointments.map((appointment) => (
                        <tr
                          key={appointment._id}
                          className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {appointment.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {appointment.fatherName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {appointment.city}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {appointment.education}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {appointment.university}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {appointment.scholarshipCountry}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {appointment.levelFor}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {appointment.contactNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                            {appointment.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {appointment.appointment_day}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                appointment.package === "Premium"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {appointment.package}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {appointment.timezone}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>
          {selectedAppointment && (
            <SingleAppointment
              appointment={selectedAppointment}
              onBack={() => setSelectedAppointment(null)}
              deleteTrigger={()=>setShouldRefetch(true)}
            />
          )}
        </div>
      )}
    </div>
  );
}
