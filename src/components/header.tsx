"use client"

import Link from "next/link";
import headerImages from "../../public/images/header/headerImages";
import Image from "next/image";
import Drawer from "./main/drawer";
import { useState, useEffect } from "react";
import {X } from "lucide-react";
import Signature from "./signature/signature";


export default function header() {
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) { 
                setDrawerOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        
        handleResize();
        
    }, []);

    const [drawerOpen, setDrawerOpen] = useState(false)
    return(
        <header className=" rounded-b-lg flex justify-between items-center py-3 border-b-1 bg-gradient-to-r from-[#1B223C] via-[#0E1326] to-[#161C35]" >
            <div className="pl-3">
            <Signature/>
            </div>
            <div className="  hidden w-[60%] justify-between text-md font-semibold text-white py-2 px-2 md:flex"> 
                <Link className= "hover:underline" href="/">Opportunities</Link>
                <Link className= "hover:underline" href="/about">Scholarships</Link>
                <Link className= "hover:underline" href="/about">Domain</Link>
                <Link className= "hover:underline" href="/about">Services</Link>
                <Link className= "hover:underline" href="/about">About</Link>
                <Link className= "hover:underline" href="/about">Contact us</Link>
            </div>
            <div className="md:hidden pr-2">
                { drawerOpen ? 
                    <Image 
                      src={headerImages.cross} 
                      alt="404" 
                      width={30} 
                      onClick={() => toggleDrawer()}
                    />
                    : 
                    <Image 
                      src={headerImages.drawer} 
                      alt="404" 
                      width={34} 
                      onClick={() => toggleDrawer()}
                    />
                }
            </div>
            <div className={`${drawerOpen ? "absolute top-20 sm:top-16 right-2 z-50" : "hidden"}`}>
                <Drawer/>
            </div>
        </header>
    )
}
