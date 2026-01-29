(() => {
  "use strict";
  function t(n) {
    return (
      (t =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      t(n)
    );
  }
  function n(t, n) {
    for (var o = 0; o < n.length; o++) {
      var i = n[o];
      ((i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(t, e(i.key), i));
    }
  }
  function e(n) {
    var e = (function (n) {
      if ("object" != t(n) || !n) return n;
      var e = n[Symbol.toPrimitive];
      if (void 0 !== e) {
        var o = e.call(n, "string");
        if ("object" != t(o)) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(n);
    })(n);
    return "symbol" == t(e) ? e : e + "";
  }
  var o = (function () {
    return (
      (t = function t(n, e) {
        (!(function (t, n) {
          if (!(t instanceof n))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.container = n),
          (this.selector = e),
          (this.sections = []),
          this.init(),
          this.getTotalSections());
      }),
      (e = [
        {
          key: "init",
          value: function () {
            (this.findSections(),
              this.setSectionHeights(),
              this.positionSections());
          },
        },
        {
          key: "findSections",
          value: function () {
            var t = this.container.querySelectorAll(this.selector);
            (this.sections = Array.from(t));
          },
        },
        {
          key: "setSectionHeights",
          value: function () {
            this.sections.forEach(function (t) {
              ((t.style.height = "100vh"), (t.style.overflow = "hidden"));
            });
          },
        },
        {
          key: "positionSections",
          value: function () {
            ((this.container.style.position = "relative"),
              this.sections.forEach(function (t, n) {
                ((t.style.height = "100vh"), (t.style.width = "100%"));
              }));
          },
        },
        {
          key: "getSection",
          value: function (t) {
            return this.sections[t];
          },
        },
        {
          key: "getSectionIndex",
          value: function (t) {
            return this.sections.indexOf(t);
          },
        },
        {
          key: "getTotalSections",
          value: function () {
            return this.sections.length;
          },
        },
        {
          key: "updateSections",
          value: function () {
            this.init();
          },
        },
      ]) && n(t.prototype, e),
      Object.defineProperty(t, "prototype", { writable: !1 }),
      t
    );
    var t, e;
  })();
  function i(t) {
    return (
      (i =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      i(t)
    );
  }
  function r(t, n) {
    for (var e = 0; e < n.length; e++) {
      var o = n[e];
      ((o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        "value" in o && (o.writable = !0),
        Object.defineProperty(t, s(o.key), o));
    }
  }
  function s(t) {
    var n = (function (t) {
      if ("object" != i(t) || !t) return t;
      var n = t[Symbol.toPrimitive];
      if (void 0 !== n) {
        var e = n.call(t, "string");
        if ("object" != i(e)) return e;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(t);
    })(t);
    return "symbol" == i(n) ? n : n + "";
  }
  var a = (function () {
    return (
      (t = function t(n) {
        (!(function (t, n) {
          if (!(t instanceof n))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.fullpage = n),
          (this.isScrolling = !1),
          (this.allowScrolling = !0),
          this.init());
      }),
      (n = [
        {
          key: "init",
          value: function () {
            this.bindEvents();
          },
        },
        {
          key: "bindEvents",
          value: function () {
            var t, n;
            (this.fullpage.container.addEventListener(
              "wheel",
              ((t = this.handleWheel.bind(this)),
              function () {
                var e = arguments;
                n ||
                  (t.apply(this, e),
                  (n = !0),
                  setTimeout(function () {
                    return (n = !1);
                  }, 100));
              }),
              { passive: !1 },
            ),
              document.addEventListener(
                "keydown",
                this.handleKeydown.bind(this),
              ),
              this.fullpage.container.addEventListener(
                "touchstart",
                this.handleTouchStart.bind(this),
                { passive: !1 },
              ),
              this.fullpage.container.addEventListener(
                "touchmove",
                this.handleTouchMove.bind(this),
                { passive: !1 },
              ),
              this.fullpage.container.addEventListener(
                "touchend",
                this.handleTouchEnd.bind(this),
                { passive: !1 },
              ));
          },
        },
        {
          key: "handleWheel",
          value: function (t) {
            if (this.allowScrolling && !this.isScrolling) {
              t.preventDefault();
              var n = (function (t) {
                return t.deltaY > 0 ? "down" : t.deltaY < 0 ? "up" : null;
              })(t);
              "down" === n
                ? this.fullpage.moveSectionDown()
                : "up" === n && this.fullpage.moveSectionUp();
            }
          },
        },
        {
          key: "handleKeydown",
          value: function (t) {
            this.allowScrolling &&
              !this.isScrolling &&
              ("ArrowDown" === t.key || "PageDown" === t.key
                ? (t.preventDefault(), this.fullpage.moveSectionDown())
                : ("ArrowUp" !== t.key && "PageUp" !== t.key) ||
                  (t.preventDefault(), this.fullpage.moveSectionUp()));
          },
        },
        {
          key: "handleTouchStart",
          value: function (t) {
            this.touchStartY = t.touches[0].clientY;
          },
        },
        {
          key: "handleTouchMove",
          value: function (t) {
            if (this.allowScrolling && !this.isScrolling) {
              t.preventDefault();
              var n = t.touches[0].clientY,
                e = this.touchStartY - n;
              Math.abs(e) > 50 &&
                (e > 0
                  ? this.fullpage.moveSectionDown()
                  : this.fullpage.moveSectionUp(),
                (this.touchStartY = n));
            }
          },
        },
        { key: "handleTouchEnd", value: function (t) {} },
        {
          key: "smoothScrollTo",
          value: function (t) {
            var n = this;
            if (!this.isScrolling) {
              this.isScrolling = !0;
              var e,
                o,
                i,
                r,
                s,
                a,
                l =
                  this.fullpage.container.style.transform || "translateY(0px)",
                c = parseFloat(l.match(/translateY\(([^)]+)\)/)[1]);
              ((e = c),
                (o = -t),
                (i = this.fullpage.options.scrollingSpeed),
                (r = function (t) {
                  n.fullpage.container.style.transform = "translateY(".concat(
                    t,
                    "px)",
                  );
                }),
                (s = performance.now()),
                (a = function (t) {
                  var n,
                    l = t - s,
                    c = Math.min(l / i, 1),
                    u = (n = c) < 0.5 ? 2 * n * n : (4 - 2 * n) * n - 1;
                  (r(e + (o - e) * u), c < 1 && requestAnimationFrame(a));
                }),
                requestAnimationFrame(a),
                setTimeout(function () {
                  n.isScrolling = !1;
                }, this.fullpage.options.scrollingSpeed));
            }
          },
        },
        {
          key: "setAllowScrolling",
          value: function (t) {
            this.allowScrolling = t;
          },
        },
      ]),
      n && r(t.prototype, n),
      Object.defineProperty(t, "prototype", { writable: !1 }),
      t
    );
    var t, n;
  })();
  function l(t) {
    return (
      (l =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      l(t)
    );
  }
  function c(t, n) {
    for (var e = 0; e < n.length; e++) {
      var o = n[e];
      ((o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        "value" in o && (o.writable = !0),
        Object.defineProperty(t, u(o.key), o));
    }
  }
  function u(t) {
    var n = (function (t) {
      if ("object" != l(t) || !t) return t;
      var n = t[Symbol.toPrimitive];
      if (void 0 !== n) {
        var e = n.call(t, "string");
        if ("object" != l(e)) return e;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(t);
    })(t);
    return "symbol" == l(n) ? n : n + "";
  }
  var h = (function () {
    return (
      (t = function t(n) {
        (!(function (t, n) {
          if (!(t instanceof n))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          (this.fullpage = n),
          (this.navContainer = null),
          this.init());
      }),
      (n = [
        {
          key: "init",
          value: function () {
            (this.createNavigation(), this.bindEvents(), this.updateActive());
          },
        },
        {
          key: "createNavigation",
          value: function () {
            ((this.navContainer = document.createElement("div")),
              (this.navContainer.className = "fp-nav"),
              (this.navContainer.style.position = "fixed"),
              (this.navContainer.style.right = "20px"),
              (this.navContainer.style.top = "50%"),
              (this.navContainer.style.transform = "translateY(-50%)"),
              (this.navContainer.style.zIndex = "1000"));
            for (
              var t = 0;
              t < this.fullpage.sections.getTotalSections();
              t++
            ) {
              var n = document.createElement("div");
              ((n.className = "fp-nav-dot"),
                (n.style.width = "10px"),
                (n.style.height = "10px"),
                (n.style.borderRadius = "50%"),
                (n.style.backgroundColor = "#ccc"),
                (n.style.margin = "5px 0"),
                (n.style.cursor = "pointer"),
                (n.dataset.index = t),
                this.navContainer.appendChild(n));
            }
            document.body.appendChild(this.navContainer);
          },
        },
        {
          key: "bindEvents",
          value: function () {
            var t = this;
            this.navContainer.addEventListener("click", function (n) {
              if (n.target.classList.contains("fp-nav-dot")) {
                var e = parseInt(n.target.dataset.index);
                t.fullpage.moveTo(e);
              }
            });
          },
        },
        {
          key: "updateActive",
          value: function () {
            var t = this;
            this.navContainer
              .querySelectorAll(".fp-nav-dot")
              .forEach(function (n, e) {
                e === t.fullpage.currentSection
                  ? (n.style.backgroundColor = "#333")
                  : (n.style.backgroundColor = "#ccc");
              });
          },
        },
        {
          key: "destroy",
          value: function () {
            this.navContainer && document.body.removeChild(this.navContainer);
          },
        },
      ]),
      n && c(t.prototype, n),
      Object.defineProperty(t, "prototype", { writable: !1 }),
      t
    );
    var t, n;
  })();
  function f(t) {
    return (
      (f =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      f(t)
    );
  }
  function v(t, n) {
    var e = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(t);
      (n &&
        (o = o.filter(function (n) {
          return Object.getOwnPropertyDescriptor(t, n).enumerable;
        })),
        e.push.apply(e, o));
    }
    return e;
  }
  function y(t, n, e) {
    return (
      (n = d(n)) in t
        ? Object.defineProperty(t, n, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[n] = e),
      t
    );
  }
  function p(t, n) {
    for (var e = 0; e < n.length; e++) {
      var o = n[e];
      ((o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        "value" in o && (o.writable = !0),
        Object.defineProperty(t, d(o.key), o));
    }
  }
  function d(t) {
    var n = (function (t) {
      if ("object" != f(t) || !t) return t;
      var n = t[Symbol.toPrimitive];
      if (void 0 !== n) {
        var e = n.call(t, "string");
        if ("object" != f(e)) return e;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(t);
    })(t);
    return "symbol" == f(n) ? n : n + "";
  }
  var g = (function () {
    return (
      (t = function t(n) {
        var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (
          ((function (t, n) {
            if (!(t instanceof n))
              throw new TypeError("Cannot call a class as a function");
          })(this, t),
          (this.container =
            "string" == typeof n ? document.querySelector(n) : n),
          !this.container)
        )
          throw new Error("Container not found");
        ((this.options = (function (t) {
          for (var n = 1; n < arguments.length; n++) {
            var e = null != arguments[n] ? arguments[n] : {};
            n % 2
              ? v(Object(e), !0).forEach(function (n) {
                  y(t, n, e[n]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(e),
                  )
                : v(Object(e)).forEach(function (n) {
                    Object.defineProperty(
                      t,
                      n,
                      Object.getOwnPropertyDescriptor(e, n),
                    );
                  });
          }
          return t;
        })(
          {
            sections: ".section",
            scrollingSpeed: 700,
            navigation: !0,
            anchors: [],
            onLeave: null,
            afterLoad: null,
          },
          e,
        )),
          (this.sections = null),
          (this.scrolling = null),
          (this.navigation = null),
          (this.currentSection = 0),
          (this.isScrolling = !1),
          this.init());
      }),
      (n = [
        {
          key: "init",
          value: function () {
            var t = this;
            ((document.documentElement.style.overflow = "hidden"),
              (document.body.style.overflow = "hidden"),
              this.handleHashOnLoad(),
              (this.container.style.overflow = "hidden"),
              (this.container.style.height = "100vh"),
              (this.sections = new o(this.container, this.options.sections)),
              this.sections.sections.forEach(function (n, e) {
                t.options.anchors &&
                  t.options.anchors[e] &&
                  (n.id = t.options.anchors[e]);
              }),
              (this.scrolling = new a(this)),
              this.options.navigation && (this.navigation = new h(this)),
              (this.container.style.transform = "translateY(0px)"),
              this.bindHashChange(),
              this.options.afterLoad &&
                this.options.afterLoad(null, this.currentSection, "none"));
          },
        },
        {
          key: "moveTo",
          value: function (t) {
            var n = this;
            if (
              !(
                t < 0 ||
                t >= this.sections.getTotalSections() ||
                this.isScrolling ||
                t === this.currentSection
              )
            ) {
              var e = t * window.innerHeight;
              if (this.options.onLeave) {
                var o = t > this.currentSection ? "down" : "up";
                this.options.onLeave(this.currentSection, t, o);
              }
              ((this.isScrolling = !0), this.scrolling.smoothScrollTo(e));
              var i = this.currentSection,
                r = t,
                s = r > i ? "down" : "up";
              setTimeout(function () {
                ((n.currentSection = t),
                  (n.isScrolling = !1),
                  n.updateHash(t),
                  n.navigation && n.navigation.updateActive(),
                  n.options.afterLoad && n.options.afterLoad(i, r, s));
              }, this.options.scrollingSpeed);
            }
          },
        },
        {
          key: "moveSectionUp",
          value: function () {
            this.moveTo(this.currentSection - 1);
          },
        },
        {
          key: "moveSectionDown",
          value: function () {
            this.moveTo(this.currentSection + 1);
          },
        },
        {
          key: "setAllowScrolling",
          value: function (t) {
            this.scrolling.setAllowScrolling(t);
          },
        },
        {
          key: "destroy",
          value: function () {
            (this.navigation && this.navigation.destroy(),
              (this.container.style.overflow = ""),
              (this.container.style.height = ""),
              (document.documentElement.style.overflow = ""),
              (document.body.style.overflow = ""));
          },
        },
        {
          key: "handleHashOnLoad",
          value: function () {
            var t = window.location.hash.substring(1);
            if (this.options.anchors && this.options.anchors.includes(t)) {
              var n = this.options.anchors.indexOf(t);
              this.moveTo(n);
            }
          },
        },
        {
          key: "updateHash",
          value: function (t) {
            this.options.anchors &&
              this.options.anchors[t] &&
              (window.location.hash = this.options.anchors[t]);
          },
        },
        {
          key: "bindHashChange",
          value: function () {
            var t = this;
            window.addEventListener("hashchange", function () {
              t.handleHashOnLoad();
            });
          },
        },
      ]) && p(t.prototype, n),
      Object.defineProperty(t, "prototype", { writable: !1 }),
      t
    );
    var t, n;
  })();
  window.Fullpage = g;
})();
//# sourceMappingURL=my-fullpage.js.map
