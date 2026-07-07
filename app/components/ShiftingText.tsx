// components/RoleCycler.jsx
'use client';

import { useState, useEffect, useMemo } from 'react';

const roles = [
  { text: 'Web Developer', color: '#00C9A7' },
  { text: 'UI/UX Designer', color: '#00C9A7' },
  { text: 'Graphic Designer', color: '#00C9A7' },
  { text: 'Student', color: '#00C9A7' },
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

  const longestText = useMemo(() => {
    return roles.reduce(
      (longest, current) =>
        current.text.length > longest.length ? current.text : longest,
      '',
    );
  }, []);

  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      {/* Hidden placeholder to maintain stable width */}
      <span className="invisible opacity-0" aria-hidden="true">
        {longestText}
      </span>
      <span
        className="absolute left-0 top-0 transition-all duration-800"
        style={{
          color: roles[index].color,
          opacity: visible ? 1 : 0,
          whiteSpace: 'nowrap',
        }}
      >
        {roles[index].text}
      </span>
    </span>
  );
}
