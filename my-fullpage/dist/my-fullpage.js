/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core.js"
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fullpage: () => (/* binding */ Fullpage)
/* harmony export */ });
/* harmony import */ var _sections_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sections.js */ "./src/sections.js");
/* harmony import */ var _scrolling_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scrolling.js */ "./src/scrolling.js");
/* harmony import */ var _navigation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navigation.js */ "./src/navigation.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Main Fullpage class




var Fullpage = /*#__PURE__*/function () {
  function Fullpage(container) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Fullpage);
    this.container = typeof container === "string" ? document.querySelector(container) : container;
    //console.log("Container:", this.container);
    if (!this.container) {
      throw new Error("Container not found");
    }
    this.options = _objectSpread({
      sections: ".section",
      scrollingSpeed: 700,
      navigation: true,
      anchors: [],
      onLeave: null,
      afterLoad: null
    }, options);
    this.sections = null;
    this.scrolling = null;
    this.navigation = null;
    this.currentSection = 0;
    this.isScrolling = false;
    this.init();
  }
  return _createClass(Fullpage, [{
    key: "init",
    value: function init() {
      var _this = this;
      // Prevent window scrolling
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      // Handle initial hash
      // Set container styles
      this.container.style.overflow = "hidden";
      this.container.style.height = "100vh";

      // Initialize modules
      this.sections = new _sections_js__WEBPACK_IMPORTED_MODULE_0__.Sections(this.container, this.options.sections);

      // Set section ids for anchors
      this.sections.sections.forEach(function (section, index) {
        if (_this.options.anchors && _this.options.anchors[index]) {
          section.id = _this.options.anchors[index];
        }
      });
      this.scrolling = new _scrolling_js__WEBPACK_IMPORTED_MODULE_1__.Scrolling(this);
      if (this.options.navigation) {
        this.navigation = new _navigation_js__WEBPACK_IMPORTED_MODULE_2__.Navigation(this);
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
  }, {
    key: "moveTo",
    value: function moveTo(index) {
      var _this2 = this;
      if (!this.sections) return;
      var total = this.sections.getTotalSections();
      if (index < 0 || index >= total) return;
      if (this.isScrolling || index === this.currentSection) return;
      if (index < 0 || index >= this.sections.getTotalSections() || this.isScrolling || index === this.currentSection) return;
      var targetY = index * window.innerHeight;

      // Call onLeave
      if (this.options.onLeave) {
        var _direction = index > this.currentSection ? "down" : "up";
        this.options.onLeave(this.currentSection, index, _direction);
      }
      this.isScrolling = true;
      this.scrolling.smoothScrollTo(targetY);
      var origin = this.currentSection;
      var destination = index;
      var direction = destination > origin ? "down" : "up";
      setTimeout(function () {
        _this2.currentSection = index;
        _this2.isScrolling = false;

        // Update hash
        _this2.updateHash(index);

        // Update navigation
        if (_this2.navigation) {
          _this2.navigation.updateActive();
        }

        // Call afterLoad
        if (_this2.options.afterLoad) {
          _this2.options.afterLoad(origin, destination, direction);
        }
      }, this.options.scrollingSpeed);
    }
  }, {
    key: "moveSectionUp",
    value: function moveSectionUp() {
      this.moveTo(this.currentSection - 1);
    }
  }, {
    key: "moveSectionDown",
    value: function moveSectionDown() {
      this.moveTo(this.currentSection + 1);
    }
  }, {
    key: "setAllowScrolling",
    value: function setAllowScrolling(allow) {
      this.scrolling.setAllowScrolling(allow);
    }
  }, {
    key: "destroy",
    value: function destroy() {
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
  }, {
    key: "handleHashOnLoad",
    value: function handleHashOnLoad() {
      if (this.isScrolling) return;
      var hash = window.location.hash.substring(1);
      if (!hash) return;
      var index = this.options.anchors.indexOf(hash);
      if (index === -1) return;
      this.moveTo(index);
    }
  }, {
    key: "updateHash",
    value: function updateHash(index) {
      if (this.options.anchors && this.options.anchors[index]) {
        window.location.hash = this.options.anchors[index];
      }
    }
  }, {
    key: "bindHashChange",
    value: function bindHashChange() {
      var _this3 = this;
      window.addEventListener("hashchange", function () {
        _this3.handleHashOnLoad();
      });
    }
  }]);
}();

/***/ },

/***/ "./src/navigation.js"
/*!***************************!*\
  !*** ./src/navigation.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Navigation: () => (/* binding */ Navigation)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Navigation module for dots and indicators

var Navigation = /*#__PURE__*/function () {
  function Navigation(fullpageInstance) {
    _classCallCheck(this, Navigation);
    this.fullpage = fullpageInstance;
    this.navContainer = null;
    this.init();
  }
  return _createClass(Navigation, [{
    key: "init",
    value: function init() {
      this.createNavigation();
      this.bindEvents();
      this.updateActive();
    }
  }, {
    key: "createNavigation",
    value: function createNavigation() {
      this.navContainer = document.createElement('div');
      this.navContainer.className = 'fp-nav';
      this.navContainer.style.position = 'fixed';
      this.navContainer.style.right = '20px';
      this.navContainer.style.top = '50%';
      this.navContainer.style.transform = 'translateY(-50%)';
      this.navContainer.style.zIndex = '1000';
      for (var i = 0; i < this.fullpage.sections.getTotalSections(); i++) {
        var dot = document.createElement('div');
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
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;
      this.navContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('fp-nav-dot')) {
          var index = parseInt(e.target.dataset.index);
          _this.fullpage.moveTo(index);
        }
      });
    }
  }, {
    key: "updateActive",
    value: function updateActive() {
      var _this2 = this;
      var dots = this.navContainer.querySelectorAll('.fp-nav-dot');
      dots.forEach(function (dot, index) {
        if (index === _this2.fullpage.currentSection) {
          dot.style.backgroundColor = '#333';
        } else {
          dot.style.backgroundColor = '#ccc';
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.navContainer) {
        document.body.removeChild(this.navContainer);
      }
    }
  }]);
}();

/***/ },

/***/ "./src/scrolling.js"
/*!**************************!*\
  !*** ./src/scrolling.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Scrolling: () => (/* binding */ Scrolling)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Scrolling management module


var Scrolling = /*#__PURE__*/function () {
  function Scrolling(fullpageInstance) {
    _classCallCheck(this, Scrolling);
    this.fullpage = fullpageInstance;
    this.isScrolling = false;
    this.allowScrolling = true;
    this.init();
  }
  return _createClass(Scrolling, [{
    key: "init",
    value: function init() {
      this.bindEvents();
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      // Wheel event
      this.fullpage.container.addEventListener('wheel', (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.throttle)(this.handleWheel.bind(this), 100), {
        passive: false
      });

      // Keyboard events
      document.addEventListener('keydown', this.handleKeydown.bind(this));

      // Touch events
      this.fullpage.container.addEventListener('touchstart', this.handleTouchStart.bind(this), {
        passive: false
      });
      this.fullpage.container.addEventListener('touchmove', this.handleTouchMove.bind(this), {
        passive: false
      });
      this.fullpage.container.addEventListener('touchend', this.handleTouchEnd.bind(this), {
        passive: false
      });
    }
  }, {
    key: "handleWheel",
    value: function handleWheel(e) {
      if (!this.allowScrolling || this.isScrolling) return;
      e.preventDefault();
      var direction = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getScrollDirection)(e);
      if (direction === 'down') {
        this.fullpage.moveSectionDown();
      } else if (direction === 'up') {
        this.fullpage.moveSectionUp();
      }
    }
  }, {
    key: "handleKeydown",
    value: function handleKeydown(e) {
      if (!this.allowScrolling || this.isScrolling) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        this.fullpage.moveSectionDown();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        this.fullpage.moveSectionUp();
      }
    }
  }, {
    key: "handleTouchStart",
    value: function handleTouchStart(e) {
      this.touchStartY = e.touches[0].clientY;
    }
  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(e) {
      if (!this.allowScrolling || this.isScrolling) return;
      e.preventDefault();
      var touchCurrentY = e.touches[0].clientY;
      var diff = this.touchStartY - touchCurrentY;
      if (Math.abs(diff) > 50) {
        // threshold
        if (diff > 0) {
          this.fullpage.moveSectionDown();
        } else {
          this.fullpage.moveSectionUp();
        }
        this.touchStartY = touchCurrentY;
      }
    }
  }, {
    key: "handleTouchEnd",
    value: function handleTouchEnd(e) {
      // Reset if needed
    }
  }, {
    key: "smoothScrollTo",
    value: function smoothScrollTo(targetY) {
      var _this = this;
      if (this.isScrolling) return;
      this.isScrolling = true;
      var currentTransform = this.fullpage.container.style.transform || 'translateY(0px)';
      var startY = parseFloat(currentTransform.match(/translateY\(([^)]+)\)/)[1]);
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.animate)(startY, -targetY, this.fullpage.options.scrollingSpeed, function (currentY) {
        _this.fullpage.container.style.transform = "translateY(".concat(currentY, "px)");
      });
      setTimeout(function () {
        _this.isScrolling = false;
      }, this.fullpage.options.scrollingSpeed);
    }
  }, {
    key: "setAllowScrolling",
    value: function setAllowScrolling(allow) {
      this.allowScrolling = allow;
    }
  }]);
}();

/***/ },

/***/ "./src/sections.js"
/*!*************************!*\
  !*** ./src/sections.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sections: () => (/* binding */ Sections),
/* harmony export */   getTotalSections: () => (/* binding */ getTotalSections)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Sections management module

var Sections = /*#__PURE__*/function () {
  function Sections(container, selector) {
    _classCallCheck(this, Sections);
    this.container = container;
    this.selector = selector;
    this.sections = [];
    this.init();
    this.getTotalSections();
  }
  return _createClass(Sections, [{
    key: "init",
    value: function init() {
      this.findSections();
      //console.log('Sections found:', this.sections.length);
      this.setSectionHeights();
      this.positionSections();
    }
  }, {
    key: "findSections",
    value: function findSections() {
      var queryResult = this.container.querySelectorAll(this.selector);
      //console.log('Query result:', queryResult);
      this.sections = Array.from(queryResult);
    }
  }, {
    key: "setSectionHeights",
    value: function setSectionHeights() {
      this.sections.forEach(function (section) {
        section.style.height = '100vh';
        section.style.overflow = 'hidden';
      });
    }
  }, {
    key: "positionSections",
    value: function positionSections() {
      this.container.style.position = 'relative';
      this.sections.forEach(function (section, index) {
        section.style.height = '100vh';
        section.style.width = '100%';
      });
    }
  }, {
    key: "getSection",
    value: function getSection(index) {
      return this.sections[index];
    }
  }, {
    key: "getSectionIndex",
    value: function getSectionIndex(section) {
      return this.sections.indexOf(section);
    }
  }, {
    key: "getTotalSections",
    value: function getTotalSections() {
      return this.sections.length;
    }
  }, {
    key: "updateSections",
    value: function updateSections() {
      this.init();
    }
  }]);
}();
var getTotalSections = function getTotalSections(sectionsArray) {
  return sectionsArray.length;
};

/***/ },

/***/ "./src/utils.js"
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animate: () => (/* binding */ animate),
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   easeInOutQuad: () => (/* binding */ easeInOutQuad),
/* harmony export */   getScrollDirection: () => (/* binding */ getScrollDirection),
/* harmony export */   isMobile: () => (/* binding */ isMobile),
/* harmony export */   throttle: () => (/* binding */ throttle)
/* harmony export */ });
// Utility functions for the fullpage library

var debounce = function debounce(func, wait) {
  var timeout;
  return function executedFunction() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var later = function later() {
      clearTimeout(timeout);
      func.apply(void 0, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
var throttle = function throttle(func, limit) {
  var inThrottle;
  return function () {
    var args = arguments;
    var context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function () {
        return inThrottle = false;
      }, limit);
    }
  };
};
var isMobile = function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
var getScrollDirection = function getScrollDirection(e) {
  if (e.deltaY > 0) return 'down';
  if (e.deltaY < 0) return 'up';
  return null;
};
var easeInOutQuad = function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
var animate = function animate(start, end, duration, callback) {
  var startTime = performance.now();
  var _animateFrame = function animateFrame(currentTime) {
    var elapsed = currentTime - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var easedProgress = easeInOutQuad(progress);
    var currentValue = start + (end - start) * easedProgress;
    callback(currentValue);
    if (progress < 1) {
      requestAnimationFrame(_animateFrame);
    }
  };
  requestAnimationFrame(_animateFrame);
};

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ "./src/core.js");
// Main entry point for the fullpage library


window.Fullpage = _core_js__WEBPACK_IMPORTED_MODULE_0__.Fullpage;
})();

/******/ })()
;
//# sourceMappingURL=my-fullpage.js.map