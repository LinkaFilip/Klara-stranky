// Navigation module for dots and indicators

export class Navigation {
  constructor(fullpageInstance) {
    this.fullpage = fullpageInstance;
    this.navContainer = null;
    this.init();
  }

  init() {
    this.createNavigation();
    this.bindEvents();
    this.updateActive();
  }

  createNavigation() {
    this.navContainer = document.createElement('div');
    this.navContainer.className = 'fp-nav';
    this.navContainer.style.position = 'fixed';
    this.navContainer.style.right = '20px';
    this.navContainer.style.top = '50%';
    this.navContainer.style.transform = 'translateY(-50%)';
    this.navContainer.style.zIndex = '1000';

    for (let i = 0; i < this.fullpage.sections.getTotalSections(); i++) {
      const dot = document.createElement('div');
      dot.className = 'fp-nav-dot';
      dot.style.width = '10px';
      dot.style.height = '10px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = '#ccc';
      dot.style.margin = '5px 0';
      dot.style.cursor = 'pointer';
      dot.dataset.index = i;
      this.navContainer.appendChild(dot);
    }

    document.body.appendChild(this.navContainer);
  }

  bindEvents() {
    this.navContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('fp-nav-dot')) {
        const index = parseInt(e.target.dataset.index);
        this.fullpage.moveTo(index);
      }
    });
  }

  updateActive() {
    const dots = this.navContainer.querySelectorAll('.fp-nav-dot');
    dots.forEach((dot, index) => {
      if (index === this.fullpage.currentSection) {
        dot.style.backgroundColor = '#333';
      } else {
        dot.style.backgroundColor = '#ccc';
      }
    });
  }

  destroy() {
    if (this.navContainer) {
      document.body.removeChild(this.navContainer);
    }
  }
}