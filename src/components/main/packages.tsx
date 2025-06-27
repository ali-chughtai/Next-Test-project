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
    { country: "Argentina", timeZone: "America/Argentina/Buenos_Aires", abbreviation: "ART" },
    { country: "United Kingdom", timeZone: "Europe/London", abbreviation: "GMT/BST" },
    { country: "United States", timeZone: "America/New_York", abbreviation: "EST/EDT" },
    { country: "France", timeZone: "Europe/Paris", abbreviation: "CET/CEST" },
    { country: "South Korea", timeZone: "Asia/Seoul", abbreviation: "KST" },
    { country: "Japan", timeZone: "Asia/Tokyo", abbreviation: "JST" },
    { country: "China", timeZone: "Asia/Shanghai", abbreviation: "CST" },
    { country: "India", timeZone: "Asia/Kolkata", abbreviation: "IST" },
    { country: "Australia", timeZone: "Australia/Sydney", abbreviation: "AEST/AEDT" },
    { country: "Brazil", timeZone: "America/Sao_Paulo", abbreviation: "BRT/BRST" },
    { country: "Mexico", timeZone: "America/Mexico_City", abbreviation: "CST/CDT" },
    { country: "South Africa", timeZone: "Africa/Johannesburg", abbreviation: "SAST" },
    { country: "Egypt", timeZone: "Africa/Cairo", abbreviation: "EET/EEST" },
    { country: "Nigeria", timeZone: "Africa/Lagos", abbreviation: "WAT" },
    { country: "Russia", timeZone: "Europe/Moscow", abbreviation: "MSK" },
    { country: "Saudi Arabia", timeZone: "Asia/Riyadh", abbreviation: "AST" },
    { country: "United Arab Emirates", timeZone: "Asia/Dubai", abbreviation: "GST" },
    { country: "New Zealand", timeZone: "Pacific/Auckland", abbreviation: "NZST/NZDT" },
    { country: "Spain", timeZone: "Europe/Madrid", abbreviation: "CET/CEST" },
    { country: "Sweden", timeZone: "Europe/Stockholm", abbreviation: "CET/CEST" },
    { country: "Norway", timeZone: "Europe/Oslo", abbreviation: "CET/CEST" },
    { country: "Denmark", timeZone: "Europe/Copenhagen", abbreviation: "CET/CEST" },
    { country: "Netherlands", timeZone: "Europe/Amsterdam", abbreviation: "CET/CEST" },
    { country: "Belgium", timeZone: "Europe/Brussels", abbreviation: "CET/CEST" },
    { country: "Switzerland", timeZone: "Europe/Zurich", abbreviation: "CET/CEST" },
    { country: "Austria", timeZone: "Europe/Vienna", abbreviation: "CET/CEST" },
    { country: "Poland", timeZone: "Europe/Warsaw", abbreviation: "CET/CEST" },
    { country: "Greece", timeZone: "Europe/Athens", abbreviation: "EET/EEST" },
    { country: "Turkey", timeZone: "Europe/Istanbul", abbreviation: "TRT" },
    { country: "Thailand", timeZone: "Asia/Bangkok", abbreviation: "ICT" },
    { country: "Singapore", timeZone: "Asia/Singapore", abbreviation: "SGT" },
    { country: "Indonesia", timeZone: "Asia/Jakarta", abbreviation: "WIB" },
    { country: "Philippines", timeZone: "Asia/Manila", abbreviation: "PHT" },
    { country: "Vietnam", timeZone: "Asia/Ho_Chi_Minh", abbreviation: "ICT" },
    { country: "Malaysia", timeZone: "Asia/Kuala_Lumpur", abbreviation: "MYT" },
    { country: "Pakistan", timeZone: "Asia/Karachi", abbreviation: "PKT" },
    { country: "Bangladesh", timeZone: "Asia/Dhaka", abbreviation: "BST" },
    { country: "Iran", timeZone: "Asia/Tehran", abbreviation: "IRST/IRDT" },
    { country: "Israel", timeZone: "Asia/Jerusalem", abbreviation: "IST/IDT" },
    { country: "Kenya", timeZone: "Africa/Nairobi", abbreviation: "EAT" },
    { country: "Morocco", timeZone: "Africa/Casablanca", abbreviation: "WET/WEST" },
    { country: "Chile", timeZone: "America/Santiago", abbreviation: "CLT/CLST" },
    { country: "Colombia", timeZone: "America/Bogota", abbreviation: "COT" },
    { country: "Peru", timeZone: "America/Lima", abbreviation: "PET" },
    { country: "Venezuela", timeZone: "America/Caracas", abbreviation: "VET" },
    { country: "South Africa", timeZone: "Africa/Johannesburg", abbreviation: "SAST" },
    { country: "Egypt", timeZone: "Africa/Cairo", abbreviation: "EET/EEST" },
    { country: "Norway", timeZone: "Europe/Oslo", abbreviation: "CET/CEST" },
    { country: "Sweden", timeZone: "Europe/Stockholm", abbreviation: "CET/CEST" },
    { country: "Finland", timeZone: "Europe/Helsinki", abbreviation: "EET/EEST" },
    { country: "Ireland", timeZone: "Europe/Dublin", abbreviation: "GMT/IST" },
    { country: "Portugal", timeZone: "Europe/Lisbon", abbreviation: "WET/WEST" },
    { country: "Czech Republic", timeZone: "Europe/Prague", abbreviation: "CET/CEST" },
    { country: "Hungary", timeZone: "Europe/Budapest", abbreviation: "CET/CEST" },
    { country: "Romania", timeZone: "Europe/Bucharest", abbreviation: "EET/EEST" },
    { country: "Ukraine", timeZone: "Europe/Kiev", abbreviation: "EET/EEST" },
    { country: "Argentina", timeZone: "America/Argentina/Buenos_Aires", abbreviation: "ART" },
    { country: "Chile", timeZone: "America/Santiago", abbreviation: "CLT/CLST" },
    { country: "New Zealand", timeZone: "Pacific/Auckland", abbreviation: "NZST/NZDT" },
    { country: "Fiji", timeZone: "Pacific/Fiji", abbreviation: "FJT/FJST" },
    { country: "Papua New Guinea", timeZone: "Pacific/Port_Moresby", abbreviation: "PGT" },
    { country: "United States (Pacific)", timeZone: "America/Los_Angeles", abbreviation: "PST/PDT" },
    { country: "United States (Mountain)", timeZone: "America/Denver", abbreviation: "MST/MDT" },
    { country: "United States (Central)", timeZone: "America/Chicago", abbreviation: "CST/CDT" },
    { country: "United States (Arizona)", timeZone: "America/Phoenix", abbreviation: "MST" },
    { country: "United States (Alaska)", timeZone: "America/Anchorage", abbreviation: "AKST/AKDT" },
    { country: "United States (Hawaii)", timeZone: "Pacific/Honolulu", abbreviation: "HST" },
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
    } else {
      setSelectedCountry("");
      setSelectedTimezone("");
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
                value={selectedCountry && selectedTimezone ? `${selectedCountry}|${selectedTimezone}` : ""}
                onChange={(e) => {
                  const [country, timezone] = e.target.value.split("|");
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
