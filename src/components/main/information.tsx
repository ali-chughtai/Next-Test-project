import { BookOpen, Search, FileText, FileCheck, Award, Building, Mail, MessageSquare, Plane } from 'lucide-react';

export default function Information() {
    const services = [
        {
            title: "Document Preparation",
            icon: <FileText className="h-6 w-6 text-blue-600" />,
            description: "Professional assistance with academic document preparation"
        },
        {
            title: "Hunting Opportunities",
            icon: <Search className="h-6 w-6 text-blue-600" />,
            description: "Find the best opportunities matching your profile"
        },
        {
            title: "Research Proposals for PhD",
            icon: <BookOpen className="h-6 w-6 text-blue-600" />,
            description: "Expert guidance on crafting compelling research proposals"
        },
        {
            title: "Application Documents",
            icon: <FileCheck className="h-6 w-6 text-blue-600" />,
            description: "CV, Motivation Letter, Statement of Purpose",
            items: ["CV Checking", "Motivation Letter", "Statement of purpose"]
        },
        {
            title: "Scholarships Guidance",
            icon: <Award className="h-6 w-6 text-blue-600" />,
            description: "DAAD (Germany, Oman), Wealth (UK) guidelines",
        },
        {
            title: "University Selection",
            icon: <Building className="h-6 w-6 text-blue-600" />,
            description: "University hunting for high chances of admission"
        },
        {
            title: "Professor Communication",
            icon: <Mail className="h-6 w-6 text-blue-600" />,
            description: "Formal email writing to professors"
        },
        {
            title: "Interview Preparation",
            icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
            description: "Tips and tricks for interview preparation"
        },
        {
            title: "Visa Assistance",
            icon: <Plane className="h-6 w-6 text-blue-600" />,
            description: "Visa filling documents, appointments for USA, UK, Germany"
        }
    ];

    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Our Services</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {services.map((service, index) => (
                    <div 
                        key={index} 
                        className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                    >
                        <div className="p-5">
                            <div className="flex items-center mb-3">
                                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                                    {service.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">{service.title}</h3>
                            </div>
                            
                            <p className="text-gray-600 mb-3">{service.description}</p>
                            
                            {service.items && (
                                <ul className="space-y-1 text-gray-500 list-disc list-inside">
                                    {service.items.map((item, idx) => (
                                        <li key={idx} className="text-sm">{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
