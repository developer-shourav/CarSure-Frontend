import carSureLogo from "@/assets/logo/carSure.png";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#1a1b1f] text-white py-10 lg:py-20 mt-20 lg:mt-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:hidden lg:block lg:w-1/4  px-4 mb-8 md:mb-0">
            <div className="mb-6">
              <a href="https://car-sure.vercel.app" target="_blank">
                <img className="w-[100px] rounded-2xl" loading="lazy" src={carSureLogo} alt="carSureLogo Logo" />
              </a>
            </div>
            <div>
              <h4 className="text-[25px] font-semibold mb-2 border-b-2 border-red-500 inline-block">Office</h4>
              <p>
                Holding # 457, DIT Road, 3rd Floor, Nawabgonj, Dhaka-1320.
              </p>
            </div>
            <ul className="flex gap-6 mt-4">
              <li className="border p-2 rounded-lg border-[#9b9b9b38] hover:bg-red-600 hover:rotate-[360deg] duration-1000">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  className=""
                >
                  <FaFacebookF />
                </a>
              </li>
              <li className="border p-2 rounded-lg border-[#9b9b9b38] hover:bg-red-600 hover:rotate-[360deg] duration-1000">
                <a
                  href="https://www.twitter.com/"
                  target="_blank"
                  className=""
                >
                  <FaTwitter />
                </a>
              </li>
              <li className="border p-2 rounded-lg border-[#9b9b9b38] hover:bg-red-600 hover:rotate-[360deg] duration-1000">
                <a
                  href="https://www.pinterest.com/"
                  target="_blank"
                  className=""
                >
                  <FaPinterestP />
                </a>
              </li>
              <li className="border p-2 rounded-lg border-[#9b9b9b38] hover:bg-red-600 hover:rotate-[360deg] duration-1000">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  className=""
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-[33.33%] lg:w-1/4 px-4 mb-8 md:mb-0">
            <h4 className="text-lg lg:text-xl font-bold mb-4 text-red-600 uppercase">Our Services</h4>
            <ul>
              <li className="mb-2">
                <a
                  href="https://github.com/developer-shourav"
                  className="hover:text-red-500  duration-500"
                >
                  Custom Super Car
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/developer-shourav"
                  className="hover:text-red-500  duration-500"
                >
                  Develop Super Engine
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/developer-shourav"
                  className="hover:text-red-500  duration-500"
                >
                  Car Modification
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/developer-shourav"
                  className="hover:text-red-500  duration-500"
                >
                  Export Cars
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/developer-shourav"
                  className="hover:text-red-500  duration-500"
                >
                  Import Cars
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/developer-shourav"
                  className="hover:text-red-500  duration-500"
                >
                  App Development
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-[33.33%] lg:w-1/4 px-4 mb-8 md:mb-0">
            <h4 className="text-lg lg:text-xl font-bold mb-4 text-red-600 uppercase">Company</h4>
            <ul>
              <li className="mb-2">
                <a
                  href="https://github.com/developer-shourav"
                  className="hover:text-red-500  duration-500"
                >
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/developer-shourav"
                  className="hover:text-red-500  duration-500"
                >
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/developer-shourav"
                  className="hover:text-red-500  duration-500"
                >
                  Project
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/developer-shourav"
                  className="hover:text-red-500  duration-500"
                >
                  Blog
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/developer-shourav"
                  className="hover:text-red-500  duration-500"
                >
                  Career
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/developer-shourav"
                  className="hover:text-red-500  duration-500"
                >
                  Pricing Plan
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-[33.33%] lg:w-1/4 px-4 mb-8 md:mb-0">
            <h4 className="text-lg lg:text-xl font-bold mb-4 text-red-600 uppercase">Contacts</h4>
            <div className="flex items-center mb-4">
              <FaPhoneAlt className="mr-3 text-red-500" />
              <div>
                <a
                  href="tel:+880192376388"
                  className="block hover:text-red-500  duration-500"
                >
                  +880 192376388
                </a>
                <a
                  href="tel:+8801855001923"
                  className="block hover:text-red-500  duration-500"
                >
                  +880 1855001923
                </a>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <FiMail className="mr-3 text-xl text-red-500" />
              <a
                href="mailto:developer.shourav1@gmail.com"
                className="hover:text-red-500  duration-500"
              >
                developer.shourav1@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-3 text-2xl text-red-500" />
              <p>
                Holding # 457, DIT Road, 3rd Floor, West Nawabgonj, Dhaka-1320.
              </p>
            </div>
          </div>
        </div>
        {/* ----------Content Only Visiable into Medium Device-------- */}
        <div className="hidden md:block lg:hidden p-2 mt-5 md:mb-0">
            <div className="mb-6">
              <a href="https://car-sure.vercel.app" target="_blank">
                <img className="w-[100px] rounded-2xl" src={carSureLogo} loading="lazy" alt="carSureLogo Logo" />
              </a>
            </div>
            <div>
              <h4 className="text-[25px] font-semibold mb-2 border-b-2 border-red-500 inline-block">Office</h4>
              <p>
                Holding # 457, DIT Road, 3rd Floor, Nawabgonj, Dhaka-1320.
              </p>
            </div>
            <ul className="flex gap-6 mt-4">
              <li className="border p-2 rounded-lg border-[#9b9b9b38] hover:bg-red-600 hover:rotate-[360deg] duration-1000">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  className=""
                >
                  <FaFacebookF />
                </a>
              </li>
              <li className="border p-2 rounded-lg border-[#9b9b9b38] hover:bg-red-600 hover:rotate-[360deg] duration-1000">
                <a
                  href="https://www.twitter.com/"
                  target="_blank"
                  className=""
                >
                  <FaTwitter />
                </a>
              </li>
              <li className="border p-2 rounded-lg border-[#9b9b9b38] hover:bg-red-600 hover:rotate-[360deg] duration-1000">
                <a
                  href="https://www.pinterest.com/"
                  target="_blank"
                  className=""
                >
                  <FaPinterestP />
                </a>
              </li>
              <li className="border p-2 rounded-lg border-[#9b9b9b38] hover:bg-red-600 hover:rotate-[360deg] duration-1000">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  className=""
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>

        <div className="mt-8 border-t border-gray-700 pt-6">
          <div className="flex flex-wrap items-center justify-between">
            <div className="text-sm mb-5 md:mb-0">
              <span>
                &copy; 2025 <b>Developer Shourav</b>
              </span>
            </div>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="hover:text-red-500  duration-500">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-red-500  duration-500">
                Terms of Use
              </a>
              <a href="#" className="hover:text-red-500  duration-500">
                Support Policy
              </a>
              <a href="#" className="hover:text-red-500  duration-500">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;