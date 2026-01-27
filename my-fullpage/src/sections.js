// Sections management module

export class Sections {
  constructor(container, selector) {
    this.container = container;
    this.selector = selector;
    this.sections = [];
    this.init();
    this.getTotalSections();
  }

  init() {
    this.findSections();
    //console.log('Sections found:', this.sections.length);
    this.setSectionHeights();
    this.positionSections();
  }

  findSections() {
    const queryResult = this.container.querySelectorAll(this.selector);
    //console.log('Query result:', queryResult);
    this.sections = Array.from(queryResult);
  }

  setSectionHeights() {
    this.sections.forEach(section => {
      section.style.height = '100vh';
      section.style.overflow = 'hidden';
    });
  }

  positionSections() {
    this.container.style.position = 'relative';
    this.sections.forEach((section, index) => {
      section.style.height = '100vh';
      section.style.width = '100%';
    });
  }

  getSection(index) {
    return this.sections[index];
  }

  getSectionIndex(section) {
    return this.sections.indexOf(section);
  }

  getTotalSections() {
    return this.sections.length;
  }

  updateSections() {
    this.init();
  }
}

export const getTotalSections = (sectionsArray) => sectionsArray.length;