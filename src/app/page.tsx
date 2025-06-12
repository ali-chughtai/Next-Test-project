import Image from "next/image";
import Carosul from "@/components/main/carosul";
import Flags from "@/components/main/flags";
import Information from "@/components/main/information";
import Appointment from "@/components/main/appointment";
export default function Home() {
  return (
    <div className="min-h-screen py-2">
      <div className="flex gap-2 flex-col p-2 pr-4 md:grid  md:grid-cols-[70%_30%] md:gap-2">
        <Carosul/>
        <Flags/>
      </div>
      <div className="px-2 pt-2">
        <Information/>
      </div>
      <div>
        <Appointment/>
      </div>
    </div>
  );
}
