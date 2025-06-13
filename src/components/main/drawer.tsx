import { Menu } from "lucide-react";
import Link from "next/link";

export default function Drawer() {
    return (
      <div className=" flex flex-col bg-white rounded-md text-black w-64 z-50 p-4 shadow-lg">
        <Link className="hover:underline py-2 px-4" href="/">Opportunities Abroad</Link>
        <Link className="hover:underline py-2 px-4" href="/about">Scholarships Abroad</Link>
        <Link className="hover:underline py-2 px-4" href="/about">Domain</Link>
        <Link className="hover:underline py-2 px-4" href="/about">Services</Link>
        <Link className="hover:underline py-2 px-4" href="/about">About</Link>
        <Link className="hover:underline py-2 px-4" href="/about">Contact us</Link>
      </div>
    );
}
