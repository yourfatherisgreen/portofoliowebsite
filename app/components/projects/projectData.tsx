import {
  SiFirebase,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from 'react-icons/si';

import type { ProjectCardProps } from './types';

export const PROJECT_LIST: ProjectCardProps[] = [
  {
    id: 'mi-techno-design',
    name: 'MI Techno Design',
    description:
      'An organization profile website for the Informatics Management student association.',
    fullDescription:
      'MI Techno Design is an organization profile website created for the Informatics Management student association. It gives the organization a focused digital home for presenting its identity, activities, and information to students in a clear and approachable way.\n\nThe project combines a Laravel foundation with a responsive Tailwind CSS interface and MySQL-backed content. I focused on a structure that remains easy to scan across devices while giving the association a stronger and more consistent visual presence online.',
    tools: [
      { icon: <SiLaravel />, label: 'Laravel' },
      { icon: <SiHtml5 />, label: 'HTML5' },
      { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
      { icon: <SiMysql />, label: 'MySQL' },
    ],
    releaseDate: 'November 2025',
    thumbnail: '/mi-techno-op.jpeg',
    images: ['/mi-techno-op.jpeg', '/portofolio.jpg', '/archia.png'],
    link: 'https://github.com/yourfatherisgreen/backup-new-mi-techno',
    category: 'Web Development',
    tags: ['Laravel', 'Tailwind CSS', 'MySQL'],
  },
  {
    id: 'inhale-store',
    name: 'INHALE STORE',
    description:
      'A responsive marketplace experience built while exploring modern React development.',
    fullDescription:
      'INHALE STORE is a marketplace project I created to deepen my understanding of React and component-driven interface development. The experience is organized around clear product discovery, strong imagery, and a storefront layout that adapts smoothly from desktop to mobile.\n\nBuilding the project helped me practice reusable UI patterns, responsive composition, and deployment workflows. Vite supports the development experience, while React and Tailwind CSS provide the structure and visual system used throughout the storefront.',
    tools: [
      { icon: <SiVite />, label: 'Vite' },
      { icon: <SiReact />, label: 'React' },
      { icon: <SiNextdotjs />, label: 'Next.js' },
      { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
      { icon: <SiVercel />, label: 'Vercel' },
    ],
    releaseDate: 'March 2026',
    thumbnail: '/inhale-store.jpg',
    images: ['/inhale-store.jpg', '/keep2.png', '/portofolio.jpg'],
    link: 'https://inhalestore.vercel.app/',
    category: 'Web Development',
    tags: ['React', 'Marketplace', 'Responsive UI'],
  },
  {
    id: 'keep',
    name: 'Keep',
    description:
      'A progressive web app for curating saved videos from across social platforms.',
    fullDescription:
      'Keep is my first progressive web app, designed to bring saved videos from different social platforms into one organized library. Instead of losing useful content inside separate feeds, users can build focused playlists and return to the videos they want to keep.\n\nThe application uses Next.js and React for the interface, Tailwind CSS for its responsive design system, and Firebase for cloud-backed application data. The project gave me practical experience designing an installable product around a simple, repeatable content workflow.',
    tools: [
      { icon: <SiReact />, label: 'React' },
      { icon: <SiNextdotjs />, label: 'Next.js' },
      { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
      { icon: <SiFirebase />, label: 'Firebase' },
    ],
    releaseDate: 'May 2026',
    thumbnail: '/keep2.png',
    images: ['/keep2.png', '/inhale-store.jpg', '/portofolio.jpg'],
    link: 'https://keep-app-529304572716.asia-southeast1.run.app/playlist/pl-1780131575841-o1j57',
    category: 'Web Development',
    tags: ['Next.js', 'PWA', 'Firebase'],
  },
  {
    id: 'portfolio-website',
    name: 'Portfolio Website',
    description:
      'A personal portfolio built to express my visual style and present selected work.',
    fullDescription:
      'This portfolio is the place where I combine my development work, design interests, and personal visual direction. It is built to make each section feel deliberate while keeping the experience fast, responsive, and easy to navigate on any screen.\n\nNext.js and TypeScript provide the application foundation, while React, Tailwind CSS, and GSAP support the interactive presentation. The project is an ongoing space for experimenting with motion, layout, and new ways to communicate the thinking behind my work.',
    tools: [
      { icon: <SiNextdotjs />, label: 'Next.js' },
      { icon: <SiReact />, label: 'React' },
      { icon: <SiTypescript />, label: 'TypeScript' },
      { icon: <SiVercel />, label: 'Vercel' },
      { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
    ],
    releaseDate: 'May 2026',
    thumbnail: '/portofolio.jpg',
    images: ['/portofolio.jpg', '/mi-techno-op.jpeg', '/archia.png'],
    link: 'https://muhammadazmi.my.id',
    category: 'Web Development',
    tags: ['Next.js', 'TypeScript', 'GSAP'],
  },
  {
    id: 'archia-design-prototype',
    name: 'Archia Design Prototype',
    description:
      'A hackathon prototype for an AI-powered itinerary planning experience.',
    fullDescription:
      'Archia is a product design prototype created for a hackathon around the idea of AI-assisted itinerary planning. The concept helps travelers move from an open-ended destination idea to a more structured plan without making the experience feel overly technical.\n\nI used Figma to develop the visual direction, organize the core planning flow, and connect the main interactions into a testable prototype. The work focuses on hierarchy, clear decision points, and a mobile experience that keeps complex travel information manageable.',
    tools: [{ icon: <SiFigma />, label: 'Figma' }],
    releaseDate: 'April 2026',
    thumbnail: '/archia.png',
    images: ['/archia.png', '/inhale-store.jpg', '/keep2.png'],
    link: 'https://www.figma.com/proto/xFkcAQtH7PEyanSxnpIx6p/Untitled?node-id=0-1&t=BYW32lpagmbU1Jyq-1',
    category: 'UI/UX',
    tags: ['Figma', 'Product Design', 'AI Travel'],
  },
  {
    id: 'netflix-clone',
    name: 'Netflix Clone',
    description:
      'A streaming-inspired personal website created to present shared memories differently.',
    fullDescription:
      'Netflix Clone is a personal web project I made for my girlfriend as a different way to revisit our shared memories. Familiar streaming patterns turn photos and moments into a playful catalog, giving the experience a clear theme without making it difficult to explore.\n\nThe site is built with HTML, JavaScript, and Tailwind CSS. It was an opportunity to practice responsive layouts and interface details while translating an established visual language into something personal rather than building a conventional photo gallery.',
    tools: [
      { icon: <SiHtml5 />, label: 'HTML5' },
      { icon: <SiTailwindcss />, label: 'Tailwind CSS' },
      { icon: <SiJavascript />, label: 'JavaScript' },
    ],
    releaseDate: 'February 2025',
    thumbnail: '/netflix-clone.jpg',
    images: ['/netflix-clone.jpg', '/portofolio.jpg', '/mi-techno-op.jpeg'],
    link: 'https://epictosmomentos.vercel.app/',
    category: 'Web Development',
    tags: ['JavaScript', 'Tailwind CSS', 'Personal Project'],
  },
];
