'use client';
import { FaCode, FaLink, FaLaptopCode } from 'react-icons/fa';
import { CgHome } from 'react-icons/cg';
import { IoInformationCircleOutline } from 'react-icons/io5';
import Image from 'next/image';
import StaggeredMenu from '@app/components/MobileNav';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '#herosec' },
  { label: 'About', ariaLabel: 'Go to about section', link: '#about' },
  { label: 'Skills', ariaLabel: 'Go to skills section', link: '#skills' },
  { label: 'Projects', ariaLabel: 'Go to projects section', link: '#projects' },
  { label: 'Contacts', ariaLabel: 'Get in touch', link: '#contacts' },
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
];

export default function Navbar() {
  return (
    <>
      {/* ── Desktop nav (unchanged) ── visible lg+ ── */}
      <nav className="fixed inset-x-0 top-0 z-50 bg-transparent p-6 text-white hidden lg:block">
        <div className="cursor-pointer flex items-center justify-center">
          <div className="text-lg font-light lg:fixed lg:left-10 lg:text-2xl rounded-2xl text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg group px-2">
            <div className="flex items-center gap-2">
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

          <ul className="flex flex-row gap-4 bg-black/80 p-2 rounded-2xl">
            <a href="#herosec">
              <NavItem icon={<CgHome size="1.5rem" />} label="Home" />
            </a>
            <a href="#about">
              <NavItem
                icon={<IoInformationCircleOutline size="1.8rem" />}
                label="About Me"
              />
            </a>
            <a href="#skills">
              <NavItem icon={<FaCode size="1.5rem" />} label="Skills" />
            </a>
            <a href="#projects">
              <NavItem icon={<FaLaptopCode size="1.5rem" />} label="Projects" />
            </a>
            <a href="#contacts">
              <NavItem icon={<FaLink size="1.2rem" />} label="Contacts" />
            </a>
          </ul>
        </div>
      </nav>

      {/* ── Mobile StaggeredMenu ── visible below lg ── */}
      <div className="lg:hidden fixed inset-0 z-50 pointer-events-none">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['#B497CF', '#5227FF']}
          logoUrl="/personallogonew.svg"
          accentColor="#5227FF"
          isFixed={false}
        />
      </div>
    </>
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
