import type React from 'react';

export interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  tools: { icon: React.ReactNode; label: string }[];
  releaseDate: string;
  thumbnail: string;
  images: string[];
  link: string;
  category: string;
  tags: string[];
}
