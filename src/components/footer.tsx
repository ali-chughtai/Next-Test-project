import Link from "next/link";
import Signature from "./signature/signature";

export default function footer() {
    return(
        <footer id="footer" className="bg-black">
            <div className="grid grid-cols-1 gap-8 place-items-center justify-center md:grid-cols-2 py-10 md: bg-[#0C0D0E]">
      <div className="flex flex-col items-center justify-center text-center text-white ">
        <Signature/>
        <h1 className="italic">Let us be your path</h1>
      </div>
      <div className="text-white flex flex-col items-center justify-center text-center gap-1">
        <h1 className="text-lg font-semibold">Contact</h1>
        <ul className="flex flex-col gap-2 text-gray-300">
          <li className="text-blue-400 hover:cursor-pointer">
            <a href="mailto:opportunity_abroad@outlook.com" target="_blank">
            opportunity_abroad@outlook.com
            </a>
          </li>
        </ul>
      </div>
    </div>
        </footer>
    )
}