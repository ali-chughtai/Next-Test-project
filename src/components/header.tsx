"use client"

import Link from "next/link";
import headerImages from "../../public/images/header/headerImages";
import Image from "next/image";
import Drawer from "./main/drawer";
import { useState } from "react";

export default function header() {

    const [drawerOpen, setDrawerOpen] = useState(false)
    return(
        <header className=" rounded-b-lg flex justify-between items-center py-2 bg-gray-300" >
            <div className="flex gap-2 items-center w-[50%] md:w-[40%] pl-2">
                <Image src={headerImages.logo} alt="404" width={40} />
                <p className="text-black font-bold text-lg">oppurtunity abroad.com</p>
            </div>
            <div className="  hidden w-[60%] justify-between text-sm  text-black py-2 px-2 md:flex"> 
                <Link className= "hover:underline" href="/">Opportunities Abroad</Link>
                <Link className= "hover:underline" href="/about">Scholarships Abroad</Link>
                <Link className= "hover:underline" href="/about">Domain</Link>
                <Link className= "hover:underline" href="/about">About</Link>
                <Link className= "hover:underline" href="/about">Contact us</Link>
            </div>
            <div className="md:hidden pr-2">
                <Image src={headerImages.drawer} alt="404" width={40}
                onClick={()=> setDrawerOpen(true)}
                />
            </div>
            <div className={`${drawerOpen ? "block" : "hidden"}`}>
                <Drawer/>
            </div>
        </header>
    )
}