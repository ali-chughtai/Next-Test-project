"use client"

import Link from "next/link";
import headerImages from "../../public/images/header/headerImages";
import Image from "next/image";
import Drawer from "./main/drawer";
import { useState, useEffect } from "react";
import Signature from "./signature/signature";
import scrollToSection from "@/app/utils/scrollToSection";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [adminRoute, setAdminRoute] = useState(false); 
    const router = useRouter();
    const pathname = usePathname();

    useEffect(()=>{
        setAdminRoute(pathname.includes("admin") && !pathname.includes("login"))
    },[pathname])

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
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
        <header className=" rounded-b-lg flex justify-between items-center py-3 border-b-1 bg-gradient-to-r from-[#1B223C] via-[#0E1326] to-[#161C35]" >
            <div className="pl-3">
            <Signature/>
            </div>
                {!adminRoute ? 
            <div className="  hidden w-[60%] justify-end gap-10 text-md font-semibold text-white py-2 px-2 md:flex"> 
                <Link className= "hover:underline" 
                onClick={() => scrollToSection('services')}
                href="">Services</Link>
                <Link className= "hover:underline" 
                onClick={() => scrollToSection('appointments')} href="">Appointments</Link>
                <Link className= "hover:underline" 
                onClick={() => scrollToSection('profiles')}
                href="">Profiles</Link>
                <Link className= "hover:underline" 
                onClick={() => scrollToSection('footer')}
                href="">Contact us</Link>
            </div>
               : <Link 
               className="text-md font-semibold text-white pr-4"
               onClick={()=>localStorage.removeItem("token")}
               href={"/admin/login"}>Signout</Link>
                }
            <div className="md:hidden pr-2">
                { drawerOpen ? 
                    <Image 
                      src={headerImages.cross} 
                      alt="404" 
                      width={20} 
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
