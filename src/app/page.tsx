import Image from "next/image";
import Carosul from "@/components/main/carosul";
import Flags from "@/components/main/flags";
import Information from "@/components/main/information";
import Appointment from "@/components/main/appointment";
import Seminars from "@/components/main/seminars";
import Profiles from "@/components/main/profiles";
export default function Home() {
  return (
    <div className="min-h-screen py-2 max-w-[1400px] mx-auto px-4">
      <div className="flex gap-2 flex-col  md:grid  md:grid-cols-[70%_29.15%] md:gap-3">
        <Carosul/>
        <Flags/>
      </div>
      <div>
        <Information/>
      </div>
      <div className="flex flex-col-reverse lg:flex-row lg:items-center  my-2 gap-4">
        <div className="basis-[70%]">
          <Appointment/>
        </div>
        <div className="basis-[30%]">
          <Seminars/>
        </div>
      </div>
      <div>
        <Profiles/>
      </div>
    </div>
  );
}
