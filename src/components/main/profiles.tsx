"use client"
import profileImages from "../../../public/images/profiles/profileImages";
import flags from "../../../public/images/flags/flag/flagImages";
import Image from "next/image";

export default function Profiles() {
  const profiles = [
    {
      profilePicture: profileImages.koreanProfessor,
      name: "Professor Tae-joon",
      nationality: flags.south_korea,
      degree: "Masters in AeroSpace Engineering",
      description: "part of our team, guided 100+ students",
    },
    {
      profilePicture: profileImages.americanProfessor,
      name: "Professor Tim Miller",
      nationality: flags.america,
      degree: "PHD in Mathematics",
      description: "A Leading figure of University of Colarado",
    },
    {
      profilePicture: profileImages.germanProfessor,
      name: "Mr. Bastian",
      nationality: flags.germany,
      degree: "Masters in Material Science",
      description: "Leading research in Nano Techonology and Metallurgy",
    },
    {
      profilePicture: profileImages.argentinianProfessor,
      name: "Professor Mateo",
      nationality: flags.argentina,
      degree: "Atheletic Director",
      description:
        "Experienced coach, with experties in Athletic leadership and Management",
    },
    {
      profilePicture: profileImages.frenchProfessor,
      name: "Dr. Claude",
      nationality: flags.france,
      degree: "PHD in Interior Design and Architecture",
      description:
        "Took parts in Architectural projects at National Level",
    },
    {
      profilePicture: profileImages.italianProfessor,
      name: "Ms. Maria",
      nationality: flags.italy,
      degree: "Masters in Media Sciences",
      description:
        "Leading figure in Media Sciences",
    },
    {
      profilePicture: profileImages.canadianProfessor,
      name: "Mr. Dave Williams",
      nationality: flags.canada,
      degree: "PHD in Accounting Finance",
      description:
        "15+ years of experience in Banking and Taxation sectors",
    },
    {
      profilePicture: profileImages.ukProfessor,
      name: "Ms. Michelle",
      nationality: flags.uk,
      degree: "Professor of History",
      description:
        "Preseved the history of the Great Britain",
    },
  ];

  return (
    <div 
    id="profiles"
    className="flex gap-6 flex-col items-center justify-between my-5 mt-10">
      <h1 className="text-2xl text-black font-bold" >Our Contacts</h1>
      <div
        className="text-black grid text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full"
      >
        {profiles.map((profile, index) => {
          const totalItems = profiles.length;
          
          // Small screens (1 column)
          const isLastItemSm = index === totalItems - 1;
          
          // Medium screens (2 columns)
          const isLastRowMd = index >= totalItems - 2;
          const isLastColMd = (index + 1) % 2 === 0;
          
          // Large screens (4 columns)
          const isLastRowLg = index >= totalItems - 4;
          const isLastColLg = (index + 1) % 4 === 0;
          
          return (
            <div
              key={index}
              className={`
                flex flex-col gap-2 items-center justify-center px-2 py-4
                
                // Border bottom logic
                ${!isLastItemSm ? "border-b border-gray-300" : ""} 
                ${!isLastRowMd ? "sm:border-b sm:border-gray-300" : "sm:border-b-0"} 
                ${!isLastRowLg ? "md:border-b md:border-gray-300" : "md:border-b-0"} 
                
                // Border right logic
                ${isLastColMd ? "sm:border-r-0" : "sm:border-r sm:border-gray-300"} 
                ${isLastColLg ? "md:border-r-0" : "md:border-r md:border-gray-300"} 
              `}
            >
              <Image
                src={profile.profilePicture}
                width={90}
                className="rounded-full"
                alt=""
              />
              <h1 className="font-bold text-lg">{profile.name}</h1>
              <h2 className="italic">{profile.degree}</h2>
              <p className="text-sm text-gray-600">"{profile.description}"</p>
              <div className="flex gap-2">
                <p className="font-semibold">Nationality:</p>
                <Image src={profile.nationality} alt="" width={40} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
