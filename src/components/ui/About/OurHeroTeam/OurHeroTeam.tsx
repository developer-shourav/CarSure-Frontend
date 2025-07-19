import { WebsiteHeading } from "@/components/ui/WebsiteHeading/WebsiteHeading";
import SectionWrapper from "@/components/ui/wrapper/SectionWrapper";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

const mechanics = [
  {
    name: "Sabbir Ahmed",
    role: "Internal Combustion Engineer",
    image: "/team/engineer1.jpg",
  },
  {
    name: "Sam Sundar",
    role: "Electronic Diagnostics Specialist",
    image: "/team/engineer2.jpg",
  },
  {
    name: "Jamil Khan",
    role: "Brake Systems Engineer",
    image: "/team/engineer3.jpg",
  },
  {
    name: "Rakib Hossain",
    role: "Chassis Design Engineer",
    image: "/team/engineer4.jpg",
  },
  {
    name: "Liam O'Connor",
    role: "Turbocharger Expert",
    image: "/team/engineer5.jpg",
  },
  {
    name: "Aiko Tanaka",
    role: "ECU Mapping Specialist",
    image: "/team/engineer6.jpg",
  },
  {
    name: "Carlos Mendoza",
    role: "Transmission Systems Engineer",
    image: "/team/engineer7.jpg",
  },
  {
    name: "Fatima Al-Sayed",
    role: "Vehicle Dynamics Analyst",
    image: "/team/engineer8.jpg",
  },
  {
    name: "Viktor Petrov",
    role: "Fuel Efficiency Engineer",
    image: "/team/engineer9.jpg",
  },
  {
    name: "Chen Wei",
    role: "EV Powertrain Engineer",
    image: "/team/engineer10.jpg",
  },
  {
    name: "Elena Rossi",
    role: "Thermal Systems Engineer",
    image: "/team/engineer11.jpg",
  },
  {
    name: "David Brown",
    role: "Advanced Materials Specialist",
    image: "/team/engineer12.jpg",
  },
];
const OurHeroTeam = () => {
  // --------Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <SectionWrapper>
      <div className="text-center mb-16">
        <WebsiteHeading title="Our Engineering Experts" />
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6 xl:gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {mechanics.map((member, index) => (
          <motion.div
            key={index}
            variants={item}
            className="group relative bg-white dark:bg-zinc-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-200 dark:border-zinc-800"
          >
            <div className="relative overflow-hidden">
              <div className="bg-gradient-to-r from-rose-900 to-rose-700 h-32 md:h-36  lg:h-40" />

              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 group-hover:-top-4 transition-all duration-300">
                <div className="relative">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-rose-500 to-rose-700 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative mt-5 rounded-full border-4 border-white "
                  />
                </div>
              </div>
            </div>

            <div className="p-5 md:pb-8 px-6 text-center">
              <h3 className="md:text-lg lg:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-rose-600 transition-colors">
                {member.name}
              </h3>
              <p className="mt-2 text-sm md:text-[16px] text-rose-600 font-medium">
                {member.role}
              </p>

              <div className="mt-4 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-colors">
                  <Linkedin />
                </button>
                <button className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-colors">
                  <Mail />
                </button>
              </div>
            </div>

            {/* --------Decorative elements-------- */}
            <div className="absolute top-0 right-0 size-16 md:size-20 -mt-4 -mr-4 bg-rose-400 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 size-16 md:size-20 -mb-4 -ml-4 bg-red-500  rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default OurHeroTeam;
