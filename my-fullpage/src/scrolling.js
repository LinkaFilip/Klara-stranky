// Scrolling management module

import { throttle, getScrollDirection, animate } from './utils.js';

export class Scrolling {
  constructor(fullpageInstance) {
    this.fullpage = fullpageInstance;
    this.isScrolling = false;
    this.allowScrolling = true;
    this.init();
  }

  init() {
    this.handleWheelBound = throttle(this.handleWheel.bind(this), 100);
    this.handleKeydownBound = this.handleKeydown.bind(this);
    this.handleTouchStartBound = this.handleTouchStart.bind(this);
    this.handleTouchMoveBound = this.handleTouchMove.bind(this);
    this.handleTouchEndBound = this.handleTouchEnd.bind(this);
    this.bindEvents();
  }

  bindEvents() {
    // Wheel event
    this.fullpage.container.addEventListener('wheel', this.handleWheelBound, { passive: false });

    // Keyboard events
    document.addEventListener('keydown', this.handleKeydownBound);

    // Touch events
    this.fullpage.container.addEventListener('touchstart', this.handleTouchStartBound, { passive: false });
    this.fullpage.container.addEventListener('touchmove', this.handleTouchMoveBound, { passive: false });
    this.fullpage.container.addEventListener('touchend', this.handleTouchEndBound, { passive: false });
  }

  handleWheel(e) {
    if (!this.allowScrolling || this.isScrolling) return;

    e.preventDefault();
    const direction = getScrollDirection(e);
    if (direction === 'down') {
      this.fullpage.moveSectionDown();
    } else if (direction === 'up') {
      this.fullpage.moveSectionUp();
    }
  }

  handleKeydown(e) {
    if (!this.allowScrolling || this.isScrolling) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      this.fullpage.moveSectionDown();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      this.fullpage.moveSectionUp();
    }
  }

  handleTouchStart(e) {
    this.touchStartY = e.touches[0].clientY;
  }

  handleTouchMove(e) {
    if (!this.allowScrolling || this.isScrolling) return;

    e.preventDefault();
    const touchCurrentY = e.touches[0].clientY;
    const diff = this.touchStartY - touchCurrentY;

    if (Math.abs(diff) > 50) { // threshold
      if (diff > 0) {
        this.fullpage.moveSectionDown();
      } else {
        this.fullpage.moveSectionUp();
      }
      this.touchStartY = touchCurrentY;
    }
  }

  handleTouchEnd(e) {
    // Reset if needed
  }

  smoothScrollTo(targetY) {
    if (this.isScrolling) return;

    this.isScrolling = true;
    const currentTransform = this.fullpage.container.style.transform || 'translateY(0px)';
    const startY = parseFloat(currentTransform.match(/translateY\(([^)]+)\)/)[1]);

    animate(startY, -targetY, this.fullpage.options.scrollingSpeed, (currentY) => {
      this.fullpage.container.style.transform = `translateY(${currentY}px)`;
    });

    setTimeout(() => {
      this.isScrolling = false;
    }, this.fullpage.options.scrollingSpeed);
  }

  setAllowScrolling(allow) {
    this.allowScrolling = allow;
  }

  destroy() {
    this.fullpage.container.removeEventListener('wheel', this.handleWheelBound);
    document.removeEventListener('keydown', this.handleKeydownBound);
    this.fullpage.container.removeEventListener('touchstart', this.handleTouchStartBound);
    this.fullpage.container.removeEventListener('touchmove', this.handleTouchMoveBound);
    this.fullpage.container.removeEventListener('touchend', this.handleTouchEndBound);
  }
}
