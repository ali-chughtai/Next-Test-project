"use client";
import Image from "next/image";
import packageImages from "../../../public/images/packages/packageImages";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Globe, Clock, Check } from "lucide-react";

export interface PackagesRef {
  resetPackagesState: () => void;
}

const Packages = forwardRef<PackagesRef>((props, ref) => {
  const [day, setDay] = useState("Saturday");
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const countryTimeZones = [
    { country: "Italy", timeZone: "Europe/Rome", abbreviation: "CET/CEST" },
    { country: "Germany", timeZone: "Europe/Berlin", abbreviation: "CET/CEST" },
    { country: "Canada", timeZone: "America/Toronto", abbreviation: "EST/EDT" },
    {
      country: "Argentina",
      timeZone: "America/Argentina/Buenos_Aires",
      abbreviation: "ART",
    },
    {
      country: "United Kingdom",
      timeZone: "Europe/London",
      abbreviation: "GMT/BST",
    },
    {
      country: "United States",
      timeZone: "America/New_York",
      abbreviation: "EST/EDT",
    },
    { country: "France", timeZone: "Europe/Paris", abbreviation: "CET/CEST" },
    { country: "South Korea", timeZone: "Asia/Seoul", abbreviation: "KST" },
  ];

  useEffect(() => {
    const storedPackage = localStorage.getItem("package");
    const storedCountry = localStorage.getItem("selectedCountry");
    const storedTimezone = localStorage.getItem("timezone");
    
    if (storedPackage) {
      setSelectedPackage(storedPackage);
    }
    
    if (storedCountry && storedTimezone) {
      setSelectedCountry(storedCountry);
      setSelectedTimezone(storedTimezone);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    resetPackagesState: () => {
      setDay("Saturday");
      setSelectedTimezone("");
      setSelectedCountry("");
      setSelectedPackage(null);
      localStorage.removeItem("day");
      localStorage.removeItem("package");
      localStorage.removeItem("timezone");
      localStorage.removeItem("selectedCountry");
    },
  }));

  const handlePackageSelect = (packageValue: string) => {
    if (selectedPackage === packageValue) {
      localStorage.removeItem("package");
      setSelectedPackage(null);
    } else {
      localStorage.setItem("package", packageValue);
      setSelectedPackage(packageValue);
    }
  };

  const packages = [
    {
      value: "5",
      price: "5",
      description: "For short consultation, start the process",
      bgColor: "bg-green-100",
    },
    {
      value: "10",
      price: "10",
      description: "Document Preparations",
      bgColor: "bg-green-200",
    },
    {
      value: "20",
      price: "20",
      description:
        "Research Proposals, Docs preparation, CV and Motivation letters",
      bgColor: "bg-green-300",
    },
    {
      value: "25",
      price: "25",
      description: "Visa Filings",
      bgColor: "bg-green-400",
    },
  ];

  return (
    <div
      id="packages"
      className="flex flex-col items-center justify-center gap-10 text-black my-10 sm:px-4"
    >
      <div className="w-full bg-slate-200 rounded-lg shadow-md p-6 mb-4">
        <div className="flex flex-col justify-center md:flex-row md:items-center gap-4 md:gap-8">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Available Days:</span>
            </h2>
            <div className="flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => {
                  setDay("Saturday");
                  localStorage.setItem("day", "Saturday");
                }}
                className={`px-4 py-2 text-sm font-medium rounded-l-md transition-colors
                  ${
                    day === "Saturday"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Saturday
              </button>
              <button
                type="button"
                onClick={() => {
                  setDay("Sunday");
                  localStorage.setItem("day", "Sunday");
                }}
                className={`px-4 py-2 text-sm font-medium rounded-r-md transition-colors
                  ${
                    day === "Sunday"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                Sunday
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>Timezone:</span>
            </h2>
            <div className="relative w-full md:w-auto">
              <select
                id="timezone-select"
                value={`${selectedCountry}|${selectedTimezone}`}
                onChange={(e) => {
                  const [country, timezone] = e.target.value.split('|');
                  setSelectedCountry(country);
                  setSelectedTimezone(timezone);
                  localStorage.setItem("selectedCountry", country);
                  localStorage.setItem("timezone", timezone);
                }}
                className="block w-full md:w-64 rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none border"
              >
                <option value="" disabled>
                  Select your timezone
                </option>
                {countryTimeZones.map((tz, index) => (
                  <option key={index} value={`${tz.country}|${tz.abbreviation}`}>
                    {tz.country} ({tz.abbreviation})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid text-black text-center grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 w-full">
        {packages.map((pkg) => {
          const isSelected = selectedPackage === pkg.value;
          const isDisabled = selectedPackage !== null && !isSelected;

          return (
            <div
              key={pkg.value}
              onClick={() => !isDisabled && handlePackageSelect(pkg.value)}
              className={`flex flex-col gap-2 items-center justify-center ${
                pkg.bgColor
              } py-5 px-2 shadow-lg rounded-md 
                ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                }
                ${isSelected ? "ring-2 ring-blue-600 ring-offset-2" : ""}
              `}
            >
              <div className="flex items-center justify-center mb-2 relative">
                <Image
                  src={packageImages.dollar}
                  alt="Dollar sign"
                  width={25}
                />
                <h1 className="text-3xl">{pkg.price}</h1>
              </div>
              <p className="text-lg text-gray-700 font-semibold">
                {pkg.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-1 sm:gap-2 text-center items-center justify-center animate-bounce">
        <Image src={packageImages.free} alt="Free" width={50} />
        <h1 className="italic font-semibold text-lg">
          One Short free appointment (2-3 Minutes){" "}
        </h1>
      </div>
    </div>
  );
});

Packages.displayName = "Packages";

export default Packages;
