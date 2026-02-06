
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
const menuItems = allHeaderTexts.slice(0, 3);

// Define the sections in the same order as menuItems
const sections = [
  document.getElementById('projects-grid'),
  document.getElementById('page-projects'),
  document.getElementById('page-contact')
];

// Optional: specify display type per section
sections[0].dataset.display = 'grid'; // projects-grid is a grid

menuItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    sections.forEach((section, i) => {
      section.style.display = (i === index) ? (section.dataset.display || 'block') : 'none';
    });
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

// Function to set active state based on section index
function setActiveFromSection(index) {
  const companies = document.querySelectorAll('.__header_companyNameNest h1');
  const projects = document.querySelectorAll('.__header_projectNameNest h1');

  // Reset all to default
  companies.forEach(company => company.classList.remove('active'));
  projects.forEach(project => project.classList.remove('active'));

  // Activate the one at the given index (if it exists)
  if (companies[index]) companies[index].classList.add('active');
  if (projects[index]) projects[index].classList.add('active');

  return index;
}

let fullpageInstance;

try {
  fullpageInstance = new Fullpage('#fullpage', {
    sections: '.section',
    scrollingSpeed: 700,
    navigation: false,
    isScrolling: true,
    afterLoad: (origin, destination, direction) => {
      // Prevent scrolling between the two projects of Company 1 (sections 0 and 1)
      // Allow scrolling to other companies (sections 2 and 3)
      const isOriginCompany1Project = origin === 0 || origin === 1;
      const isDestinationCompany1Project = destination === 0 || destination === 1;
      
      if (isOriginCompany1Project && isDestinationCompany1Project && origin !== destination) {
        // Trying to scroll within Company 1's projects - prevent it
        fullpageInstance.moveTo(origin);
      } else {
        // Scrolling is allowed (different companies)
        setActiveFromSection(destination);
      }
    },
    onLeave: (origin, destination, direction) => {
      // Additional check to prevent scrolling between Company 1's projects
      const isOriginCompany1Project = origin === 0 || origin === 1;
      const isDestinationCompany1Project = destination === 0 || destination === 1;
      
      if (isOriginCompany1Project && isDestinationCompany1Project && origin !== destination) {
        return false; // Prevent the scroll
      }
      return true;
    },
  });

  // Initialize active state on page load
  setActiveFromSection(0);

} catch (error) {
  console.error();
}
fetch('/my-fullpage/dist/my-fullpage.js.map').then(r => r.status)

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


// Add click listeners to project and company links to move to sections
const projectLinks = document.querySelectorAll('#projects-grid a');

projectLinks.forEach((link, i) => {
  const index = Math.floor(i / 2); // 0,0,1,1,2,2

  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (fullpageInstance) {
      fullpageInstance.moveTo(index);
    }
  });
});