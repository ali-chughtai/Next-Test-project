import { Menu } from "lucide-react";
import Link from "next/link";

export default function Drawer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
};
    return (
      <div className=" flex flex-col bg-white rounded-md text-black w-64 z-50 p-4 shadow-lg">
       <Link className= "hover:underline py-2 px-4" 
                onClick={() => scrollToSection('services')}
                href="">Services</Link>
                <Link className= "hover:underline py-2 px-4" 
                onClick={() => scrollToSection('appointments')} href="">Appointments</Link>
                <Link className= "hover:underline py-2 px-4" 
                onClick={() => scrollToSection('profiles')}
                href="">Profiles</Link>
                <Link className= "hover:underline py-2 px-4" 
                onClick={() => scrollToSection('footer')}
                href="">Contact us</Link>
      </div>
    );
}
