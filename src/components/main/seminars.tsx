import { Calendar, Users, DollarSign, Star, BookOpen, Globe, Award, Clock, FileText, Headphones, Briefcase, GraduationCap } from "lucide-react";

export default function Seminars() {
  return (
    <div className="flex flex-col gap-6 p-6 items-center justify-center text-black h-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden m-2 sm:mr-10">
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <Calendar className="text-blue-600 w-6 h-6" />
          <h2 className="text-xl font-semibold">Seminars</h2>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Free weekly sessions on study abroad opportunities
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <Users className="text-green-600 w-6 h-6" />
          <h2 className="text-xl font-semibold">Expert Consultation</h2>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            One-on-one guidance from certified counselors
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <DollarSign className="text-purple-600 w-6 h-6" />
          <h2 className="text-xl font-semibold">Affordable Packages</h2>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Starting from $5 - Complete application support
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <Star className="text-yellow-500 w-6 h-6" />
          <h2 className="text-xl font-semibold">Success Stories</h2>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            1000+ students placed in top universities worldwide
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <BookOpen className="text-indigo-600 w-6 h-6" />
          <h2 className="text-xl font-semibold">Study Guides</h2>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Latest tips, scholarships & application deadlines
          </p>
        </div>
      </div>

      {/* New items to fill space */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <Globe className="text-teal-600 w-6 h-6" />
          <h2 className="text-xl font-semibold">Global Network</h2>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Connections with universities across 30+ countries
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <Award className="text-red-500 w-6 h-6" />
          <h2 className="text-xl font-semibold">Scholarship Alerts</h2>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Real-time notifications for new funding opportunities
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <Clock className="text-orange-500 w-6 h-6" />
          <h2 className="text-xl font-semibold">Timely Support</h2>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            24/7 assistance throughout your application journey
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <FileText className="text-cyan-600 w-6 h-6" />
          <h2 className="text-xl font-semibold">Document Review</h2>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Professional editing of personal statements and CVs
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <Headphones className="text-pink-500 w-6 h-6" />
          <h2 className="text-xl font-semibold">Virtual Workshops</h2>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Interactive online sessions with admission experts
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <Briefcase className="text-amber-600 w-6 h-6" />
          <h2 className="text-xl font-semibold">Career Counseling</h2>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Personalized guidance on career paths and job opportunities
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-emerald-600 w-6 h-6" />
          <h2 className="text-xl font-semibold">Alumni Network</h2>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Connect with successful graduates from top global universities
          </p>
        </div>
      </div>
    </div>
  );
}
