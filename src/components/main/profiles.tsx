"use client";
import profileImages from "../../../public/images/profiles/profileImages";
import flags from "../../../public/images/flags/flag/flagImages";
import Image from "next/image";

export default function Profiles() {

  const profiles = [
    {
      profilePicture: profileImages.koreanProfessor,
      name: "Ms. Inzish Sajid (UK)",
      countries: [flags.uk],
      degree: "Doctoral Researcher, Lecturer",
      description: ["British Council Projects expertise,", "Commonwealth Scholarships"] 
    },
    {
      profilePicture: profileImages.koreanProfessor,
      name: "Dr. Adeela (Russia, Japan)",
      countries: [flags.russia, flags.japan, flags.germany],
      degree: "Theoretical & Computational Physics research area",
      description: ["Short term grants in Germany,", "Post Doc hunting trips for Japan and Russia"] 
    },
    {
      profilePicture: profileImages.koreanProfessor,
      name: "Dr. Khizar H. Khan (China)",
      countries: [flags.china, flags.germany],
      degree: "Research interest in Energy sector ",
      description: ["Short term grants in Germany,", "Post Doc hunting for China"] 
    },
    {
      profilePicture: profileImages.koreanProfessor,
      name: "Ms. Shafqat (Italy)",
      countries: [flags.italy, flags.uk],
      degree: "Master study routes and opportunities",
      description: ["Hunting for master studies in England"] 
    },
    {
      profilePicture: profileImages.koreanProfessor,
      name: "Ms. Amna (Australia)",
      countries: [flags.australia],
      degree: "Researcher in Polymer Science and Engineering",
      description: [, "Doctoratal study route to Australia"] 
    },
    {
      profilePicture: profileImages.koreanProfessor,
      name: "Ms. Aiman (USA)",
      countries: [flags.america],
      degree: "Researcher in field of Supercapacitors/Batteries",
      description: ["Guidelines for admission processors in USA universities"] 
    },
    {
      profilePicture: profileImages.koreanProfessor,
      name: "Ms. Baria (Germany)",
      countries: [flags.germany],
      // degree: "Researcher in field of Supercapacitors/Batteries",
      description: ["Study routes for masters in German Universities "] 
    },
    {
      profilePicture: profileImages.koreanProfessor,
      name: "Ms. Ammara (Germany)",
      countries: [flags.germany],
      // degree: "Researcher in field of Supercapacitors/Batteries",
      description: ["Master study guidelines in German Universities "] 
    },
  ]
  // const profiles = [
  //   {
  //     profilePicture: profileImages.koreanProfessor,
  //     name: "Professor Tae-joon",
  //     countries: flags.south_korea,
  //     degree: "Masters in AeroSpace Engineering",
  //     description: "part of our team, guided 100+ students",
  //   },
  //   {
  //     profilePicture: profileImages.americanProfessor,
  //     name: "Professor Tim Miller",
  //     countries: flags.america,
  //     degree: "PHD in Mathematics",
  //     description: "A Leading figure of University of Colarado",
  //   },
  //   {
  //     profilePicture: profileImages.germanProfessor,
  //     name: "Mr. Bastian",
  //     countries: flags.germany,
  //     degree: "Masters in Material Science",
  //     description: "Leading research in Nano Techonology and Metallurgy",
  //   },
  //   {
  //     profilePicture: profileImages.argentinianProfessor,
  //     name: "Professor Mateo",
  //     countries: flags.argentina,
  //     degree: "Atheletic Director",
  //     description:
  //       "Experienced coach, with experties in Athletic leadership and Management",
  //   },
  //   {
  //     profilePicture: profileImages.frenchProfessor,
  //     name: "Dr. Claude",
  //     countries: flags.france,
  //     degree: "PHD in Interior Design and Architecture",
  //     description: "Took parts in Architectural projects at National Level",
  //   },
  //   {
  //     profilePicture: profileImages.italianProfessor,
  //     name: "Ms. Maria",
  //     countries: flags.italy,
  //     degree: "Masters in Media Sciences",
  //     description: "Leading figure in Media Sciences",
  //   },
  //   {
  //     profilePicture: profileImages.canadianProfessor,
  //     name: "Mr. Dave Williams",
  //     countries: flags.canada,
  //     degree: "PHD in Accounting Finance",
  //     description: "15+ years of experience in Banking and Taxation sectors",
  //   },
  //   {
  //     profilePicture: profileImages.ukProfessor,
  //     name: "Ms. Michelle",
  //     countries: flags.uk,
  //     degree: "Professor of History",
  //     description: "Preseved the history of the Great Britain",
  //   },
  // ];

  return (
    <div
      id="profiles"
      className="flex gap-6 flex-col items-center justify-between my-5 mt-10"
    >
      <h1 className="text-2xl text-black font-bold">Our Contacts</h1>
      <div className="text-black grid text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full">
        {profiles.map((profile, index) => {
          const totalItems = profiles.length;

          const isLastItemSm = index === totalItems - 1;

          const isLastRowMd = index >= totalItems - 2;
          const isLastColMd = (index + 1) % 2 === 0;

          const isLastRowLg = index >= totalItems - 4;
          const isLastColLg = (index + 1) % 4 === 0;

          return (
            <div
              key={index}
              className={`
                flex flex-col gap-2 items-center justify-center px-2 py-4
                
                ${!isLastItemSm ? "border-b border-gray-300" : ""} 
                ${
                  !isLastRowMd
                    ? "sm:border-b sm:border-gray-300"
                    : "sm:border-b-0"
                } 
                ${
                  !isLastRowLg
                    ? "md:border-b md:border-gray-300"
                    : "md:border-b-0"
                } 
                
                ${
                  isLastColMd
                    ? "sm:border-r-0"
                    : "sm:border-r sm:border-gray-300"
                } 
                ${
                  isLastColLg
                    ? "md:border-r-0"
                    : "md:border-r md:border-gray-300"
                } 
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
              
              {Array.isArray(profile.description) ? (
                profile.description.map((item, idx) => (
                  <p key={idx} className="text-sm text-gray-600">{item}</p>
                ))
              ) : (
                <p className="text-sm text-gray-600">{profile.description}</p>
              )}
              
              <div className="flex gap-2">
                <p className="font-semibold">Countries:</p>
                {Array.isArray(profile.countries) ? (
                  profile.countries.map((country, idx) => (
                    <div key={idx} className="border border-gray-300 ">
                      <Image 
                        src={country} 
                        alt="" 
                        width={40} 
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <Image src={profile.countries} alt="" width={40} />
                )}
                {/* <Image src={profile.countries} alt="" width={40} /> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
