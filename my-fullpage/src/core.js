// Main Fullpage class

import { Sections, getTotalSections } from "./sections.js";
import { Scrolling } from "./scrolling.js";
import { Navigation } from "./navigation.js";

export class Fullpage {
  constructor(container, options = {}) {
    this.container =
      typeof container === "string"
        ? document.querySelector(container)
        : container;
    //console.log("Container:", this.container);
    if (!this.container) {
      throw new Error("Container not found");
    }

    this.options = {
      sections: ".section",
      scrollingSpeed: 700,
      navigation: true,
      anchors: [],
      onLeave: null,
      afterLoad: null,
      ...options,
    };

    this.sections = null;
    this.scrolling = null;
    this.navigation = null;
    this.currentSection = 0;
    this.isScrolling = false;

    this.init();
  }

  init() {
    // Prevent window scrolling
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Handle initial hash
    // Set container styles
    this.container.style.overflow = "hidden";
    this.container.style.height = "100vh";

    // Initialize modules
    this.sections = new Sections(this.container, this.options.sections);

    // Set section ids for anchors
    this.sections.sections.forEach((section, index) => {
      if (this.options.anchors && this.options.anchors[index]) {
        section.id = this.options.anchors[index];
      }
    });

    this.scrolling = new Scrolling(this);

    if (this.options.navigation) {
      this.navigation = new Navigation(this);
    }

    // Set initial position
    this.container.style.transform = "translateY(0px)";

    // Bind hash change
    this.handleHashOnLoad();
    this.bindHashChange();

    // Call afterLoad for initial section
    if (this.options.afterLoad) {
      this.options.afterLoad(null, this.currentSection, "none");
    }
  }

  moveTo(index) {
    if (!this.sections) return;

    const total = this.sections.getTotalSections();
    if (index < 0 || index >= total) return;
    if (this.isScrolling || index === this.currentSection) return;
    if (
      index < 0 ||
      index >= this.sections.getTotalSections() ||
      this.isScrolling ||
      index === this.currentSection
    )
      return;

    const targetY = index * window.innerHeight;

    // Call onLeave
    if (this.options.onLeave) {
      const direction = index > this.currentSection ? "down" : "up";
      this.options.onLeave(this.currentSection, index, direction);
    }

    this.isScrolling = true;
    this.scrolling.smoothScrollTo(targetY);

    const origin = this.currentSection;
    const destination = index;
    const direction = destination > origin ? "down" : "up";

    setTimeout(() => {
      this.currentSection = index;
      this.isScrolling = false;

      // Update hash
      this.updateHash(index);

      // Update navigation
      if (this.navigation) {
        this.navigation.updateActive();
      }

      // Call afterLoad
      if (this.options.afterLoad) {
        this.options.afterLoad(origin, destination, direction);
      }
    }, this.options.scrollingSpeed);
  }

  moveSectionUp() {
    this.moveTo(this.currentSection - 1);
  }

  moveSectionDown() {
    this.moveTo(this.currentSection + 1);
  }

  setAllowScrolling(allow) {
    this.scrolling.setAllowScrolling(allow);
  }

  destroy() {
    // Clean up
    if (this.navigation) {
      this.navigation.destroy();
    }
    // Remove event listeners if needed
    this.container.style.overflow = "";
    this.container.style.height = "";
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  handleHashOnLoad() {
    if (this.isScrolling) return;

    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const index = this.options.anchors.indexOf(hash);
    if (index === -1) return;

    this.moveTo(index);
  }

  updateHash(index) {
    if (this.options.anchors && this.options.anchors[index]) {
      window.location.hash = this.options.anchors[index];
    }
  }

  bindHashChange() {
    window.addEventListener("hashchange", () => {
      this.handleHashOnLoad();
    });
  }
}
