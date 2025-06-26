"use client";

import { useState,useRef } from "react";
import Packages from "./packages";
import scrollToSection from "@/app/utils/scrollToSection";

export default function Appointment() {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [city, setCity] = useState("");
  const [education, setEducation] = useState("");
  const [lastDegreeName, setLastDegreeName] = useState("");
  const [university, setUniversity] = useState("");
  const [scholarshipCountry, setScholarshipCountry] = useState("");
  const [levelFor, setLevelFor] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptFileName, setReceiptFileName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const packagesRef = useRef<{ resetPackagesState: () => void }>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]{3,14}$/.test(name)) {
      newErrors.name =
        "Name must be 3-14 characters and contain only letters and spaces";
    }

    if (!fatherName.trim()) {
      newErrors.fatherName = "Father's name is required";
    } else if (!/^[A-Za-z\s]{3,14}$/.test(fatherName)) {
      newErrors.fatherName =
        "Father's name must be 3-14 characters and contain only letters and spaces";
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
    } else if (!/^[A-Za-z\s]{3,14}$/.test(city)) {
      newErrors.city =
        "City must be 3-14 characters and contain only letters and spaces";
    }

    if (!education.trim()) {
      newErrors.education = "Education is required";
    } else if (!/^[A-Za-z0-9\s\-\&]{3,50}$/.test(education)) {
      newErrors.education =
        "Education can have alphabets, numbers, and special characters - & and spaces";
    }

    if (!lastDegreeName.trim()) {
      newErrors.lastDegreeName = "Last degree name is required";
    } else if (!/^[A-Za-z0-9\s\-\&]{3,50}$/.test(lastDegreeName)) {
      newErrors.lastDegreeName =
        "Last degree name can have alphabets, numbers, and special characters - & and spaces";
    }

    if (!university.trim()) {
      newErrors.university = "University is required";
    } else if (!/^[A-Za-z0-9\s\-\&]{3,50}$/.test(university)) {
      newErrors.university =
        "University can have alphabets, numbers, and special characters - & and spaces";
    }

    if (!scholarshipCountry.trim()) {
      newErrors.scholarshipCountry = "Scholarship country is required";
    } else if (!/^[A-Za-z0-9\s\-\&]{3,50}$/.test(scholarshipCountry)) {
      newErrors.scholarshipCountry =
        "Scholarship country can have alphabets, numbers, and special characters - & and spaces";
    }

    if (!levelFor) {
      newErrors.levelFor = "Please select a level";
    }

    if (!contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10,15}$/.test(contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10-15 digits";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const selectedPackage = localStorage.getItem("package");
    if (!selectedPackage) {
      newErrors.package = "Please select a package";
    }

    const selectedTimezone = localStorage.getItem("timezone");
    if (!selectedTimezone) {
      newErrors.timezone = "Please select a timezone";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!validateForm()) {
      const firstErrorField = document.querySelector('[data-error="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    const formData = {
      name,
      fatherName,
      city,
      education,
      lastDegreeName,
      university,
      scholarshipCountry,
      levelFor,
      contactNumber,
      email,
      confirmationReceipt: receiptFile
        ? Buffer.from(await receiptFile.arrayBuffer())
        : null,
      appointment_day: localStorage.getItem("day") || "Saturday",
      package: localStorage.getItem("package") || "",
      timezone: localStorage.getItem("timezone") || "",
    };
  
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      setSubmitResult(result);
      scrollToSection("appointments");
  
      if (result.success) {
        setName("");
        setFatherName("");
        setCity("");
        setEducation("");
        setLastDegreeName("");
        setUniversity("");
        setScholarshipCountry("");
        setLevelFor("");
        setContactNumber("");
        setEmail("");
        setReceiptFile(null);
        setReceiptFileName("");

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        if (packagesRef.current) {
          packagesRef.current.resetPackagesState();
        }

        localStorage.removeItem("day");
        localStorage.removeItem("package");
        localStorage.removeItem("timezone");
        localStorage.removeItem("selectedCountry");
        localStorage.removeItem("timezoneCountry");
  
        setTimeout(() => {
          setSubmitResult(null);
        }, 5000);
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      const validTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          confirmationReceipt: "Please upload an image (JPEG, PNG, GIF) or PDF file",
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          confirmationReceipt: "File size should not exceed 5MB",
        });
        return;
      }

      setReceiptFile(file);
      setReceiptFileName(file.name);

      if (errors.confirmationReceipt) {
        const { confirmationReceipt, ...restErrors } = errors;
        setErrors(restErrors);
      }
    }
  };

  const handleContactNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d{0,15}$/.test(value)) {
      setContactNumber(value);
    }

    if (errors.contactNumber) {
      const { contactNumber, ...restErrors } = errors;
      setErrors(restErrors);
    }
  };

  return (
    <div id="appointments" className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Register here, Book Appointment
      </h1>

      {submitResult && (
        <div
          className={`mb-6 p-4 rounded-md ${
            submitResult.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {submitResult.message}
        </div>
      )}

      {(errors.package || errors.timezone) && (
        <div className="mb-6 p-4 rounded-md bg-red-100 text-red-700">
          {errors.package && <p>{errors.package}</p>}
          {errors.timezone && <p>{errors.timezone}</p>}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={name}
            maxLength={14}
            pattern="^[A-Za-z\s]{3,14}$"
            title="Name must be 3-14 characters and contain only letters and spaces"
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) {
                const { name, ...restErrors } = errors;
                setErrors(restErrors);
              }
            }}
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity(
                "Name must be at least 3 characters and contain only letters and spaces"
              );
            }}
            onInput={(e) => {
              e.currentTarget.setCustomValidity("");
            }}
            className={`w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.name ? "border-red-500" : ""
            }`}
            data-error={errors.name ? "true" : "false"}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            name="father_name"
            placeholder="Father Name *"
            value={fatherName}
            maxLength={14}
            pattern="^[A-Za-z\s]{3,14}$"
            onChange={(e) => {
              setFatherName(e.target.value);
              if (errors.fatherName) {
                const { fatherName, ...restErrors } = errors;
                setErrors(restErrors);
              }
            }}
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity(
                "Name must be at least 3 characters and contain only letters and spaces"
              );
            }}
            className={`w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.fatherName ? "border-red-500" : ""
            }`}
            data-error={errors.fatherName ? "true" : "false"}
            required
          />
          {errors.fatherName && (
            <p className="text-red-500 text-xs mt-1">{errors.fatherName}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            name="city"
            placeholder="City *"
            value={city}
            maxLength={14}
            pattern="^[A-Za-z\s]{3,14}$"
            onChange={(e) => {
              setCity(e.target.value);
              if (errors.city) {
                const { city, ...restErrors } = errors;
                setErrors(restErrors);
              }
            }}
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity(
                "Name must be at least 3 characters and contain only letters and spaces"
              );
            }}
            className={`w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.city ? "border-red-500" : ""
            }`}
            data-error={errors.city ? "true" : "false"}
            required
          />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            name="education"
            placeholder="Education *"
            value={education}
            onChange={(e) => {
              setEducation(e.target.value);
              if (errors.education) {
                const { education, ...restErrors } = errors;
                setErrors(restErrors);
              }
            }}
            maxLength={50}
            pattern="^[A-Za-z0-9\s\-\&]{3,50}$"
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity(
                "Education can have Alphabets and numbers, Special characters allowed are - & whitespace"
              );
            }}
            className={`w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.education ? "border-red-500" : ""
            }`}
            data-error={errors.education ? "true" : "false"}
            required
          />
          {errors.education && (
            <p className="text-red-500 text-xs mt-1">{errors.education}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            name="last_degree_name"
            placeholder="Last Degree Name *"
            value={lastDegreeName}
            onChange={(e) => {
              setLastDegreeName(e.target.value);
              if (errors.lastDegreeName) {
                const { lastDegreeName, ...restErrors } = errors;
                setErrors(restErrors);
              }
            }}
            maxLength={50}
            pattern="^[A-Za-z0-9\s\-\&]{3,50}$"
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity(
                "University can have Alphabets and numbers, Special characters allowed are - & whitespace"
              );
            }}
            className={`w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.lastDegreeName ? "border-red-500" : ""
            }`}
            data-error={errors.lastDegreeName ? "true" : "false"}
            required
          />
          {errors.lastDegreeName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastDegreeName}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            name="university"
            placeholder="University *"
            value={university}
            onChange={(e) => {
              setUniversity(e.target.value);
              if (errors.university) {
                const { university, ...restErrors } = errors;
                setErrors(restErrors);
              }
            }}
            maxLength={50}
            pattern="^[A-Za-z0-9\s\-\&]{3,50}$"
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity(
                "University can have Alphabets and numbers, Special characters allowed are - & whitespace"
              );
            }}
            className={`w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.university ? "border-red-500" : ""
            }`}
            data-error={errors.university ? "true" : "false"}
            required
          />
          {errors.university && (
            <p className="text-red-500 text-xs mt-1">{errors.university}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            name="scholarship_country"
            placeholder="Scholarship Country *"
            value={scholarshipCountry}
            onChange={(e) => {
              setScholarshipCountry(e.target.value);
              if (errors.scholarshipCountry) {
                const { scholarshipCountry, ...restErrors } = errors;
                setErrors(restErrors);
              }
            }}
            maxLength={50}
            pattern="^[A-Za-z0-9\s\-\&]{3,50}$"
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity(
                "Scholarship Country can have Alphabets and numbers, Special characters allowed are - & whitespace"
              );
            }}
            className={`w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.scholarshipCountry ? "border-red-500" : ""
            }`}
            data-error={errors.scholarshipCountry ? "true" : "false"}
            required
          />
          {errors.scholarshipCountry && (
            <p className="text-red-500 text-xs mt-1">
              {errors.scholarshipCountry}
            </p>
          )}
        </div>

        <div className="relative">
          <select
            name="level_for"
            id="level_for"
            value={levelFor}
            onChange={(e) => {
              setLevelFor(e.target.value);
              if (errors.levelFor) {
                const { levelFor, ...restErrors } = errors;
                setErrors(restErrors);
              }
            }}
            className={`w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white ${
              errors.levelFor ? "border-red-500" : ""
            }`}
            data-error={errors.levelFor ? "true" : "false"}
            required
          >
            <option value="" disabled>
              Level For *
            </option>
            <option value="masters">Masters</option>
            <option value="phd">PhD</option>
          </select>
          {errors.levelFor && (
            <p className="text-red-500 text-xs mt-1">{errors.levelFor}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            name="contact-number"
            placeholder="Contact Number *"
            value={contactNumber}
            onChange={handleContactNumberChange}
            className={`w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.contactNumber ? "border-red-500" : ""
            }`}
            data-error={errors.contactNumber ? "true" : "false"}
            required
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.contactNumber}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                const { email, ...restErrors } = errors;
                setErrors(restErrors);
              }
            }}
            className={`w-full px-4 py-2 border text-black placeholder:text-gray-300 placeholder:text-center text-center md:text-left md:placeholder:text-left border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? "border-red-500" : ""
            }`}
            data-error={errors.email ? "true" : "false"}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="relative sm:col-span-2">
          <div
            className={`relative border ${
              errors.confirmationReceipt ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
          >
            <input
              ref={fileInputRef}
              type="file"
              name="amount-confirmation-receipt"
              id="receipt-file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              accept="image/jpeg,image/png,image/gif,application/pdf"
            />
            <div className="flex items-center px-4 py-2">
              <div className="flex-1 truncate text-center md:text-left text-black">
                {receiptFileName ? (
                  receiptFileName
                ) : (
                  <span className="text-gray-400">Upload Payment Receipt *</span>
                )}
              </div>
              <button
                type="button"
                className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
                onClick={() => document.getElementById("receipt-file")?.click()}
              >
                Browse
              </button>
            </div>
          </div>
          {errors.confirmationReceipt && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmationReceipt}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
        </div>
      </form>

      <div>
        <Packages ref={packagesRef} />
      </div>

      <div className="sm:col-span-2 mt-4">
        <button
          onClick={handleSubmit}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
