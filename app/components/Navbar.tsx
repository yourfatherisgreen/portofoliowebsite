'use client';
import { useState } from 'react';
import { FaCode, FaLink, FaLaptopCode, FaBars, FaTimes } from 'react-icons/fa';
import { CgHome } from 'react-icons/cg';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-transparent p-6 text-white">
      <div className="cursor-pointer flex items-center justify-between lg:justify-center ">
        <div className="text-lg font-light lg:fixed lg:left-10 lg:text-2xlrounded-2xl text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg group px-2">
          <div className="flex items-center gap-2 ">
            <Image
              src="/personallogonew.svg"
              alt="logo"
              width={50}
              height={50}
              loading="eager"
            />
            <div>
              <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out whitespace-nowrap">
                Muhammad Azmi
              </p>
            </div>
          </div>
        </div>

        <div
          className="cursor-pointer text-2xl lg:hidden "
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul
          className={`
          flex flex-col gap-6 absolute top-20 left-0 w-full bg-black/90 p-10 transition-all duration-300 ease-in
          lg:static lg:flex-row lg:gap-4 lg:w-auto lg:bg-black/80 lg:p-2 lg:rounded-2xl lg:flex
          ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0 lg:translate-y-0 lg:opacity-100'}
        `}
        >
          <a href="#herosec">
            <NavItem icon={<CgHome size="1.5rem" />} label="Home" />
          </a>

          <a href="#about">
            <NavItem
              icon={<IoInformationCircleOutline size="1.8rem" />}
              label="About Me"
            />
          </a>
          <NavItem icon={<FaCode size="1.5rem" />} label="Skills" />
          <NavItem icon={<FaLaptopCode size="1.5rem" />} label="Projects" />
          <NavItem icon={<FaLink size="1.2rem" />} label="Contacts" />
        </ul>
      </div>
    </nav>
  );
}

function NavItem({ icon, label }: { icon: React.ReactElement; label: string }) {
  return (
    <li className="group cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 px-2 py-1 hover:bg-white rounded-2xl hover:text-black hover:shadow-md hover:scale-105 font-light">
      <span className="flex items-center gap-2 border-transparent text-2xl ">
        <div className="transition-all transform duration-500 ease-out group-hover:-rotate-12 group-hover:scale-125 ">
          {icon}
        </div>
        <div className="transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:font-medium">
          {label}
        </div>
      </span>
    </li>
  );
}
