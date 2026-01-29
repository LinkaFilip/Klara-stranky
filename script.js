import { getTotalSections } from "./my-fullpage/src/sections";

// Create a custom cursor element
const cursor = document.createElement('span');
cursor.className = 'cursor';
document.body.appendChild(cursor);

// Get the "see more" element and the imgs
const seeMore = document.querySelector('.__header_subheader');
const imgs = document.querySelectorAll('img.__main_mainImage_hero');
const headerMain = document.querySelector('.__header_headerMain');
const navHiddens = document.querySelectorAll('.hideableNav');

// Calculate max distance (diagonal of the viewport)
const maxDistance = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);

// Update cursor position and imgs blur on mouse move
document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate3d(calc(-50% + ${e.clientX}px), calc(-50% + ${e.clientY}px), 0px)`;

    if (seeMore && imgs.length > 0) {
        const rect = seeMore.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
        const blur = Math.min((distance / maxDistance) * 100, 100);
        imgs.forEach(img => {
            img.style.filter = `blur(${blur}px)`;
        });
        if (blur <= 3) {
            headerMain.style.visibility = 'hidden';
        } else {
            headerMain.style.visibility = 'visible';
        }
    }
});

// Add hover effect to show images when hovering over project names
const projectNames = document.querySelectorAll('.__header_projectNameNest');
projectNames.forEach(name => {
    name.addEventListener('mouseenter', () => {
        const parent = name.closest('.columnArrangement');
        const img = parent.querySelector('.__header_imagePosition');
        if (img) {
            img.classList.add('__header_imageActive');
        }
    });
    name.addEventListener('mouseleave', () => {
        const parent = name.closest('.columnArrangement');
        const img = parent.querySelector('.__header_imagePosition');
        if (img) {
            img.classList.remove('__header_imageActive');
        }
    });
});
const allHeaderTexts = Array.from(document.querySelectorAll('.__header_textDefinition'));
const menuItems = allHeaderTexts.slice(0, 3); // First three are the menu items



// Add menu functionality for navigation
menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const projectsGrid = document.getElementById('projects-grid');
        const pageProjects = document.getElementById('page-projects');
        const pageContact = document.getElementById('page-contact');
        if (index === 0) { // Klára Nováčková - show projects grid
            projectsGrid.style.display = 'grid';
            pageProjects.style.display = 'none';
            pageContact.style.display = 'none';
        } else if (index === 1) { // Projects - show projects text
            projectsGrid.style.display = 'none';
            pageProjects.style.display = 'block';
            pageContact.style.display = 'none';
        } else if (index === 2) { // contact - show contact text
            projectsGrid.style.display = 'none';
            pageProjects.style.display = 'none';
            pageContact.style.display = 'block';
        }
    });
});

/*gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector('.scroll-container');

gsap.to(container, {
    y: -(window.innerHeight * 2),
    ease: "none",
    scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=" + (window.innerHeight * 2),
        scrub: 0.6,
        pin: true,
        snap: {
            snapTo: [0, 0.5, 1],
            duration: 0.35,
            ease: "power3.out"
        }
    }
});
ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true
});
window.addEventListener('resize', () => ScrollTrigger.refresh()); */

try {
  const fullpage = new Fullpage('#fullpage', {
    sections: '.section',
    scrollingSpeed: 700,
    navigation: false,
    isScrolling: true,
    //anchors: ['lastOne', 'makulatura', 'white_puppies'],
  });
  console.log(getTotalSections(fullpage.sections.sections));
} catch (error) {
  console.error();
}


const mainMenu = document.querySelectorAll('.__header_mainMenu');

mainMenu.forEach(menuItem => {
    menuItem.addEventListener('click', () => {
        if (menuItem.classList.contains('active')) return;
        mainMenu.forEach(item => {
            item.classList.remove('active');
        });
        menuItem.classList.add('active');
    });
});

// Function to set active state based on hash
function setActiveFromHash() {
    const hash = window.location.hash;
    const companies = document.querySelectorAll('.__header_companyNameNest h1');
    const projects = document.querySelectorAll('.__header_projectNameNest h1');

    // Reset all to default (remove active)
    companies.forEach(company => company.classList.remove('active'));
    projects.forEach(project => project.classList.remove('active'));

    if (hash === '') {
        if (companies[0]) companies[0].classList.add('active');
        if (projects[0]) projects[0].classList.add('active');
    }
    else if (hash === '#page1') {
        if (companies[0]) companies[0].classList.add('active');
        if (projects[0]) projects[0].classList.add('active');
    } else if (hash === '#page2') {
        if (companies[1]) companies[1].classList.add('active');
        if (projects[1]) projects[1].classList.add('active');
    } else if (hash === '#page3') {
        if (companies[2]) companies[2].classList.add('active');
        if (projects[2]) projects[2].classList.add('active');
    }
}

// Set on load
setActiveFromHash();

// Set on hash change
window.addEventListener('hashchange', setActiveFromHash);