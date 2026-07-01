import React from 'react';

export type Project = {
  title: string;
  company: string;
  heroImage: string;
  previewImage?: string;
  anchor: string;
};

export const projects: Project[] = [
  {
    title: 'Poslední před spaním',
    company: 'Company',
    heroImage: 'https://filipl.art/assets/the_last_one_before_bedtime-1021-tRdM94w1.webp',
    previewImage: 'https://filipl.art/images/the_last_one_before_bedtime.webp',
    anchor: 'posledni-pred-spanim',
  },
  {
    title: 'Makulatura',
    company: 'Company 2',
    heroImage: 'https://i.pinimg.com/736x/b2/fb/5e/b2fb5ecead34959192d86c25fd8e9b44.jpg',
    previewImage: 'https://filipl.art/images/makulatura2.webp',
    anchor: 'makulatura',
  },
  {
    title: 'Bílá štěňátka',
    company: 'Company 3',
    heroImage: 'https://filipl.art/assets/white_puppiesquality_2-BGbt1M2E.webp',
    previewImage: 'https://filipl.art/images/white_puppiesquality=1.webp',
    anchor: 'bila-stenatka',
  },
];

type ProjectHeroSectionProps = {
  project: Project;
  blur: number;
};

export function ProjectHeroSection({ project, blur }: ProjectHeroSectionProps) {
  return (
    <div className="section">
      <img
        src={project.heroImage}
        alt={project.title}
        className="__main_mainImage_hero"
        style={{ filter: `blur(${blur}px)` }}
      />
    </div>
  );
}
