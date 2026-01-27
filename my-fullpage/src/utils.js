// Utility functions for the fullpage library

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const getScrollDirection = (e) => {
  if (e.deltaY > 0) return 'down';
  if (e.deltaY < 0) return 'up';
  return null;
};

export const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export const animate = (start, end, duration, callback) => {
  const startTime = performance.now();
  const animateFrame = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutQuad(progress);
    const currentValue = start + (end - start) * easedProgress;
    callback(currentValue);
    if (progress < 1) {
      requestAnimationFrame(animateFrame);
    }
  };
  requestAnimationFrame(animateFrame);
};