'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent, ReactElement } from 'react';
import { FaCode, FaLink, FaLaptopCode } from 'react-icons/fa';
import { CgHome } from 'react-icons/cg';
import { IoInformationCircleOutline } from 'react-icons/io5';
import Image from 'next/image';
import StaggeredMenu from '@app/components/MobileNav';
import clsx from 'clsx';

const menuItems = [
  {
    label: 'Home',
    ariaLabel: 'Go to home section',
    link: '#herosec',
    icon: <CgHome size="1.15rem" />,
  },
  {
    label: 'About',
    ariaLabel: 'Go to about section',
    link: '#about',
    icon: <IoInformationCircleOutline size="1.3rem" />,
  },
  {
    label: 'Tech Stack',
    ariaLabel: 'Go to skills section',
    link: '#skills',
    icon: <FaCode size="1.1rem" />,
  },
  {
    label: 'Projects',
    ariaLabel: 'Go to projects section',
    link: '#projects',
    icon: <FaLaptopCode size="1.15rem" />,
  },
  {
    label: 'Contacts',
    ariaLabel: 'Get in touch',
    link: '#contacts',
    icon: <FaLink size="1rem" />,
  },
];



export default function Navbar() {
  const [activeLink, setActiveLink] = useState(menuItems[0].link);
  const [activeTabStyle, setActiveTabStyle] = useState({ left: 0, width: 0 });
  const [isManualNavigation, setIsManualNavigation] = useState(false);
  const navListRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const manualNavigationTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const isManualScroll = useRef(false);

  const updateActiveTab = useCallback(
    (link = activeLink) => {
      const activeItem = itemRefs.current[link];
      const navList = navListRef.current;

      if (!activeItem || !navList) {
        return;
      }

      const itemRect = activeItem.getBoundingClientRect();
      const navRect = navList.getBoundingClientRect();

      setActiveTabStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      });
    },
    [activeLink]
  );

  const handleManualNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    event.preventDefault();

    if (manualNavigationTimeout.current) {
      clearTimeout(manualNavigationTimeout.current);
    }

    isManualScroll.current = true;
    setIsManualNavigation(true);
    setActiveLink(link);
    updateActiveTab(link);

    window.history.pushState(null, '', link);
    document
      .getElementById(link.replace('#', ''))
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    manualNavigationTimeout.current = setTimeout(() => {
      isManualScroll.current = false;
      setIsManualNavigation(false);
    }, 900);
  };

  useEffect(() => {
    const getSectionFromLink = (link: string) =>
      document.getElementById(link.replace('#', ''));

    const updateActiveSection = () => {
      const viewportLine = window.innerHeight * 0.4;
      const currentItem =
        menuItems.find((item) => {
          const section = getSectionFromLink(item.link);

          if (!section) {
            return false;
          }

          const rect = section.getBoundingClientRect();
          return rect.top <= viewportLine && rect.bottom > viewportLine;
        }) ??
        [...menuItems].reverse().find((item) => {
          const section = getSectionFromLink(item.link);
          return section && section.getBoundingClientRect().top <= viewportLine;
        }) ??
        menuItems[0];

      setActiveLink(currentItem.link);
    };

    let animationFrame = 0;
    const handleScroll = () => {
      if (isManualScroll.current) {
        return;
      }

      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      if (manualNavigationTimeout.current) {
        clearTimeout(manualNavigationTimeout.current);
      }

      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    updateActiveTab();
    const handleResize = () => updateActiveTab();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateActiveTab]);

  return (
    <>
      {/* ── Desktop nav (unchanged) ── visible lg+ ── */}
      <nav className="fixed inset-x-0 top-0 z-50 bg-transparent p-4 text-white hidden lg:block">
        <div className="cursor-pointer flex items-center justify-center">
          <div className="text-sm font-light lg:fixed lg:left-8 lg:text-lg rounded-xl text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg group px-2">
            <div className="flex  items-center gap-2 ">
              <Image
                src="/personallogonew.svg"
                alt="logo"
                width={40}
                height={40}
                loading="lazy"
              />
              <div>
                <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out whitespace-nowrap">
                  muhammadazmi.my.id
                </p>
              </div>
            </div>
          </div>

          <ul
            ref={navListRef}
            className="relative flex flex-row gap-2 bg-black/65 p-1.5 rounded-xl backdrop-blur-md"
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute left-0 top-1.5 bottom-1.5 rounded-lg bg-teal-500/90 shadow-sm ${
                isManualNavigation
                  ? 'transition-none'
                  : 'transition-all duration-500 ease-out'
              }`}
              style={{
                transform: `translateX(${activeTabStyle.left}px)`,
                width: `${activeTabStyle.width}px`,
              }}
            />
            {menuItems.map((item) => (
              <NavItem
                key={item.link}
                refCallback={(element) => {
                  itemRefs.current[item.link] = element;
                }}
                href={item.link}
                ariaLabel={item.ariaLabel}
                icon={item.icon}
                label={item.label === 'About' ? 'About Me' : item.label}
                isActive={activeLink === item.link}
                onClick={(event) => handleManualNavigation(event, item.link)}
              />
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Mobile StaggeredMenu ── visible below lg ── */}
      <div className="lg:hidden fixed inset-0 z-50 pointer-events-none">
        <StaggeredMenu
          position="right"
          items={menuItems}
          displaySocials
          displayItemNumbering={false}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#ffffff"
          changeMenuColorOnOpen={true}
          colors={['#0f172a', '#1e293b']}
          logoUrl="/personallogonew.svg"
          accentColor="#00C9A7"
          isFixed={false}
        />
      </div>
    </>
  );
}

function NavItem({
  href,
  ariaLabel,
  icon,
  label,
  isActive,
  onClick,
  refCallback,
}: {
  href: string;
  ariaLabel: string;
  icon: ReactElement;
  label: string;
  isActive: boolean;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
  refCallback: (element: HTMLLIElement | null) => void;
}) {
  return (
    <li ref={refCallback} className="relative z-10">
      <a
        href={href}
        aria-label={ariaLabel}
        aria-current={isActive ? 'location' : undefined}
        onClick={onClick}
        className={clsx('group flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 text-base font-light transition-transform duration-200 ease-out  ', {
          'text-{#00C9A7}': isActive,
          'text-white': !isActive,
          'hover:scale-none': isActive,
          'bg-teal-500': isActive,
          'hover:scale-105': !isActive,
        })}
      >
        <span className="transition-transform duration-200 ease-out group-hover:scale-110">
          {icon}
        </span>
        <span
          className={clsx('origin-left transition-transform duration-200 ease-out group-hover:scale-110 group-hover:font-semibold', {
            'font-medium': isActive,
            'font-light': !isActive
          })}
        >
          {label}
        </span>
      </a>
    </li>
  );
}
