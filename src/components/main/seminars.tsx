import { Calendar, Users, DollarSign, Star, BookOpen } from "lucide-react";

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
            Starting from $99 - Complete application support
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
    </div>
  );
}
