import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Fullpage } from '../../my-fullpage/src/core.js';
import { ProjectHeroSection, projects } from './projects';

type FullpageInstance = {
  moveTo: (index: number) => void;
  destroy: () => void;
};

type MenuView = 'grid' | 'projects' | 'contact';

const contactText =
  'Morbi ornare sit amet ante a bibendum. Sed rhoncus sapien massa, nec efficitur orci bibendum at. Curabitur volutpat ornare quam, dignissim dapibus justo dictum non. Duis a magna quis diam iaculis porta quis faucibus lacus.';

export default function App() {
  const fullpageRef = useRef<HTMLDivElement | null>(null);
  const fullpageInstanceRef = useRef<FullpageInstance | null>(null);
  const seeMoreRef = useRef<HTMLDivElement | null>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [menuView, setMenuView] = useState<MenuView>('grid');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [heroBlur, setHeroBlur] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(null);
  const companies = useMemo(
    () => Array.from(new Set(projects.map((project) => project.company))),
    [],
  );

  useEffect(() => {
    if (!fullpageRef.current) {
      return;
    }

    fullpageInstanceRef.current = new Fullpage(fullpageRef.current, {
      sections: '.section',
      scrollingSpeed: 700,
      navigation: false,
      anchors: projects.map((project) => project.anchor),
      afterLoad: (_origin: number | null, destination: number) => {
        setActiveProject(destination);
      },
    }) as FullpageInstance;

    return () => {
      fullpageInstanceRef.current?.destroy();
      fullpageInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });

      if (!seeMoreRef.current) {
        return;
      }

      const seeMoreRect = seeMoreRef.current.getBoundingClientRect();
      const centerX = seeMoreRect.left + seeMoreRect.width / 2;
      const centerY = seeMoreRect.top + seeMoreRect.height / 2;
      const distance = Math.sqrt((event.clientX - centerX) ** 2 + (event.clientY - centerY) ** 2);
      const maxDistance = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
      const nextBlur = Math.min((distance / maxDistance) * 100, 100);

      setHeroBlur(nextBlur);
      setIsHeaderVisible(nextBlur > 3);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const moveToProject = (index: number) => {
    fullpageInstanceRef.current?.moveTo(index);
    setActiveProject(index);
  };

  const showMenuView = (view: MenuView) => {
    setMenuView(view);
    setHoveredProjectIndex(null);
  };

  const moveToCompany = (company: string) => {
    const firstCompanyProject = projects.findIndex((project) => project.company === company);
    if (firstCompanyProject >= 0) {
      moveToProject(firstCompanyProject);
    }
  };

  return (
    <section className="___nested">
      <span
        className="cursor"
        style={{
          transform: `translate3d(calc(-50% + ${cursorPosition.x}px), calc(-50% + ${cursorPosition.y}px), 0)`,
        }}
      />
      <header
        className="__header_headerMain __header_headerPosition __header_headerFontDefinition seeMoreHover"
        style={{ visibility: isHeaderVisible ? 'visible' : 'hidden' }}
      >
        <div className="nav-hidden">
          <button
            type="button"
            className={`__header_textDefinition __header_mainMenu ${menuView === 'grid' ? 'active' : ''}`}
            onClick={() => showMenuView('grid')}
          >
            Klára Nováčková
          </button>
          <div className="hiddenNav">
            <button
              type="button"
              className={`__header_textDefinition __header_mainMenu ${menuView === 'projects' ? 'active' : ''}`}
              onClick={() => showMenuView('projects')}
            >
              Projects
            </button>
            <br></br>
            <button
              type="button"
              className={`__header_textDefinition __header_mainMenu ${menuView === 'contact' ? 'active' : ''}`}
              onClick={() => showMenuView('contact')}
            >
              Contact
            </button>
          </div>
        </div>
        <div id="page-projects" className="mainPage" hidden={menuView !== 'projects'}>
          {projects.map((project) => (
            <React.Fragment key={project.anchor}>
              <a
                href="template/index.html"
                className="__header_textDefinition"
              >
                {project.title}
              </a>
              <br />
            </React.Fragment>
          ))}
        </div>

        <div id="page-contact" className="mainPage" hidden={menuView !== 'contact'}>
          {contactText}
        </div>

        <div id="projects-grid" data-display="grid" hidden={menuView !== 'grid'}>
          {companies.map((company, companyIndex) => {
            const companyProjects = projects
              .map((project, index) => ({ project, index }))
              .filter((item) => item.project.company === company);

            return (
              <div
                className="columnArrangement hiddenNav"
                style={{ gridRow: companyIndex + 1 }}
                key={company}
              >
                <div className="__header_companyNameNest">
                  <button type="button" onClick={() => moveToCompany(company)}>
                    <h1
                      className={`__header_textDefinition ${
                        projects[activeProject]?.company === company ? 'active' : ''
                      }`}
                    >
                      {company}
                    </h1>
                  </button>
                </div>
                {companyProjects.map(({ project, index }, projectIndex) => (
                  <div
                    className="__header_projectNameNest"
                    style={{ top: projectIndex === 0 ? undefined : `${projectIndex * 100}%` }}
                    key={project.anchor}
                    onMouseEnter={() => setHoveredProjectIndex(index)}
                    onMouseLeave={() => setHoveredProjectIndex(null)}
                  >
                    <button type="button" onClick={() => moveToProject(index)}>
                      <h1 className={`__header_textDefinition ${activeProject === index ? 'active' : ''}`}>
                        {project.title}
                      </h1>
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
          {hoveredProjectIndex !== null && projects[hoveredProjectIndex]?.previewImage && (
            <img
              className="__header_projectPreview"
              src={projects[hoveredProjectIndex].previewImage}
              onError={(event) => {
                event.currentTarget.src = projects[hoveredProjectIndex].heroImage;
              }}
              alt=""
              aria-hidden="true"
            />
          )}
        </div>

        <div />
        <div className="__header_subheader" ref={seeMoreRef}>See more</div>
      </header>

      <main>
        <div id="fullpage" ref={fullpageRef}>
          {projects.map((project) => (
            <ProjectHeroSection key={project.anchor} project={project} blur={heroBlur} />
          ))}
        </div>
      </main>
    </section>
  );
}
