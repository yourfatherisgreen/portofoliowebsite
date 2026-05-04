// components/RoleCycler.jsx
'use client';

import { useState, useEffect } from 'react';

const roles = [
  { text: 'Web Developer', color: '#6C63FF' }, // purple
  { text: 'UI/UX Designer', color: '#00C9A7' }, // teal
  { text: 'Graphic Designer', color: '#FF6B6B' }, // coral
  { text: 'Student', color: '#FFC300' }, // gold
];

export default function ShiftingText() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false); // fade out
      setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length); // swap text
        setVisible(true); // fade in
      }, 400); // match CSS transition
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        color: roles[index].color,
        transition: 'opacity 0.8s ease, color 0.8s ease',
        opacity: visible ? 1 : 0,
        display: 'inline-block',
      }}
    >
      {roles[index].text}
    </span>
  );
}
