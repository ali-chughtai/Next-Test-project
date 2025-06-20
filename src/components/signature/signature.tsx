import Image from "next/image";
import headerImages from "../../../public/images/header/headerImages";

export default function Signature() {
    return(
        <div className="flex gap-3 items-center">
                <Image src={headerImages.logo} alt="404" width={40} />
                <p className="text-white font-bold text-xl">opportunityabroad</p>
            </div>
    )
}
