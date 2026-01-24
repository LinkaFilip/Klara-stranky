// Create a custom cursor element
const cursor = document.createElement('span');
cursor.className = 'cursor';
document.body.appendChild(cursor);

// Get the "see more" element and the img
const seeMore = document.querySelector('.__header_subheader');
const img = document.querySelector('img.__main_mainImage_hero');
const headerMain = document.querySelector('.__header_headerMain');

// Calculate max distance (diagonal of the viewport)
const maxDistance = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);

// Update cursor position and img blur on mouse move
document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate3d(calc(-50% + ${e.clientX}px), calc(-50% + ${e.clientY}px), 0px)`;

    if (seeMore && img) {
        const rect = seeMore.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
        const blur = Math.min((distance / maxDistance) * 100, 100);
        img.style.filter = `blur(${blur}px)`;
        if (blur <= 3) {
            headerMain.style.visibility = 'hidden';
        }else {
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

// Add menu functionality for navigation
const allHeaderTexts = Array.from(document.querySelectorAll('.__header_textDefinition'));
const menuItems = allHeaderTexts.slice(0, 3); // First three are the menu items
menuItems.forEach((item, index) => {
    item.style.cursor = 'pointer';
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
