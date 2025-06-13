import Link from "next/link";
import Signature from "./signature/signature";

export default function footer() {
    // const naviga
    return(
        <footer className="bg-black">
            <div className="grid grid-cols-1 gap-8 place-items-center justify-center md:grid-cols-3 py-10 md: bg-[#0C0D0E]">
      <div className="flex flex-col items-center justify-center text-center text-white ">
        <Signature/>
        <h1 className="italic">Let us be your path</h1>
      </div>
      <div className="text-white">
        <h1 className="font-semibold text-lg">Quick Links</h1>
        <div className="flex flex-col gap-1 text-gray-300 justify-center items-center">
        <Link className= "hover:cursor-pointer hover:text-white" href="#">Opportunities</Link>
                <Link className= "hover:cursor-pointer hover:text-white" href="#">Scholarships</Link>
                <Link className= "hover:cursor-pointer hover:text-white" href="#">Domain</Link>
                <Link className= "hover:cursor-pointer hover:text-white" href="#">Services</Link>
                <Link className= "hover:cursor-pointer hover:text-white" href="#">About</Link>
                <Link className= "hover:cursor-pointer hover:text-white" href="#">Contact us</Link>
        </div>
      </div>
      <div className="text-white flex flex-col items-center justify-center text-center gap-1">
        <h1 className="text-lg font-semibold">Contact</h1>
        <ul className="flex flex-col gap-2 text-gray-300">
          <li>1-703-555-567</li>
          <li>
          9290 Bond
          Overland Park, KS 66214
          </li>
          <li className="text-blue-400 hover:cursor-pointer">
            <a href="#" target="_blank">
              oppurtunityabroad.com
            </a>
          </li>
        </ul>
      </div>
    </div>
        </footer>
    )
}