(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(root, factory) {
    "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function() {
        return root.svg4everybody = factory();
    }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
    function embed(parent, svg, target) {
        // if the target exists
        if (target) {
            // create a document fragment to hold the contents of the target
            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            // conditionally set the viewBox on the svg
            viewBox && svg.setAttribute("viewBox", viewBox);
            // copy the contents of the clone into the fragment
            for (// clone the target
            var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            // append the fragment into the svg
            parent.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
            // if the request is ready
            if (4 === xhr.readyState) {
                // get the cached html document
                var cachedDocument = xhr._cachedDocument;
                // ensure the cached html document based on the xhr response
                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                xhr._embeds.splice(0).map(function(item) {
                    // get the cached target
                    var target = xhr._cachedTarget[item.id];
                    // ensure the cached target
                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                    // embed the target into the svg
                    embed(item.parent, item.svg, target);
                });
            }
        }, // test the ready state change immediately
        xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
        function oninterval() {
            // while the index exists in the live <use> collection
            for (// get the cached <use> index
            var index = 0; index < uses.length; ) {
                // get the current <use>
                var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), 
                svg && src) {
                    if (polyfill) {
                        if (!opts.validate || opts.validate(src, svg, use)) {
                            // remove the <use> element
                            parent.removeChild(use);
                            // parse the src and get the url and id
                            var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                            // if the link is external
                            if (url.length) {
                                // get the cached xhr request
                                var xhr = requests[url];
                                // ensure the xhr request exists
                                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                                xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                xhr._embeds.push({
                                    parent: parent,
                                    svg: svg,
                                    id: id
                                }), // prepare the xhr ready state change event
                                loadreadystatechange(xhr);
                            } else {
                                // embed the local id into the svg
                                embed(parent, svg, document.getElementById(id));
                            }
                        } else {
                            // increase the index when the previous value was not "valid"
                            ++index, ++numberOfSvgUseElementsToBypass;
                        }
                    }
                } else {
                    // increase the index when the previous value was not "valid"
                    ++index;
                }
            }
            // continue the interval
            (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
        // create xhr requests object
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
        // conditionally start the interval if the polyfill is active
        polyfill && oninterval();
    }
    function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
        return svg;
    }
    return svg4everybody;
});
},{}],2:[function(require,module,exports){
'use strict';

var _svg4everybody = require('svg4everybody');

var _svg4everybody2 = _interopRequireDefault(_svg4everybody);

var _header = require('../../components/globals/header');

var _header2 = _interopRequireDefault(_header);

var _audioPlayer = require('../../components/blocks/audio-player');

var _audioPlayer2 = _interopRequireDefault(_audioPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../../components/00-mixins/modernizr/index.js');
require('../../components/services/polyfill-object-fit/index.js');

(0, _svg4everybody2.default)();
(0, _header2.default)();
(0, _audioPlayer2.default)();

},{"../../components/00-mixins/modernizr/index.js":3,"../../components/blocks/audio-player":4,"../../components/globals/header":5,"../../components/services/polyfill-object-fit/index.js":6,"svg4everybody":1}],3:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint-disable */
/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-flexbox-objectfit-setclasses !*/
!function (e, n, t) {
  function r(e, n) {
    return (typeof e === "undefined" ? "undefined" : _typeof(e)) === n;
  }function o() {
    var e, n, t, o, i, s, a;for (var l in x) {
      if (x.hasOwnProperty(l)) {
        if (e = [], n = x[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (t = 0; t < n.options.aliases.length; t++) {
          e.push(n.options.aliases[t].toLowerCase());
        }for (o = r(n.fn, "function") ? n.fn() : n.fn, i = 0; i < e.length; i++) {
          s = e[i], a = s.split("."), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), C.push((o ? "" : "no-") + a.join("-"));
        }
      }
    }
  }function i(e) {
    var n = _.className,
        t = Modernizr._config.classPrefix || "";if (w && (n = n.baseVal), Modernizr._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");n = n.replace(r, "$1" + t + "js$2");
    }Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), w ? _.className.baseVal = n : _.className = n);
  }function s(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, n, t) {
      return n + t.toUpperCase();
    }).replace(/^-/, "");
  }function a() {
    return "function" != typeof n.createElement ? n.createElement(arguments[0]) : w ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments);
  }function l(e, n) {
    return !!~("" + e).indexOf(n);
  }function f(e, n) {
    return function () {
      return e.apply(n, arguments);
    };
  }function u(e, n, t) {
    var o;for (var i in e) {
      if (e[i] in n) return t === !1 ? e[i] : (o = n[e[i]], r(o, "function") ? f(o, t || n) : o);
    }return !1;
  }function p(e) {
    return e.replace(/([A-Z])/g, function (e, n) {
      return "-" + n.toLowerCase();
    }).replace(/^ms-/, "-ms-");
  }function c(n, t, r) {
    var o;if ("getComputedStyle" in e) {
      o = getComputedStyle.call(e, n, t);var i = e.console;if (null !== o) r && (o = o.getPropertyValue(r));else if (i) {
        var s = i.error ? "error" : "log";i[s].call(i, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
      }
    } else o = !t && n.currentStyle && n.currentStyle[r];return o;
  }function d() {
    var e = n.body;return e || (e = a(w ? "svg" : "body"), e.fake = !0), e;
  }function m(e, t, r, o) {
    var i,
        s,
        l,
        f,
        u = "modernizr",
        p = a("div"),
        c = d();if (parseInt(r, 10)) for (; r--;) {
      l = a("div"), l.id = o ? o[r] : u + (r + 1), p.appendChild(l);
    }return i = a("style"), i.type = "text/css", i.id = "s" + u, (c.fake ? c : p).appendChild(i), c.appendChild(p), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(n.createTextNode(e)), p.id = u, c.fake && (c.style.background = "", c.style.overflow = "hidden", f = _.style.overflow, _.style.overflow = "hidden", _.appendChild(c)), s = t(p, e), c.fake ? (c.parentNode.removeChild(c), _.style.overflow = f, _.offsetHeight) : p.parentNode.removeChild(p), !!s;
  }function v(n, r) {
    var o = n.length;if ("CSS" in e && "supports" in e.CSS) {
      for (; o--;) {
        if (e.CSS.supports(p(n[o]), r)) return !0;
      }return !1;
    }if ("CSSSupportsRule" in e) {
      for (var i = []; o--;) {
        i.push("(" + p(n[o]) + ":" + r + ")");
      }return i = i.join(" or "), m("@supports (" + i + ") { #modernizr { position: absolute; } }", function (e) {
        return "absolute" == c(e, null, "position");
      });
    }return t;
  }function y(e, n, o, i) {
    function f() {
      p && (delete N.style, delete N.modElem);
    }if (i = r(i, "undefined") ? !1 : i, !r(o, "undefined")) {
      var u = v(e, o);if (!r(u, "undefined")) return u;
    }for (var p, c, d, m, y, g = ["modernizr", "tspan", "samp"]; !N.style && g.length;) {
      p = !0, N.modElem = a(g.shift()), N.style = N.modElem.style;
    }for (d = e.length, c = 0; d > c; c++) {
      if (m = e[c], y = N.style[m], l(m, "-") && (m = s(m)), N.style[m] !== t) {
        if (i || r(o, "undefined")) return f(), "pfx" == n ? m : !0;try {
          N.style[m] = o;
        } catch (h) {}if (N.style[m] != y) return f(), "pfx" == n ? m : !0;
      }
    }return f(), !1;
  }function g(e, n, t, o, i) {
    var s = e.charAt(0).toUpperCase() + e.slice(1),
        a = (e + " " + E.join(s + " ") + s).split(" ");return r(n, "string") || r(n, "undefined") ? y(a, n, o, i) : (a = (e + " " + j.join(s + " ") + s).split(" "), u(a, n, t));
  }function h(e, n, r) {
    return g(e, t, t, n, r);
  }var C = [],
      x = [],
      S = { _version: "3.5.0", _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 }, _q: [], on: function on(e, n) {
      var t = this;setTimeout(function () {
        n(t[e]);
      }, 0);
    }, addTest: function addTest(e, n, t) {
      x.push({ name: e, fn: n, options: t });
    }, addAsyncTest: function addAsyncTest(e) {
      x.push({ name: null, fn: e });
    } },
      Modernizr = function Modernizr() {};Modernizr.prototype = S, Modernizr = new Modernizr();var _ = n.documentElement,
      w = "svg" === _.nodeName.toLowerCase(),
      b = "Moz O ms Webkit",
      E = S._config.usePrefixes ? b.split(" ") : [];S._cssomPrefixes = E;var P = function P(n) {
    var r,
        o = prefixes.length,
        i = e.CSSRule;if ("undefined" == typeof i) return t;if (!n) return !1;if (n = n.replace(/^@/, ""), r = n.replace(/-/g, "_").toUpperCase() + "_RULE", r in i) return "@" + n;for (var s = 0; o > s; s++) {
      var a = prefixes[s],
          l = a.toUpperCase() + "_" + r;if (l in i) return "@-" + a.toLowerCase() + "-" + n;
    }return !1;
  };S.atRule = P;var j = S._config.usePrefixes ? b.toLowerCase().split(" ") : [];S._domPrefixes = j;var z = { elem: a("modernizr") };Modernizr._q.push(function () {
    delete z.elem;
  });var N = { style: z.elem.style };Modernizr._q.unshift(function () {
    delete N.style;
  }), S.testAllProps = g, S.testAllProps = h, Modernizr.addTest("flexbox", h("flexBasis", "1px", !0));var T = S.prefixed = function (e, n, t) {
    return 0 === e.indexOf("@") ? P(e) : (-1 != e.indexOf("-") && (e = s(e)), n ? g(e, n, t) : g(e, "pfx"));
  };Modernizr.addTest("objectfit", !!T("objectFit"), { aliases: ["object-fit"] }), o(), i(C), delete S.addTest, delete S.addAsyncTest;for (var L = 0; L < Modernizr._q.length; L++) {
    Modernizr._q[L]();
  }e.Modernizr = Modernizr;
}(window, document);

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var audioPlayers = document.querySelectorAll('.js-audio-player');

  if (audioPlayers === []) {
    return;
  }

  Array.prototype.forEach.call(audioPlayers, function (el) {
    var noise = el.querySelector('audio');
    var seeker = el.querySelector('.js-audio-player--progress');
    var btnPlayPause = el.querySelector('button');
    var totalPlayed = el.querySelector('.js-audio-player--played');
    var totalLength = el.querySelector('.js-audio-player--length');
    var playLink = document.querySelector('.js-audio-start-link');

    if (playLink) {
      playLink.addEventListener('click', function (ev) {
        ev.preventDefault();
        if (document.createEvent) {
          var evt = document.createEvent('MouseEvents');
          evt.initEvent('click', true, false);
          btnPlayPause.dispatchEvent(evt);
        } else if (document.createEventObject) {
          btnPlayPause.fireEvent('onclick');
        }
      });
    }

    btnPlayPause.addEventListener('click', function (ev) {
      ev.preventDefault();
      var paused = noise.paused;
      pauseAll(audioPlayers);
      if (paused) {
        noise.play();
      }
    });

    noise.addEventListener('loadedmetadata', function (ev) {
      totalLength.innerText = secondsToTimeString(parseInt(ev.target.duration, 10));
      seeker.setAttribute('max', noise.duration);
    });

    noise.addEventListener('play', function (ev) {
      // btnPlayPause.innerText = "Pause"; // Set up aria tags here instead
      ev.target.parentElement.classList.add('is-playing');
    });

    noise.addEventListener('ended', function (ev) {
      // btnPlayPause.innerText = "Play";
      ev.target.parentElement.classList.remove('is-playing');
    });

    noise.addEventListener('pause', function (ev) {
      // btnPlayPause.innerText = "Play";
      ev.target.parentElement.classList.remove('is-playing');
    });

    noise.addEventListener('timeupdate', function (ev) {
      totalPlayed.innerText = secondsToTimeString(parseInt(ev.target.currentTime, 10));
      seeker.value = ev.target.currentTime;
    });

    seeker.addEventListener('change', function (ev) {
      noise.currentTime = ev.target.value;
      noise.play();
    });
  });
};

function pauseAll(els) {
  Array.prototype.forEach.call(els, function (el) {
    el.querySelector('audio').pause();
  });
}

function secondsToTimeString(t) {
  var m = Math.floor(t / 60, 10);
  var s = t - m * 60;
  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var navButton = document.querySelector('.js-navToggle');
  var bod = document.querySelector('body');

  if (!navButton) {
    return;
  }

  navButton.addEventListener('click', function (ev) {
    ev.preventDefault();
    bod.classList.toggle('nav-open');
  });
};

},{}],6:[function(require,module,exports){
'use strict';

function polyfillObjectFit() {
  var objectFitContainer = document.querySelectorAll('.js-object-fit-container');
  [].forEach.call(objectFitContainer, function (els) {
    if (els.getElementsByTagName('img')[0]) {
      var imgUrl = els.getElementsByTagName('img')[0].src;
      if (imgUrl) {
        els.classList.add('js-object-fit-container--fallback');
        els.style.backgroundImage = 'url(\'' + imgUrl + '\')';
      }
    }
  });
}

if (typeof Modernizr !== 'undefined') {
  Modernizr.on('objectfit', function (r) {
    if (!r) polyfillObjectFit();
  });
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvc3ZnNGV2ZXJ5Ym9keS9kaXN0L3N2ZzRldmVyeWJvZHkuanMiLCJzcmMvYXNzZXRzL3NjcmlwdHMvYXBwbGljYXRpb24uanMiLCJzcmMvY29tcG9uZW50cy8wMC1taXhpbnMvbW9kZXJuaXpyL2luZGV4LmpzIiwic3JjL2NvbXBvbmVudHMvYmxvY2tzL2F1ZGlvLXBsYXllci9pbmRleC5qcyIsInNyYy9jb21wb25lbnRzL2dsb2JhbHMvaGVhZGVyL2luZGV4LmpzIiwic3JjL2NvbXBvbmVudHMvc2VydmljZXMvcG9seWZpbGwtb2JqZWN0LWZpdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7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QW1CLENBQXhEO0FBQ0Q7Ozs7Ozs7OztrQkMzRWMsWUFBWTtBQUN6QixNQUFNLFlBQVksU0FBUyxhQUFULENBQXVCLGVBQXZCLENBQWxCO0FBQ0EsTUFBTSxNQUFNLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFaOztBQUVBLE1BQUksQ0FBQyxTQUFMLEVBQWdCO0FBQUU7QUFBUzs7QUFFM0IsWUFBVSxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxVQUFDLEVBQUQsRUFBUTtBQUMxQyxPQUFHLGNBQUg7QUFDQSxRQUFJLFNBQUosQ0FBYyxNQUFkLENBQXFCLFVBQXJCO0FBQ0QsR0FIRDtBQUlELEM7Ozs7O0FDVkQsU0FBUyxpQkFBVCxHQUE4QjtBQUM1QixNQUFNLHFCQUFxQixTQUFTLGdCQUFULENBQTBCLDBCQUExQixDQUEzQjtBQUNBLEtBQUcsT0FBSCxDQUFXLElBQVgsQ0FBZ0Isa0JBQWhCLEVBQW9DLFVBQUMsR0FBRCxFQUFTO0FBQzNDLFFBQUksSUFBSSxvQkFBSixDQUF5QixLQUF6QixFQUFnQyxDQUFoQyxDQUFKLEVBQXdDO0FBQ3RDLFVBQU0sU0FBUyxJQUFJLG9CQUFKLENBQXlCLEtBQXpCLEVBQWdDLENBQWhDLEVBQW1DLEdBQWxEO0FBQ0EsVUFBSSxNQUFKLEVBQVk7QUFDVixZQUFJLFNBQUosQ0FBYyxHQUFkLENBQWtCLG1DQUFsQjtBQUNBLFlBQUksS0FBSixDQUFVLGVBQVYsY0FBb0MsTUFBcEM7QUFDRDtBQUNGO0FBQ0YsR0FSRDtBQVNEOztBQUVELElBQUksT0FBTyxTQUFQLEtBQXFCLFdBQXpCLEVBQXNDO0FBQ3BDLFlBQVUsRUFBVixDQUFhLFdBQWIsRUFBMEIsVUFBQyxDQUFELEVBQU87QUFDL0IsUUFBSSxDQUFDLENBQUwsRUFBUTtBQUNULEdBRkQ7QUFHRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIhZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgZGVmaW5lICYmIGRlZmluZS5hbWQgPyAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUgdW5sZXNzIGFtZE1vZHVsZUlkIGlzIHNldFxuICAgIGRlZmluZShbXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiByb290LnN2ZzRldmVyeWJvZHkgPSBmYWN0b3J5KCk7XG4gICAgfSkgOiBcIm9iamVjdFwiID09IHR5cGVvZiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMgPyAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAvLyBsaWtlIE5vZGUuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOiByb290LnN2ZzRldmVyeWJvZHkgPSBmYWN0b3J5KCk7XG59KHRoaXMsIGZ1bmN0aW9uKCkge1xuICAgIC8qISBzdmc0ZXZlcnlib2R5IHYyLjEuOSB8IGdpdGh1Yi5jb20vam9uYXRoYW50bmVhbC9zdmc0ZXZlcnlib2R5ICovXG4gICAgZnVuY3Rpb24gZW1iZWQocGFyZW50LCBzdmcsIHRhcmdldCkge1xuICAgICAgICAvLyBpZiB0aGUgdGFyZ2V0IGV4aXN0c1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudCB0byBob2xkIHRoZSBjb250ZW50cyBvZiB0aGUgdGFyZ2V0XG4gICAgICAgICAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksIHZpZXdCb3ggPSAhc3ZnLmhhc0F0dHJpYnV0ZShcInZpZXdCb3hcIikgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShcInZpZXdCb3hcIik7XG4gICAgICAgICAgICAvLyBjb25kaXRpb25hbGx5IHNldCB0aGUgdmlld0JveCBvbiB0aGUgc3ZnXG4gICAgICAgICAgICB2aWV3Qm94ICYmIHN2Zy5zZXRBdHRyaWJ1dGUoXCJ2aWV3Qm94XCIsIHZpZXdCb3gpO1xuICAgICAgICAgICAgLy8gY29weSB0aGUgY29udGVudHMgb2YgdGhlIGNsb25lIGludG8gdGhlIGZyYWdtZW50XG4gICAgICAgICAgICBmb3IgKC8vIGNsb25lIHRoZSB0YXJnZXRcbiAgICAgICAgICAgIHZhciBjbG9uZSA9IHRhcmdldC5jbG9uZU5vZGUoITApOyBjbG9uZS5jaGlsZE5vZGVzLmxlbmd0aDsgKSB7XG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2xvbmUuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhcHBlbmQgdGhlIGZyYWdtZW50IGludG8gdGhlIHN2Z1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBsb2FkcmVhZHlzdGF0ZWNoYW5nZSh4aHIpIHtcbiAgICAgICAgLy8gbGlzdGVuIHRvIGNoYW5nZXMgaW4gdGhlIHJlcXVlc3RcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gaWYgdGhlIHJlcXVlc3QgaXMgcmVhZHlcbiAgICAgICAgICAgIGlmICg0ID09PSB4aHIucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2FjaGVkIGh0bWwgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICB2YXIgY2FjaGVkRG9jdW1lbnQgPSB4aHIuX2NhY2hlZERvY3VtZW50O1xuICAgICAgICAgICAgICAgIC8vIGVuc3VyZSB0aGUgY2FjaGVkIGh0bWwgZG9jdW1lbnQgYmFzZWQgb24gdGhlIHhociByZXNwb25zZVxuICAgICAgICAgICAgICAgIGNhY2hlZERvY3VtZW50IHx8IChjYWNoZWREb2N1bWVudCA9IHhoci5fY2FjaGVkRG9jdW1lbnQgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoXCJcIiksIFxuICAgICAgICAgICAgICAgIGNhY2hlZERvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0geGhyLnJlc3BvbnNlVGV4dCwgeGhyLl9jYWNoZWRUYXJnZXQgPSB7fSksIC8vIGNsZWFyIHRoZSB4aHIgZW1iZWRzIGxpc3QgYW5kIGVtYmVkIGVhY2ggaXRlbVxuICAgICAgICAgICAgICAgIHhoci5fZW1iZWRzLnNwbGljZSgwKS5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGNhY2hlZCB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHhoci5fY2FjaGVkVGFyZ2V0W2l0ZW0uaWRdO1xuICAgICAgICAgICAgICAgICAgICAvLyBlbnN1cmUgdGhlIGNhY2hlZCB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0IHx8ICh0YXJnZXQgPSB4aHIuX2NhY2hlZFRhcmdldFtpdGVtLmlkXSA9IGNhY2hlZERvY3VtZW50LmdldEVsZW1lbnRCeUlkKGl0ZW0uaWQpKSwgXG4gICAgICAgICAgICAgICAgICAgIC8vIGVtYmVkIHRoZSB0YXJnZXQgaW50byB0aGUgc3ZnXG4gICAgICAgICAgICAgICAgICAgIGVtYmVkKGl0ZW0ucGFyZW50LCBpdGVtLnN2ZywgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgLy8gdGVzdCB0aGUgcmVhZHkgc3RhdGUgY2hhbmdlIGltbWVkaWF0ZWx5XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3ZnNGV2ZXJ5Ym9keShyYXdvcHRzKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uaW50ZXJ2YWwoKSB7XG4gICAgICAgICAgICAvLyB3aGlsZSB0aGUgaW5kZXggZXhpc3RzIGluIHRoZSBsaXZlIDx1c2U+IGNvbGxlY3Rpb25cbiAgICAgICAgICAgIGZvciAoLy8gZ2V0IHRoZSBjYWNoZWQgPHVzZT4gaW5kZXhcbiAgICAgICAgICAgIHZhciBpbmRleCA9IDA7IGluZGV4IDwgdXNlcy5sZW5ndGg7ICkge1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY3VycmVudCA8dXNlPlxuICAgICAgICAgICAgICAgIHZhciB1c2UgPSB1c2VzW2luZGV4XSwgcGFyZW50ID0gdXNlLnBhcmVudE5vZGUsIHN2ZyA9IGdldFNWR0FuY2VzdG9yKHBhcmVudCksIHNyYyA9IHVzZS5nZXRBdHRyaWJ1dGUoXCJ4bGluazpocmVmXCIpIHx8IHVzZS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgICAgICAgICAgIGlmICghc3JjICYmIG9wdHMuYXR0cmlidXRlTmFtZSAmJiAoc3JjID0gdXNlLmdldEF0dHJpYnV0ZShvcHRzLmF0dHJpYnV0ZU5hbWUpKSwgXG4gICAgICAgICAgICAgICAgc3ZnICYmIHNyYykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9seWZpbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0cy52YWxpZGF0ZSB8fCBvcHRzLnZhbGlkYXRlKHNyYywgc3ZnLCB1c2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSA8dXNlPiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHVzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFyc2UgdGhlIHNyYyBhbmQgZ2V0IHRoZSB1cmwgYW5kIGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNyY1NwbGl0ID0gc3JjLnNwbGl0KFwiI1wiKSwgdXJsID0gc3JjU3BsaXQuc2hpZnQoKSwgaWQgPSBzcmNTcGxpdC5qb2luKFwiI1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbGluayBpcyBleHRlcm5hbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cmwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2FjaGVkIHhociByZXF1ZXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4aHIgPSByZXF1ZXN0c1t1cmxdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbnN1cmUgdGhlIHhociByZXF1ZXN0IGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIgfHwgKHhociA9IHJlcXVlc3RzW3VybF0gPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSwgeGhyLm9wZW4oXCJHRVRcIiwgdXJsKSwgeGhyLnNlbmQoKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci5fZW1iZWRzID0gW10pLCAvLyBhZGQgdGhlIHN2ZyBhbmQgaWQgYXMgYW4gaXRlbSB0byB0aGUgeGhyIGVtYmVkcyBsaXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci5fZW1iZWRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdmc6IHN2ZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgLy8gcHJlcGFyZSB0aGUgeGhyIHJlYWR5IHN0YXRlIGNoYW5nZSBldmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkcmVhZHlzdGF0ZWNoYW5nZSh4aHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVtYmVkIHRoZSBsb2NhbCBpZCBpbnRvIHRoZSBzdmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1iZWQocGFyZW50LCBzdmcsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbmNyZWFzZSB0aGUgaW5kZXggd2hlbiB0aGUgcHJldmlvdXMgdmFsdWUgd2FzIG5vdCBcInZhbGlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArK2luZGV4LCArK251bWJlck9mU3ZnVXNlRWxlbWVudHNUb0J5cGFzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBpbmRleCB3aGVuIHRoZSBwcmV2aW91cyB2YWx1ZSB3YXMgbm90IFwidmFsaWRcIlxuICAgICAgICAgICAgICAgICAgICArK2luZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnRpbnVlIHRoZSBpbnRlcnZhbFxuICAgICAgICAgICAgKCF1c2VzLmxlbmd0aCB8fCB1c2VzLmxlbmd0aCAtIG51bWJlck9mU3ZnVXNlRWxlbWVudHNUb0J5cGFzcyA+IDApICYmIHJlcXVlc3RBbmltYXRpb25GcmFtZShvbmludGVydmFsLCA2Nyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBvbHlmaWxsLCBvcHRzID0gT2JqZWN0KHJhd29wdHMpLCBuZXdlcklFVUEgPSAvXFxiVHJpZGVudFxcL1s1NjddXFxifFxcYk1TSUUgKD86OXwxMClcXC4wXFxiLywgd2Via2l0VUEgPSAvXFxiQXBwbGVXZWJLaXRcXC8oXFxkKylcXGIvLCBvbGRlckVkZ2VVQSA9IC9cXGJFZGdlXFwvMTJcXC4oXFxkKylcXGIvLCBlZGdlVUEgPSAvXFxiRWRnZVxcLy4oXFxkKylcXGIvLCBpbklmcmFtZSA9IHdpbmRvdy50b3AgIT09IHdpbmRvdy5zZWxmO1xuICAgICAgICBwb2x5ZmlsbCA9IFwicG9seWZpbGxcIiBpbiBvcHRzID8gb3B0cy5wb2x5ZmlsbCA6IG5ld2VySUVVQS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKG9sZGVyRWRnZVVBKSB8fCBbXSlbMV0gPCAxMDU0NyB8fCAobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCh3ZWJraXRVQSkgfHwgW10pWzFdIDwgNTM3IHx8IGVkZ2VVQS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmIGluSWZyYW1lO1xuICAgICAgICAvLyBjcmVhdGUgeGhyIHJlcXVlc3RzIG9iamVjdFxuICAgICAgICB2YXIgcmVxdWVzdHMgPSB7fSwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBzZXRUaW1lb3V0LCB1c2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ1c2VcIiksIG51bWJlck9mU3ZnVXNlRWxlbWVudHNUb0J5cGFzcyA9IDA7XG4gICAgICAgIC8vIGNvbmRpdGlvbmFsbHkgc3RhcnQgdGhlIGludGVydmFsIGlmIHRoZSBwb2x5ZmlsbCBpcyBhY3RpdmVcbiAgICAgICAgcG9seWZpbGwgJiYgb25pbnRlcnZhbCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRTVkdBbmNlc3Rvcihub2RlKSB7XG4gICAgICAgIGZvciAodmFyIHN2ZyA9IG5vZGU7IFwic3ZnXCIgIT09IHN2Zy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICYmIChzdmcgPSBzdmcucGFyZW50Tm9kZSk7ICkge31cbiAgICAgICAgcmV0dXJuIHN2ZztcbiAgICB9XG4gICAgcmV0dXJuIHN2ZzRldmVyeWJvZHk7XG59KTsiLCJpbXBvcnQgc3ZnNGV2ZXJ5Ym9keSBmcm9tICdzdmc0ZXZlcnlib2R5JztcbmltcG9ydCBuYXZUb2dnbGUgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9nbG9iYWxzL2hlYWRlcic7XG5pbXBvcnQgYXVkaW9QbGF5ZXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9ibG9ja3MvYXVkaW8tcGxheWVyJztcblxucmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy8wMC1taXhpbnMvbW9kZXJuaXpyL2luZGV4LmpzJyk7XG5yZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3NlcnZpY2VzL3BvbHlmaWxsLW9iamVjdC1maXQvaW5kZXguanMnKTtcblxuc3ZnNGV2ZXJ5Ym9keSgpO1xubmF2VG9nZ2xlKCk7XG5hdWRpb1BsYXllcigpO1xuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qISBtb2Rlcm5penIgMy41LjAgKEN1c3RvbSBCdWlsZCkgfCBNSVQgKlxuICogaHR0cHM6Ly9tb2Rlcm5penIuY29tL2Rvd25sb2FkLz8tZmxleGJveC1vYmplY3RmaXQtc2V0Y2xhc3NlcyAhKi9cbiFmdW5jdGlvbihlLG4sdCl7ZnVuY3Rpb24gcihlLG4pe3JldHVybiB0eXBlb2YgZT09PW59ZnVuY3Rpb24gbygpe3ZhciBlLG4sdCxvLGkscyxhO2Zvcih2YXIgbCBpbiB4KWlmKHguaGFzT3duUHJvcGVydHkobCkpe2lmKGU9W10sbj14W2xdLG4ubmFtZSYmKGUucHVzaChuLm5hbWUudG9Mb3dlckNhc2UoKSksbi5vcHRpb25zJiZuLm9wdGlvbnMuYWxpYXNlcyYmbi5vcHRpb25zLmFsaWFzZXMubGVuZ3RoKSlmb3IodD0wO3Q8bi5vcHRpb25zLmFsaWFzZXMubGVuZ3RoO3QrKyllLnB1c2gobi5vcHRpb25zLmFsaWFzZXNbdF0udG9Mb3dlckNhc2UoKSk7Zm9yKG89cihuLmZuLFwiZnVuY3Rpb25cIik/bi5mbigpOm4uZm4saT0wO2k8ZS5sZW5ndGg7aSsrKXM9ZVtpXSxhPXMuc3BsaXQoXCIuXCIpLDE9PT1hLmxlbmd0aD9Nb2Rlcm5penJbYVswXV09bzooIU1vZGVybml6clthWzBdXXx8TW9kZXJuaXpyW2FbMF1daW5zdGFuY2VvZiBCb29sZWFufHwoTW9kZXJuaXpyW2FbMF1dPW5ldyBCb29sZWFuKE1vZGVybml6clthWzBdXSkpLE1vZGVybml6clthWzBdXVthWzFdXT1vKSxDLnB1c2goKG8/XCJcIjpcIm5vLVwiKSthLmpvaW4oXCItXCIpKX19ZnVuY3Rpb24gaShlKXt2YXIgbj1fLmNsYXNzTmFtZSx0PU1vZGVybml6ci5fY29uZmlnLmNsYXNzUHJlZml4fHxcIlwiO2lmKHcmJihuPW4uYmFzZVZhbCksTW9kZXJuaXpyLl9jb25maWcuZW5hYmxlSlNDbGFzcyl7dmFyIHI9bmV3IFJlZ0V4cChcIihefFxcXFxzKVwiK3QrXCJuby1qcyhcXFxcc3wkKVwiKTtuPW4ucmVwbGFjZShyLFwiJDFcIit0K1wianMkMlwiKX1Nb2Rlcm5penIuX2NvbmZpZy5lbmFibGVDbGFzc2VzJiYobis9XCIgXCIrdCtlLmpvaW4oXCIgXCIrdCksdz9fLmNsYXNzTmFtZS5iYXNlVmFsPW46Xy5jbGFzc05hbWU9bil9ZnVuY3Rpb24gcyhlKXtyZXR1cm4gZS5yZXBsYWNlKC8oW2Etel0pLShbYS16XSkvZyxmdW5jdGlvbihlLG4sdCl7cmV0dXJuIG4rdC50b1VwcGVyQ2FzZSgpfSkucmVwbGFjZSgvXi0vLFwiXCIpfWZ1bmN0aW9uIGEoKXtyZXR1cm5cImZ1bmN0aW9uXCIhPXR5cGVvZiBuLmNyZWF0ZUVsZW1lbnQ/bi5jcmVhdGVFbGVtZW50KGFyZ3VtZW50c1swXSk6dz9uLmNyZWF0ZUVsZW1lbnROUy5jYWxsKG4sXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLGFyZ3VtZW50c1swXSk6bi5jcmVhdGVFbGVtZW50LmFwcGx5KG4sYXJndW1lbnRzKX1mdW5jdGlvbiBsKGUsbil7cmV0dXJuISF+KFwiXCIrZSkuaW5kZXhPZihuKX1mdW5jdGlvbiBmKGUsbil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGUuYXBwbHkobixhcmd1bWVudHMpfX1mdW5jdGlvbiB1KGUsbix0KXt2YXIgbztmb3IodmFyIGkgaW4gZSlpZihlW2ldaW4gbilyZXR1cm4gdD09PSExP2VbaV06KG89bltlW2ldXSxyKG8sXCJmdW5jdGlvblwiKT9mKG8sdHx8bik6byk7cmV0dXJuITF9ZnVuY3Rpb24gcChlKXtyZXR1cm4gZS5yZXBsYWNlKC8oW0EtWl0pL2csZnVuY3Rpb24oZSxuKXtyZXR1cm5cIi1cIituLnRvTG93ZXJDYXNlKCl9KS5yZXBsYWNlKC9ebXMtLyxcIi1tcy1cIil9ZnVuY3Rpb24gYyhuLHQscil7dmFyIG87aWYoXCJnZXRDb21wdXRlZFN0eWxlXCJpbiBlKXtvPWdldENvbXB1dGVkU3R5bGUuY2FsbChlLG4sdCk7dmFyIGk9ZS5jb25zb2xlO2lmKG51bGwhPT1vKXImJihvPW8uZ2V0UHJvcGVydHlWYWx1ZShyKSk7ZWxzZSBpZihpKXt2YXIgcz1pLmVycm9yP1wiZXJyb3JcIjpcImxvZ1wiO2lbc10uY2FsbChpLFwiZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5pbmcgbnVsbCwgaXRzIHBvc3NpYmxlIG1vZGVybml6ciB0ZXN0IHJlc3VsdHMgYXJlIGluYWNjdXJhdGVcIil9fWVsc2Ugbz0hdCYmbi5jdXJyZW50U3R5bGUmJm4uY3VycmVudFN0eWxlW3JdO3JldHVybiBvfWZ1bmN0aW9uIGQoKXt2YXIgZT1uLmJvZHk7cmV0dXJuIGV8fChlPWEodz9cInN2Z1wiOlwiYm9keVwiKSxlLmZha2U9ITApLGV9ZnVuY3Rpb24gbShlLHQscixvKXt2YXIgaSxzLGwsZix1PVwibW9kZXJuaXpyXCIscD1hKFwiZGl2XCIpLGM9ZCgpO2lmKHBhcnNlSW50KHIsMTApKWZvcig7ci0tOylsPWEoXCJkaXZcIiksbC5pZD1vP29bcl06dSsocisxKSxwLmFwcGVuZENoaWxkKGwpO3JldHVybiBpPWEoXCJzdHlsZVwiKSxpLnR5cGU9XCJ0ZXh0L2Nzc1wiLGkuaWQ9XCJzXCIrdSwoYy5mYWtlP2M6cCkuYXBwZW5kQ2hpbGQoaSksYy5hcHBlbmRDaGlsZChwKSxpLnN0eWxlU2hlZXQ/aS5zdHlsZVNoZWV0LmNzc1RleHQ9ZTppLmFwcGVuZENoaWxkKG4uY3JlYXRlVGV4dE5vZGUoZSkpLHAuaWQ9dSxjLmZha2UmJihjLnN0eWxlLmJhY2tncm91bmQ9XCJcIixjLnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIsZj1fLnN0eWxlLm92ZXJmbG93LF8uc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIixfLmFwcGVuZENoaWxkKGMpKSxzPXQocCxlKSxjLmZha2U/KGMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjKSxfLnN0eWxlLm92ZXJmbG93PWYsXy5vZmZzZXRIZWlnaHQpOnAucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwKSwhIXN9ZnVuY3Rpb24gdihuLHIpe3ZhciBvPW4ubGVuZ3RoO2lmKFwiQ1NTXCJpbiBlJiZcInN1cHBvcnRzXCJpbiBlLkNTUyl7Zm9yKDtvLS07KWlmKGUuQ1NTLnN1cHBvcnRzKHAobltvXSkscikpcmV0dXJuITA7cmV0dXJuITF9aWYoXCJDU1NTdXBwb3J0c1J1bGVcImluIGUpe2Zvcih2YXIgaT1bXTtvLS07KWkucHVzaChcIihcIitwKG5bb10pK1wiOlwiK3IrXCIpXCIpO3JldHVybiBpPWkuam9pbihcIiBvciBcIiksbShcIkBzdXBwb3J0cyAoXCIraStcIikgeyAjbW9kZXJuaXpyIHsgcG9zaXRpb246IGFic29sdXRlOyB9IH1cIixmdW5jdGlvbihlKXtyZXR1cm5cImFic29sdXRlXCI9PWMoZSxudWxsLFwicG9zaXRpb25cIil9KX1yZXR1cm4gdH1mdW5jdGlvbiB5KGUsbixvLGkpe2Z1bmN0aW9uIGYoKXtwJiYoZGVsZXRlIE4uc3R5bGUsZGVsZXRlIE4ubW9kRWxlbSl9aWYoaT1yKGksXCJ1bmRlZmluZWRcIik/ITE6aSwhcihvLFwidW5kZWZpbmVkXCIpKXt2YXIgdT12KGUsbyk7aWYoIXIodSxcInVuZGVmaW5lZFwiKSlyZXR1cm4gdX1mb3IodmFyIHAsYyxkLG0seSxnPVtcIm1vZGVybml6clwiLFwidHNwYW5cIixcInNhbXBcIl07IU4uc3R5bGUmJmcubGVuZ3RoOylwPSEwLE4ubW9kRWxlbT1hKGcuc2hpZnQoKSksTi5zdHlsZT1OLm1vZEVsZW0uc3R5bGU7Zm9yKGQ9ZS5sZW5ndGgsYz0wO2Q+YztjKyspaWYobT1lW2NdLHk9Ti5zdHlsZVttXSxsKG0sXCItXCIpJiYobT1zKG0pKSxOLnN0eWxlW21dIT09dCl7aWYoaXx8cihvLFwidW5kZWZpbmVkXCIpKXJldHVybiBmKCksXCJwZnhcIj09bj9tOiEwO3RyeXtOLnN0eWxlW21dPW99Y2F0Y2goaCl7fWlmKE4uc3R5bGVbbV0hPXkpcmV0dXJuIGYoKSxcInBmeFwiPT1uP206ITB9cmV0dXJuIGYoKSwhMX1mdW5jdGlvbiBnKGUsbix0LG8saSl7dmFyIHM9ZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKStlLnNsaWNlKDEpLGE9KGUrXCIgXCIrRS5qb2luKHMrXCIgXCIpK3MpLnNwbGl0KFwiIFwiKTtyZXR1cm4gcihuLFwic3RyaW5nXCIpfHxyKG4sXCJ1bmRlZmluZWRcIik/eShhLG4sbyxpKTooYT0oZStcIiBcIitqLmpvaW4ocytcIiBcIikrcykuc3BsaXQoXCIgXCIpLHUoYSxuLHQpKX1mdW5jdGlvbiBoKGUsbixyKXtyZXR1cm4gZyhlLHQsdCxuLHIpfXZhciBDPVtdLHg9W10sUz17X3ZlcnNpb246XCIzLjUuMFwiLF9jb25maWc6e2NsYXNzUHJlZml4OlwiXCIsZW5hYmxlQ2xhc3NlczohMCxlbmFibGVKU0NsYXNzOiEwLHVzZVByZWZpeGVzOiEwfSxfcTpbXSxvbjpmdW5jdGlvbihlLG4pe3ZhciB0PXRoaXM7c2V0VGltZW91dChmdW5jdGlvbigpe24odFtlXSl9LDApfSxhZGRUZXN0OmZ1bmN0aW9uKGUsbix0KXt4LnB1c2goe25hbWU6ZSxmbjpuLG9wdGlvbnM6dH0pfSxhZGRBc3luY1Rlc3Q6ZnVuY3Rpb24oZSl7eC5wdXNoKHtuYW1lOm51bGwsZm46ZX0pfX0sTW9kZXJuaXpyPWZ1bmN0aW9uKCl7fTtNb2Rlcm5penIucHJvdG90eXBlPVMsTW9kZXJuaXpyPW5ldyBNb2Rlcm5penI7dmFyIF89bi5kb2N1bWVudEVsZW1lbnQsdz1cInN2Z1wiPT09Xy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpLGI9XCJNb3ogTyBtcyBXZWJraXRcIixFPVMuX2NvbmZpZy51c2VQcmVmaXhlcz9iLnNwbGl0KFwiIFwiKTpbXTtTLl9jc3NvbVByZWZpeGVzPUU7dmFyIFA9ZnVuY3Rpb24obil7dmFyIHIsbz1wcmVmaXhlcy5sZW5ndGgsaT1lLkNTU1J1bGU7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIGkpcmV0dXJuIHQ7aWYoIW4pcmV0dXJuITE7aWYobj1uLnJlcGxhY2UoL15ALyxcIlwiKSxyPW4ucmVwbGFjZSgvLS9nLFwiX1wiKS50b1VwcGVyQ2FzZSgpK1wiX1JVTEVcIixyIGluIGkpcmV0dXJuXCJAXCIrbjtmb3IodmFyIHM9MDtvPnM7cysrKXt2YXIgYT1wcmVmaXhlc1tzXSxsPWEudG9VcHBlckNhc2UoKStcIl9cIityO2lmKGwgaW4gaSlyZXR1cm5cIkAtXCIrYS50b0xvd2VyQ2FzZSgpK1wiLVwiK259cmV0dXJuITF9O1MuYXRSdWxlPVA7dmFyIGo9Uy5fY29uZmlnLnVzZVByZWZpeGVzP2IudG9Mb3dlckNhc2UoKS5zcGxpdChcIiBcIik6W107Uy5fZG9tUHJlZml4ZXM9ajt2YXIgej17ZWxlbTphKFwibW9kZXJuaXpyXCIpfTtNb2Rlcm5penIuX3EucHVzaChmdW5jdGlvbigpe2RlbGV0ZSB6LmVsZW19KTt2YXIgTj17c3R5bGU6ei5lbGVtLnN0eWxlfTtNb2Rlcm5penIuX3EudW5zaGlmdChmdW5jdGlvbigpe2RlbGV0ZSBOLnN0eWxlfSksUy50ZXN0QWxsUHJvcHM9ZyxTLnRlc3RBbGxQcm9wcz1oLE1vZGVybml6ci5hZGRUZXN0KFwiZmxleGJveFwiLGgoXCJmbGV4QmFzaXNcIixcIjFweFwiLCEwKSk7dmFyIFQ9Uy5wcmVmaXhlZD1mdW5jdGlvbihlLG4sdCl7cmV0dXJuIDA9PT1lLmluZGV4T2YoXCJAXCIpP1AoZSk6KC0xIT1lLmluZGV4T2YoXCItXCIpJiYoZT1zKGUpKSxuP2coZSxuLHQpOmcoZSxcInBmeFwiKSl9O01vZGVybml6ci5hZGRUZXN0KFwib2JqZWN0Zml0XCIsISFUKFwib2JqZWN0Rml0XCIpLHthbGlhc2VzOltcIm9iamVjdC1maXRcIl19KSxvKCksaShDKSxkZWxldGUgUy5hZGRUZXN0LGRlbGV0ZSBTLmFkZEFzeW5jVGVzdDtmb3IodmFyIEw9MDtMPE1vZGVybml6ci5fcS5sZW5ndGg7TCsrKU1vZGVybml6ci5fcVtMXSgpO2UuTW9kZXJuaXpyPU1vZGVybml6cn0od2luZG93LGRvY3VtZW50KTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYXVkaW9QbGF5ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWF1ZGlvLXBsYXllcicpO1xuXG4gIGlmIChhdWRpb1BsYXllcnMgPT09IFtdKSB7IHJldHVybjsgfVxuXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYXVkaW9QbGF5ZXJzLCAoZWwpID0+IHtcbiAgICBjb25zdCBub2lzZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2F1ZGlvJyk7XG4gICAgY29uc3Qgc2Vla2VyID0gZWwucXVlcnlTZWxlY3RvcignLmpzLWF1ZGlvLXBsYXllci0tcHJvZ3Jlc3MnKTtcbiAgICBjb25zdCBidG5QbGF5UGF1c2UgPSBlbC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICBjb25zdCB0b3RhbFBsYXllZCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1hdWRpby1wbGF5ZXItLXBsYXllZCcpO1xuICAgIGNvbnN0IHRvdGFsTGVuZ3RoID0gZWwucXVlcnlTZWxlY3RvcignLmpzLWF1ZGlvLXBsYXllci0tbGVuZ3RoJyk7XG4gICAgY29uc3QgcGxheUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYXVkaW8tc3RhcnQtbGluaycpO1xuXG4gICAgaWYgKHBsYXlMaW5rKSB7XG4gICAgICBwbGF5TGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcbiAgICAgICAgICBldnQuaW5pdEV2ZW50KCdjbGljaycsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgICBidG5QbGF5UGF1c2UuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KSB7XG4gICAgICAgICAgYnRuUGxheVBhdXNlLmZpcmVFdmVudCgnb25jbGljaycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBidG5QbGF5UGF1c2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBwYXVzZWQgPSBub2lzZS5wYXVzZWQ7XG4gICAgICBwYXVzZUFsbChhdWRpb1BsYXllcnMpO1xuICAgICAgaWYgKHBhdXNlZCkgeyBub2lzZS5wbGF5KCk7IH1cbiAgICB9KTtcblxuICAgIG5vaXNlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgKGV2KSA9PiB7XG4gICAgICB0b3RhbExlbmd0aC5pbm5lclRleHQgPSBzZWNvbmRzVG9UaW1lU3RyaW5nKHBhcnNlSW50KGV2LnRhcmdldC5kdXJhdGlvbiwgMTApKTtcbiAgICAgIHNlZWtlci5zZXRBdHRyaWJ1dGUoJ21heCcsIG5vaXNlLmR1cmF0aW9uKTtcbiAgICB9KTtcblxuICAgIG5vaXNlLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCAoZXYpID0+IHtcbiAgICAgIC8vIGJ0blBsYXlQYXVzZS5pbm5lclRleHQgPSBcIlBhdXNlXCI7IC8vIFNldCB1cCBhcmlhIHRhZ3MgaGVyZSBpbnN0ZWFkXG4gICAgICBldi50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1wbGF5aW5nJyk7XG4gICAgfSk7XG5cbiAgICBub2lzZS5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIChldikgPT4ge1xuICAgICAgLy8gYnRuUGxheVBhdXNlLmlubmVyVGV4dCA9IFwiUGxheVwiO1xuICAgICAgZXYudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtcGxheWluZycpO1xuICAgIH0pO1xuXG4gICAgbm9pc2UuYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCAoZXYpID0+IHtcbiAgICAgIC8vIGJ0blBsYXlQYXVzZS5pbm5lclRleHQgPSBcIlBsYXlcIjtcbiAgICAgIGV2LnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXBsYXlpbmcnKTtcbiAgICB9KTtcblxuICAgIG5vaXNlLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCAoZXYpID0+IHtcbiAgICAgIHRvdGFsUGxheWVkLmlubmVyVGV4dCA9IHNlY29uZHNUb1RpbWVTdHJpbmcocGFyc2VJbnQoZXYudGFyZ2V0LmN1cnJlbnRUaW1lLCAxMCkpO1xuICAgICAgc2Vla2VyLnZhbHVlID0gZXYudGFyZ2V0LmN1cnJlbnRUaW1lO1xuICAgIH0pO1xuXG4gICAgc2Vla2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldikgPT4ge1xuICAgICAgbm9pc2UuY3VycmVudFRpbWUgPSBldi50YXJnZXQudmFsdWU7XG4gICAgICBub2lzZS5wbGF5KCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwYXVzZUFsbCAoZWxzKSB7XG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWxzLCAoZWwpID0+IHtcbiAgICBlbC5xdWVyeVNlbGVjdG9yKCdhdWRpbycpLnBhdXNlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZWNvbmRzVG9UaW1lU3RyaW5nICh0KSB7XG4gIGNvbnN0IG0gPSBNYXRoLmZsb29yKHQgLyA2MCwgMTApO1xuICBjb25zdCBzID0gdCAtIChtICogNjApO1xuICByZXR1cm4gYCR7KG0gPCAxMCA/IGAwJHttfWAgOiBtKX06JHsocyA8IDEwID8gYDAke3N9YCA6IHMpfWA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IG5hdkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1uYXZUb2dnbGUnKTtcbiAgY29uc3QgYm9kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gIGlmICghbmF2QnV0dG9uKSB7IHJldHVybjsgfVxuXG4gIG5hdkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgYm9kLmNsYXNzTGlzdC50b2dnbGUoJ25hdi1vcGVuJyk7XG4gIH0pO1xufVxuIiwiZnVuY3Rpb24gcG9seWZpbGxPYmplY3RGaXQgKCkge1xuICBjb25zdCBvYmplY3RGaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtb2JqZWN0LWZpdC1jb250YWluZXInKTtcbiAgW10uZm9yRWFjaC5jYWxsKG9iamVjdEZpdENvbnRhaW5lciwgKGVscykgPT4ge1xuICAgIGlmIChlbHMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdKSB7XG4gICAgICBjb25zdCBpbWdVcmwgPSBlbHMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnNyYztcbiAgICAgIGlmIChpbWdVcmwpIHtcbiAgICAgICAgZWxzLmNsYXNzTGlzdC5hZGQoJ2pzLW9iamVjdC1maXQtY29udGFpbmVyLS1mYWxsYmFjaycpO1xuICAgICAgICBlbHMuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHtpbWdVcmx9JylgO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmlmICh0eXBlb2YgTW9kZXJuaXpyICE9PSAndW5kZWZpbmVkJykge1xuICBNb2Rlcm5penIub24oJ29iamVjdGZpdCcsIChyKSA9PiB7XG4gICAgaWYgKCFyKSBwb2x5ZmlsbE9iamVjdEZpdCgpO1xuICB9KTtcbn1cbiJdfQ==
