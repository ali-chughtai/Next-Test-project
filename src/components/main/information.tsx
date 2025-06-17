"use client";
import Image from "next/image";
import informationImages from "../../../public/images/information/informationImages";

export default function Information() {
  const services = [
    {
      title: "Document Preparation",
      icon: informationImages.documentPreparation,
      description: "Professional assistance with academic document preparation",
    },
    {
      title: "Hunting Opportunities",
      icon: informationImages.huntingOpportunities,
      description: "Find the best opportunities matching your profile",
    },
    {
      title: "Research Proposals for PhD",
      icon: informationImages.researchProposals,
      description: "Expert guidance on crafting compelling research proposals",
    },
    {
      title: "Application Documents",
      icon: informationImages.applicationDocuments,
      description: "CV, Motivation Letter, Statement of Purpose",
      items: ["CV Checking", "Motivation Letter", "Statement of purpose"],
    },
    {
      title: "Scholarships Guidance",
      icon: informationImages.scholarshipsGuidance,
      description: "DAAD (Germany, Oman), Wealth (UK) guidelines",
    },
    {
      title: "University Selection",
      icon: informationImages.universitySelection,
      description: "University hunting for high chances of admission",
    },
    {
      title: "Professor Communication",
      icon: informationImages.professorCommunication,
      description: "Formal email writing to professors",
    },
    {
      title: "Interview Preparation",
      icon: informationImages.interviewPreparation,
      description: "Tips and tricks for interview preparation",
    },
    {
      title: "Visa Assistance",
      icon: informationImages.visaAssistance,
      description: "Visa filling documents, appointments for USA, UK, Germany",
    },
  ];

  return (
    <div className="py-10" id="services">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Our Services
      </h2>
      <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 sm:text-left md:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center justify-center sm:justify-start mb-3">
                <div className="mr-3">
                  <Image src={service.icon} width={35} alt="404" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-3">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
