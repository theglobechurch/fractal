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

var _contentBox = require('../../components/blocks/content-box');

var _contentBox2 = _interopRequireDefault(_contentBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../../components/00-mixins/modernizr/index.js');
require('../../components/services/polyfill-object-fit/index.js');

(0, _svg4everybody2.default)();
(0, _header2.default)();
(0, _audioPlayer2.default)();
(0, _contentBox2.default)();

},{"../../components/00-mixins/modernizr/index.js":3,"../../components/blocks/audio-player":4,"../../components/blocks/content-box":5,"../../components/globals/header":6,"../../components/services/polyfill-object-fit/index.js":7,"svg4everybody":1}],3:[function(require,module,exports){
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
  var expandables = document.querySelectorAll('.js-content-box-expandable');
  var defaultLabel = 'Show more';

  if (expandables === []) {
    return;
  }

  Array.prototype.forEach.call(expandables, function (el) {
    var l = el.dataset.label || defaultLabel;

    var showLnk = document.createElement('p');
    showLnk.innerHTML = '\n      <a class="u-btn u-btn--dark u-btn--arrowed u-btn--centred">\n        ' + l + '\n      </a>\n    ';

    var parent = el.parentNode;
    parent.insertBefore(showLnk, el);

    el.classList.add('is-hidden');

    showLnk.addEventListener('click', function (ev) {
      ev.preventDefault();
      el.classList.remove('is-hidden');
      ev.target.remove();
    });
  });
};

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvc3ZnNGV2ZXJ5Ym9keS9kaXN0L3N2ZzRldmVyeWJvZHkuanMiLCJzcmMvYXNzZXRzL3NjcmlwdHMvYXBwbGljYXRpb24uanMiLCJzcmMvY29tcG9uZW50cy8wMC1taXhpbnMvbW9kZXJuaXpyL2luZGV4LmpzIiwic3JjL2NvbXBvbmVudHMvYmxvY2tzL2F1ZGlvLXBsYXllci9pbmRleC5qcyIsInNyYy9jb21wb25lbnRzL2Jsb2Nrcy9jb250ZW50LWJveC9pbmRleC5qcyIsInNyYy9jb21wb25lbnRzL2dsb2JhbHMvaGVhZGVyL2luZGV4LmpzIiwic3JjL2NvbXBvbmVudHMvc2VydmljZXMvcG9seWZpbGwtb2JqZWN0LWZpdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDRCxHQUhEO0FBSUQsQzs7Ozs7QUNWRCxTQUFTLGlCQUFULEdBQThCO0FBQzVCLE1BQU0scUJBQXFCLFNBQVMsZ0JBQVQsQ0FBMEIsMEJBQTFCLENBQTNCO0FBQ0EsS0FBRyxPQUFILENBQVcsSUFBWCxDQUFnQixrQkFBaEIsRUFBb0MsVUFBQyxHQUFELEVBQVM7QUFDM0MsUUFBSSxJQUFJLG9CQUFKLENBQXlCLEtBQXpCLEVBQWdDLENBQWhDLENBQUosRUFBd0M7QUFDdEMsVUFBTSxTQUFTLElBQUksb0JBQUosQ0FBeUIsS0FBekIsRUFBZ0MsQ0FBaEMsRUFBbUMsR0FBbEQ7QUFDQSxVQUFJLE1BQUosRUFBWTtBQUNWLFlBQUksU0FBSixDQUFjLEdBQWQsQ0FBa0IsbUNBQWxCO0FBQ0EsWUFBSSxLQUFKLENBQVUsZUFBVixjQUFvQyxNQUFwQztBQUNEO0FBQ0Y7QUFDRixHQVJEO0FBU0Q7O0FBRUQsSUFBSSxPQUFPLFNBQVAsS0FBcUIsV0FBekIsRUFBc0M7QUFDcEMsWUFBVSxFQUFWLENBQWEsV0FBYixFQUEwQixVQUFDLENBQUQsRUFBTztBQUMvQixRQUFJLENBQUMsQ0FBTCxFQUFRO0FBQ1QsR0FGRDtBQUdEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiFmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBkZWZpbmUgJiYgZGVmaW5lLmFtZCA/IC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZSB1bmxlc3MgYW1kTW9kdWxlSWQgaXMgc2V0XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHJvb3Quc3ZnNGV2ZXJ5Ym9keSA9IGZhY3RvcnkoKTtcbiAgICB9KSA6IFwib2JqZWN0XCIgPT0gdHlwZW9mIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cyA/IC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgIC8vIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgIC8vIGxpa2UgTm9kZS5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6IHJvb3Quc3ZnNGV2ZXJ5Ym9keSA9IGZhY3RvcnkoKTtcbn0odGhpcywgZnVuY3Rpb24oKSB7XG4gICAgLyohIHN2ZzRldmVyeWJvZHkgdjIuMS45IHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL3N2ZzRldmVyeWJvZHkgKi9cbiAgICBmdW5jdGlvbiBlbWJlZChwYXJlbnQsIHN2ZywgdGFyZ2V0KSB7XG4gICAgICAgIC8vIGlmIHRoZSB0YXJnZXQgZXhpc3RzXG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50IHRvIGhvbGQgdGhlIGNvbnRlbnRzIG9mIHRoZSB0YXJnZXRcbiAgICAgICAgICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSwgdmlld0JveCA9ICFzdmcuaGFzQXR0cmlidXRlKFwidmlld0JveFwiKSAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFwidmlld0JveFwiKTtcbiAgICAgICAgICAgIC8vIGNvbmRpdGlvbmFsbHkgc2V0IHRoZSB2aWV3Qm94IG9uIHRoZSBzdmdcbiAgICAgICAgICAgIHZpZXdCb3ggJiYgc3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgdmlld0JveCk7XG4gICAgICAgICAgICAvLyBjb3B5IHRoZSBjb250ZW50cyBvZiB0aGUgY2xvbmUgaW50byB0aGUgZnJhZ21lbnRcbiAgICAgICAgICAgIGZvciAoLy8gY2xvbmUgdGhlIHRhcmdldFxuICAgICAgICAgICAgdmFyIGNsb25lID0gdGFyZ2V0LmNsb25lTm9kZSghMCk7IGNsb25lLmNoaWxkTm9kZXMubGVuZ3RoOyApIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjbG9uZS5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgZnJhZ21lbnQgaW50byB0aGUgc3ZnXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxvYWRyZWFkeXN0YXRlY2hhbmdlKHhocikge1xuICAgICAgICAvLyBsaXN0ZW4gdG8gY2hhbmdlcyBpbiB0aGUgcmVxdWVzdFxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGUgcmVxdWVzdCBpcyByZWFkeVxuICAgICAgICAgICAgaWYgKDQgPT09IHhoci5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjYWNoZWQgaHRtbCBkb2N1bWVudFxuICAgICAgICAgICAgICAgIHZhciBjYWNoZWREb2N1bWVudCA9IHhoci5fY2FjaGVkRG9jdW1lbnQ7XG4gICAgICAgICAgICAgICAgLy8gZW5zdXJlIHRoZSBjYWNoZWQgaHRtbCBkb2N1bWVudCBiYXNlZCBvbiB0aGUgeGhyIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY2FjaGVkRG9jdW1lbnQgfHwgKGNhY2hlZERvY3VtZW50ID0geGhyLl9jYWNoZWREb2N1bWVudCA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudChcIlwiKSwgXG4gICAgICAgICAgICAgICAgY2FjaGVkRG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSB4aHIucmVzcG9uc2VUZXh0LCB4aHIuX2NhY2hlZFRhcmdldCA9IHt9KSwgLy8gY2xlYXIgdGhlIHhociBlbWJlZHMgbGlzdCBhbmQgZW1iZWQgZWFjaCBpdGVtXG4gICAgICAgICAgICAgICAgeGhyLl9lbWJlZHMuc3BsaWNlKDApLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2FjaGVkIHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0geGhyLl9jYWNoZWRUYXJnZXRbaXRlbS5pZF07XG4gICAgICAgICAgICAgICAgICAgIC8vIGVuc3VyZSB0aGUgY2FjaGVkIHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgfHwgKHRhcmdldCA9IHhoci5fY2FjaGVkVGFyZ2V0W2l0ZW0uaWRdID0gY2FjaGVkRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5pZCkpLCBcbiAgICAgICAgICAgICAgICAgICAgLy8gZW1iZWQgdGhlIHRhcmdldCBpbnRvIHRoZSBzdmdcbiAgICAgICAgICAgICAgICAgICAgZW1iZWQoaXRlbS5wYXJlbnQsIGl0ZW0uc3ZnLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAvLyB0ZXN0IHRoZSByZWFkeSBzdGF0ZSBjaGFuZ2UgaW1tZWRpYXRlbHlcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdmc0ZXZlcnlib2R5KHJhd29wdHMpIHtcbiAgICAgICAgZnVuY3Rpb24gb25pbnRlcnZhbCgpIHtcbiAgICAgICAgICAgIC8vIHdoaWxlIHRoZSBpbmRleCBleGlzdHMgaW4gdGhlIGxpdmUgPHVzZT4gY29sbGVjdGlvblxuICAgICAgICAgICAgZm9yICgvLyBnZXQgdGhlIGNhY2hlZCA8dXNlPiBpbmRleFxuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDsgaW5kZXggPCB1c2VzLmxlbmd0aDsgKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IDx1c2U+XG4gICAgICAgICAgICAgICAgdmFyIHVzZSA9IHVzZXNbaW5kZXhdLCBwYXJlbnQgPSB1c2UucGFyZW50Tm9kZSwgc3ZnID0gZ2V0U1ZHQW5jZXN0b3IocGFyZW50KSwgc3JjID0gdXNlLmdldEF0dHJpYnV0ZShcInhsaW5rOmhyZWZcIikgfHwgdXNlLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFzcmMgJiYgb3B0cy5hdHRyaWJ1dGVOYW1lICYmIChzcmMgPSB1c2UuZ2V0QXR0cmlidXRlKG9wdHMuYXR0cmlidXRlTmFtZSkpLCBcbiAgICAgICAgICAgICAgICBzdmcgJiYgc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2x5ZmlsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLnZhbGlkYXRlIHx8IG9wdHMudmFsaWRhdGUoc3JjLCBzdmcsIHVzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIDx1c2U+IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQodXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXJzZSB0aGUgc3JjIGFuZCBnZXQgdGhlIHVybCBhbmQgaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3JjU3BsaXQgPSBzcmMuc3BsaXQoXCIjXCIpLCB1cmwgPSBzcmNTcGxpdC5zaGlmdCgpLCBpZCA9IHNyY1NwbGl0LmpvaW4oXCIjXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5rIGlzIGV4dGVybmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVybC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjYWNoZWQgeGhyIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhociA9IHJlcXVlc3RzW3VybF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuc3VyZSB0aGUgeGhyIHJlcXVlc3QgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhociB8fCAoeGhyID0gcmVxdWVzdHNbdXJsXSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLCB4aHIub3BlbihcIkdFVFwiLCB1cmwpLCB4aHIuc2VuZCgpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLl9lbWJlZHMgPSBbXSksIC8vIGFkZCB0aGUgc3ZnIGFuZCBpZCBhcyBhbiBpdGVtIHRvIHRoZSB4aHIgZW1iZWRzIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLl9lbWJlZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN2Zzogc3ZnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCAvLyBwcmVwYXJlIHRoZSB4aHIgcmVhZHkgc3RhdGUgY2hhbmdlIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRyZWFkeXN0YXRlY2hhbmdlKHhocik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW1iZWQgdGhlIGxvY2FsIGlkIGludG8gdGhlIHN2Z1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWJlZChwYXJlbnQsIHN2ZywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBpbmRleCB3aGVuIHRoZSBwcmV2aW91cyB2YWx1ZSB3YXMgbm90IFwidmFsaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsraW5kZXgsICsrbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5jcmVhc2UgdGhlIGluZGV4IHdoZW4gdGhlIHByZXZpb3VzIHZhbHVlIHdhcyBub3QgXCJ2YWxpZFwiXG4gICAgICAgICAgICAgICAgICAgICsraW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29udGludWUgdGhlIGludGVydmFsXG4gICAgICAgICAgICAoIXVzZXMubGVuZ3RoIHx8IHVzZXMubGVuZ3RoIC0gbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzID4gMCkgJiYgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9uaW50ZXJ2YWwsIDY3KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcG9seWZpbGwsIG9wdHMgPSBPYmplY3QocmF3b3B0cyksIG5ld2VySUVVQSA9IC9cXGJUcmlkZW50XFwvWzU2N11cXGJ8XFxiTVNJRSAoPzo5fDEwKVxcLjBcXGIvLCB3ZWJraXRVQSA9IC9cXGJBcHBsZVdlYktpdFxcLyhcXGQrKVxcYi8sIG9sZGVyRWRnZVVBID0gL1xcYkVkZ2VcXC8xMlxcLihcXGQrKVxcYi8sIGVkZ2VVQSA9IC9cXGJFZGdlXFwvLihcXGQrKVxcYi8sIGluSWZyYW1lID0gd2luZG93LnRvcCAhPT0gd2luZG93LnNlbGY7XG4gICAgICAgIHBvbHlmaWxsID0gXCJwb2x5ZmlsbFwiIGluIG9wdHMgPyBvcHRzLnBvbHlmaWxsIDogbmV3ZXJJRVVBLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gob2xkZXJFZGdlVUEpIHx8IFtdKVsxXSA8IDEwNTQ3IHx8IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKHdlYmtpdFVBKSB8fCBbXSlbMV0gPCA1MzcgfHwgZWRnZVVBLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgaW5JZnJhbWU7XG4gICAgICAgIC8vIGNyZWF0ZSB4aHIgcmVxdWVzdHMgb2JqZWN0XG4gICAgICAgIHZhciByZXF1ZXN0cyA9IHt9LCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHNldFRpbWVvdXQsIHVzZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInVzZVwiKSwgbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzID0gMDtcbiAgICAgICAgLy8gY29uZGl0aW9uYWxseSBzdGFydCB0aGUgaW50ZXJ2YWwgaWYgdGhlIHBvbHlmaWxsIGlzIGFjdGl2ZVxuICAgICAgICBwb2x5ZmlsbCAmJiBvbmludGVydmFsKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFNWR0FuY2VzdG9yKG5vZGUpIHtcbiAgICAgICAgZm9yICh2YXIgc3ZnID0gbm9kZTsgXCJzdmdcIiAhPT0gc3ZnLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgJiYgKHN2ZyA9IHN2Zy5wYXJlbnROb2RlKTsgKSB7fVxuICAgICAgICByZXR1cm4gc3ZnO1xuICAgIH1cbiAgICByZXR1cm4gc3ZnNGV2ZXJ5Ym9keTtcbn0pOyIsImltcG9ydCBzdmc0ZXZlcnlib2R5IGZyb20gJ3N2ZzRldmVyeWJvZHknO1xuaW1wb3J0IG5hdlRvZ2dsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dsb2JhbHMvaGVhZGVyJztcbmltcG9ydCBhdWRpb1BsYXllciBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Jsb2Nrcy9hdWRpby1wbGF5ZXInO1xuaW1wb3J0IGNvbnRlbnRCb3ggZnJvbSAnLi4vLi4vY29tcG9uZW50cy9ibG9ja3MvY29udGVudC1ib3gnO1xuXG5yZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzLzAwLW1peGlucy9tb2Rlcm5penIvaW5kZXguanMnKTtcbnJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvc2VydmljZXMvcG9seWZpbGwtb2JqZWN0LWZpdC9pbmRleC5qcycpO1xuXG5zdmc0ZXZlcnlib2R5KCk7XG5uYXZUb2dnbGUoKTtcbmF1ZGlvUGxheWVyKCk7XG5jb250ZW50Qm94KCk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyohIG1vZGVybml6ciAzLjUuMCAoQ3VzdG9tIEJ1aWxkKSB8IE1JVCAqXG4gKiBodHRwczovL21vZGVybml6ci5jb20vZG93bmxvYWQvPy1mbGV4Ym94LW9iamVjdGZpdC1zZXRjbGFzc2VzICEqL1xuIWZ1bmN0aW9uKGUsbix0KXtmdW5jdGlvbiByKGUsbil7cmV0dXJuIHR5cGVvZiBlPT09bn1mdW5jdGlvbiBvKCl7dmFyIGUsbix0LG8saSxzLGE7Zm9yKHZhciBsIGluIHgpaWYoeC5oYXNPd25Qcm9wZXJ0eShsKSl7aWYoZT1bXSxuPXhbbF0sbi5uYW1lJiYoZS5wdXNoKG4ubmFtZS50b0xvd2VyQ2FzZSgpKSxuLm9wdGlvbnMmJm4ub3B0aW9ucy5hbGlhc2VzJiZuLm9wdGlvbnMuYWxpYXNlcy5sZW5ndGgpKWZvcih0PTA7dDxuLm9wdGlvbnMuYWxpYXNlcy5sZW5ndGg7dCsrKWUucHVzaChuLm9wdGlvbnMuYWxpYXNlc1t0XS50b0xvd2VyQ2FzZSgpKTtmb3Iobz1yKG4uZm4sXCJmdW5jdGlvblwiKT9uLmZuKCk6bi5mbixpPTA7aTxlLmxlbmd0aDtpKyspcz1lW2ldLGE9cy5zcGxpdChcIi5cIiksMT09PWEubGVuZ3RoP01vZGVybml6clthWzBdXT1vOighTW9kZXJuaXpyW2FbMF1dfHxNb2Rlcm5penJbYVswXV1pbnN0YW5jZW9mIEJvb2xlYW58fChNb2Rlcm5penJbYVswXV09bmV3IEJvb2xlYW4oTW9kZXJuaXpyW2FbMF1dKSksTW9kZXJuaXpyW2FbMF1dW2FbMV1dPW8pLEMucHVzaCgobz9cIlwiOlwibm8tXCIpK2Euam9pbihcIi1cIikpfX1mdW5jdGlvbiBpKGUpe3ZhciBuPV8uY2xhc3NOYW1lLHQ9TW9kZXJuaXpyLl9jb25maWcuY2xhc3NQcmVmaXh8fFwiXCI7aWYodyYmKG49bi5iYXNlVmFsKSxNb2Rlcm5penIuX2NvbmZpZy5lbmFibGVKU0NsYXNzKXt2YXIgcj1uZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIrdCtcIm5vLWpzKFxcXFxzfCQpXCIpO249bi5yZXBsYWNlKHIsXCIkMVwiK3QrXCJqcyQyXCIpfU1vZGVybml6ci5fY29uZmlnLmVuYWJsZUNsYXNzZXMmJihuKz1cIiBcIit0K2Uuam9pbihcIiBcIit0KSx3P18uY2xhc3NOYW1lLmJhc2VWYWw9bjpfLmNsYXNzTmFtZT1uKX1mdW5jdGlvbiBzKGUpe3JldHVybiBlLnJlcGxhY2UoLyhbYS16XSktKFthLXpdKS9nLGZ1bmN0aW9uKGUsbix0KXtyZXR1cm4gbit0LnRvVXBwZXJDYXNlKCl9KS5yZXBsYWNlKC9eLS8sXCJcIil9ZnVuY3Rpb24gYSgpe3JldHVyblwiZnVuY3Rpb25cIiE9dHlwZW9mIG4uY3JlYXRlRWxlbWVudD9uLmNyZWF0ZUVsZW1lbnQoYXJndW1lbnRzWzBdKTp3P24uY3JlYXRlRWxlbWVudE5TLmNhbGwobixcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsYXJndW1lbnRzWzBdKTpuLmNyZWF0ZUVsZW1lbnQuYXBwbHkobixhcmd1bWVudHMpfWZ1bmN0aW9uIGwoZSxuKXtyZXR1cm4hIX4oXCJcIitlKS5pbmRleE9mKG4pfWZ1bmN0aW9uIGYoZSxuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gZS5hcHBseShuLGFyZ3VtZW50cyl9fWZ1bmN0aW9uIHUoZSxuLHQpe3ZhciBvO2Zvcih2YXIgaSBpbiBlKWlmKGVbaV1pbiBuKXJldHVybiB0PT09ITE/ZVtpXToobz1uW2VbaV1dLHIobyxcImZ1bmN0aW9uXCIpP2Yobyx0fHxuKTpvKTtyZXR1cm4hMX1mdW5jdGlvbiBwKGUpe3JldHVybiBlLnJlcGxhY2UoLyhbQS1aXSkvZyxmdW5jdGlvbihlLG4pe3JldHVyblwiLVwiK24udG9Mb3dlckNhc2UoKX0pLnJlcGxhY2UoL15tcy0vLFwiLW1zLVwiKX1mdW5jdGlvbiBjKG4sdCxyKXt2YXIgbztpZihcImdldENvbXB1dGVkU3R5bGVcImluIGUpe289Z2V0Q29tcHV0ZWRTdHlsZS5jYWxsKGUsbix0KTt2YXIgaT1lLmNvbnNvbGU7aWYobnVsbCE9PW8pciYmKG89by5nZXRQcm9wZXJ0eVZhbHVlKHIpKTtlbHNlIGlmKGkpe3ZhciBzPWkuZXJyb3I/XCJlcnJvclwiOlwibG9nXCI7aVtzXS5jYWxsKGksXCJnZXRDb21wdXRlZFN0eWxlIHJldHVybmluZyBudWxsLCBpdHMgcG9zc2libGUgbW9kZXJuaXpyIHRlc3QgcmVzdWx0cyBhcmUgaW5hY2N1cmF0ZVwiKX19ZWxzZSBvPSF0JiZuLmN1cnJlbnRTdHlsZSYmbi5jdXJyZW50U3R5bGVbcl07cmV0dXJuIG99ZnVuY3Rpb24gZCgpe3ZhciBlPW4uYm9keTtyZXR1cm4gZXx8KGU9YSh3P1wic3ZnXCI6XCJib2R5XCIpLGUuZmFrZT0hMCksZX1mdW5jdGlvbiBtKGUsdCxyLG8pe3ZhciBpLHMsbCxmLHU9XCJtb2Rlcm5penJcIixwPWEoXCJkaXZcIiksYz1kKCk7aWYocGFyc2VJbnQociwxMCkpZm9yKDtyLS07KWw9YShcImRpdlwiKSxsLmlkPW8/b1tyXTp1KyhyKzEpLHAuYXBwZW5kQ2hpbGQobCk7cmV0dXJuIGk9YShcInN0eWxlXCIpLGkudHlwZT1cInRleHQvY3NzXCIsaS5pZD1cInNcIit1LChjLmZha2U/YzpwKS5hcHBlbmRDaGlsZChpKSxjLmFwcGVuZENoaWxkKHApLGkuc3R5bGVTaGVldD9pLnN0eWxlU2hlZXQuY3NzVGV4dD1lOmkuYXBwZW5kQ2hpbGQobi5jcmVhdGVUZXh0Tm9kZShlKSkscC5pZD11LGMuZmFrZSYmKGMuc3R5bGUuYmFja2dyb3VuZD1cIlwiLGMuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIixmPV8uc3R5bGUub3ZlcmZsb3csXy5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiLF8uYXBwZW5kQ2hpbGQoYykpLHM9dChwLGUpLGMuZmFrZT8oYy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGMpLF8uc3R5bGUub3ZlcmZsb3c9ZixfLm9mZnNldEhlaWdodCk6cC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHApLCEhc31mdW5jdGlvbiB2KG4scil7dmFyIG89bi5sZW5ndGg7aWYoXCJDU1NcImluIGUmJlwic3VwcG9ydHNcImluIGUuQ1NTKXtmb3IoO28tLTspaWYoZS5DU1Muc3VwcG9ydHMocChuW29dKSxyKSlyZXR1cm4hMDtyZXR1cm4hMX1pZihcIkNTU1N1cHBvcnRzUnVsZVwiaW4gZSl7Zm9yKHZhciBpPVtdO28tLTspaS5wdXNoKFwiKFwiK3AobltvXSkrXCI6XCIrcitcIilcIik7cmV0dXJuIGk9aS5qb2luKFwiIG9yIFwiKSxtKFwiQHN1cHBvcnRzIChcIitpK1wiKSB7ICNtb2Rlcm5penIgeyBwb3NpdGlvbjogYWJzb2x1dGU7IH0gfVwiLGZ1bmN0aW9uKGUpe3JldHVyblwiYWJzb2x1dGVcIj09YyhlLG51bGwsXCJwb3NpdGlvblwiKX0pfXJldHVybiB0fWZ1bmN0aW9uIHkoZSxuLG8saSl7ZnVuY3Rpb24gZigpe3AmJihkZWxldGUgTi5zdHlsZSxkZWxldGUgTi5tb2RFbGVtKX1pZihpPXIoaSxcInVuZGVmaW5lZFwiKT8hMTppLCFyKG8sXCJ1bmRlZmluZWRcIikpe3ZhciB1PXYoZSxvKTtpZighcih1LFwidW5kZWZpbmVkXCIpKXJldHVybiB1fWZvcih2YXIgcCxjLGQsbSx5LGc9W1wibW9kZXJuaXpyXCIsXCJ0c3BhblwiLFwic2FtcFwiXTshTi5zdHlsZSYmZy5sZW5ndGg7KXA9ITAsTi5tb2RFbGVtPWEoZy5zaGlmdCgpKSxOLnN0eWxlPU4ubW9kRWxlbS5zdHlsZTtmb3IoZD1lLmxlbmd0aCxjPTA7ZD5jO2MrKylpZihtPWVbY10seT1OLnN0eWxlW21dLGwobSxcIi1cIikmJihtPXMobSkpLE4uc3R5bGVbbV0hPT10KXtpZihpfHxyKG8sXCJ1bmRlZmluZWRcIikpcmV0dXJuIGYoKSxcInBmeFwiPT1uP206ITA7dHJ5e04uc3R5bGVbbV09b31jYXRjaChoKXt9aWYoTi5zdHlsZVttXSE9eSlyZXR1cm4gZigpLFwicGZ4XCI9PW4/bTohMH1yZXR1cm4gZigpLCExfWZ1bmN0aW9uIGcoZSxuLHQsbyxpKXt2YXIgcz1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Uuc2xpY2UoMSksYT0oZStcIiBcIitFLmpvaW4ocytcIiBcIikrcykuc3BsaXQoXCIgXCIpO3JldHVybiByKG4sXCJzdHJpbmdcIil8fHIobixcInVuZGVmaW5lZFwiKT95KGEsbixvLGkpOihhPShlK1wiIFwiK2ouam9pbihzK1wiIFwiKStzKS5zcGxpdChcIiBcIiksdShhLG4sdCkpfWZ1bmN0aW9uIGgoZSxuLHIpe3JldHVybiBnKGUsdCx0LG4scil9dmFyIEM9W10seD1bXSxTPXtfdmVyc2lvbjpcIjMuNS4wXCIsX2NvbmZpZzp7Y2xhc3NQcmVmaXg6XCJcIixlbmFibGVDbGFzc2VzOiEwLGVuYWJsZUpTQ2xhc3M6ITAsdXNlUHJlZml4ZXM6ITB9LF9xOltdLG9uOmZ1bmN0aW9uKGUsbil7dmFyIHQ9dGhpcztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bih0W2VdKX0sMCl9LGFkZFRlc3Q6ZnVuY3Rpb24oZSxuLHQpe3gucHVzaCh7bmFtZTplLGZuOm4sb3B0aW9uczp0fSl9LGFkZEFzeW5jVGVzdDpmdW5jdGlvbihlKXt4LnB1c2goe25hbWU6bnVsbCxmbjplfSl9fSxNb2Rlcm5penI9ZnVuY3Rpb24oKXt9O01vZGVybml6ci5wcm90b3R5cGU9UyxNb2Rlcm5penI9bmV3IE1vZGVybml6cjt2YXIgXz1uLmRvY3VtZW50RWxlbWVudCx3PVwic3ZnXCI9PT1fLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksYj1cIk1veiBPIG1zIFdlYmtpdFwiLEU9Uy5fY29uZmlnLnVzZVByZWZpeGVzP2Iuc3BsaXQoXCIgXCIpOltdO1MuX2Nzc29tUHJlZml4ZXM9RTt2YXIgUD1mdW5jdGlvbihuKXt2YXIgcixvPXByZWZpeGVzLmxlbmd0aCxpPWUuQ1NTUnVsZTtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgaSlyZXR1cm4gdDtpZighbilyZXR1cm4hMTtpZihuPW4ucmVwbGFjZSgvXkAvLFwiXCIpLHI9bi5yZXBsYWNlKC8tL2csXCJfXCIpLnRvVXBwZXJDYXNlKCkrXCJfUlVMRVwiLHIgaW4gaSlyZXR1cm5cIkBcIituO2Zvcih2YXIgcz0wO28+cztzKyspe3ZhciBhPXByZWZpeGVzW3NdLGw9YS50b1VwcGVyQ2FzZSgpK1wiX1wiK3I7aWYobCBpbiBpKXJldHVyblwiQC1cIithLnRvTG93ZXJDYXNlKCkrXCItXCIrbn1yZXR1cm4hMX07Uy5hdFJ1bGU9UDt2YXIgaj1TLl9jb25maWcudXNlUHJlZml4ZXM/Yi50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiIFwiKTpbXTtTLl9kb21QcmVmaXhlcz1qO3ZhciB6PXtlbGVtOmEoXCJtb2Rlcm5penJcIil9O01vZGVybml6ci5fcS5wdXNoKGZ1bmN0aW9uKCl7ZGVsZXRlIHouZWxlbX0pO3ZhciBOPXtzdHlsZTp6LmVsZW0uc3R5bGV9O01vZGVybml6ci5fcS51bnNoaWZ0KGZ1bmN0aW9uKCl7ZGVsZXRlIE4uc3R5bGV9KSxTLnRlc3RBbGxQcm9wcz1nLFMudGVzdEFsbFByb3BzPWgsTW9kZXJuaXpyLmFkZFRlc3QoXCJmbGV4Ym94XCIsaChcImZsZXhCYXNpc1wiLFwiMXB4XCIsITApKTt2YXIgVD1TLnByZWZpeGVkPWZ1bmN0aW9uKGUsbix0KXtyZXR1cm4gMD09PWUuaW5kZXhPZihcIkBcIik/UChlKTooLTEhPWUuaW5kZXhPZihcIi1cIikmJihlPXMoZSkpLG4/ZyhlLG4sdCk6ZyhlLFwicGZ4XCIpKX07TW9kZXJuaXpyLmFkZFRlc3QoXCJvYmplY3RmaXRcIiwhIVQoXCJvYmplY3RGaXRcIikse2FsaWFzZXM6W1wib2JqZWN0LWZpdFwiXX0pLG8oKSxpKEMpLGRlbGV0ZSBTLmFkZFRlc3QsZGVsZXRlIFMuYWRkQXN5bmNUZXN0O2Zvcih2YXIgTD0wO0w8TW9kZXJuaXpyLl9xLmxlbmd0aDtMKyspTW9kZXJuaXpyLl9xW0xdKCk7ZS5Nb2Rlcm5penI9TW9kZXJuaXpyfSh3aW5kb3csZG9jdW1lbnQpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCBhdWRpb1BsYXllcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtYXVkaW8tcGxheWVyJyk7XG5cbiAgaWYgKGF1ZGlvUGxheWVycyA9PT0gW10pIHsgcmV0dXJuOyB9XG5cbiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhdWRpb1BsYXllcnMsIChlbCkgPT4ge1xuICAgIGNvbnN0IG5vaXNlID0gZWwucXVlcnlTZWxlY3RvcignYXVkaW8nKTtcbiAgICBjb25zdCBzZWVrZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuanMtYXVkaW8tcGxheWVyLS1wcm9ncmVzcycpO1xuICAgIGNvbnN0IGJ0blBsYXlQYXVzZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHRvdGFsUGxheWVkID0gZWwucXVlcnlTZWxlY3RvcignLmpzLWF1ZGlvLXBsYXllci0tcGxheWVkJyk7XG4gICAgY29uc3QgdG90YWxMZW5ndGggPSBlbC5xdWVyeVNlbGVjdG9yKCcuanMtYXVkaW8tcGxheWVyLS1sZW5ndGgnKTtcbiAgICBjb25zdCBwbGF5TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1hdWRpby1zdGFydC1saW5rJyk7XG5cbiAgICBpZiAocGxheUxpbmspIHtcbiAgICAgIHBsYXlMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuICAgICAgICAgIGV2dC5pbml0RXZlbnQoJ2NsaWNrJywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgIGJ0blBsYXlQYXVzZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICAgICAgICBidG5QbGF5UGF1c2UuZmlyZUV2ZW50KCdvbmNsaWNrJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGJ0blBsYXlQYXVzZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IHBhdXNlZCA9IG5vaXNlLnBhdXNlZDtcbiAgICAgIHBhdXNlQWxsKGF1ZGlvUGxheWVycyk7XG4gICAgICBpZiAocGF1c2VkKSB7IG5vaXNlLnBsYXkoKTsgfVxuICAgIH0pO1xuXG4gICAgbm9pc2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCAoZXYpID0+IHtcbiAgICAgIHRvdGFsTGVuZ3RoLmlubmVyVGV4dCA9IHNlY29uZHNUb1RpbWVTdHJpbmcocGFyc2VJbnQoZXYudGFyZ2V0LmR1cmF0aW9uLCAxMCkpO1xuICAgICAgc2Vla2VyLnNldEF0dHJpYnV0ZSgnbWF4Jywgbm9pc2UuZHVyYXRpb24pO1xuICAgIH0pO1xuXG4gICAgbm9pc2UuYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIChldikgPT4ge1xuICAgICAgLy8gYnRuUGxheVBhdXNlLmlubmVyVGV4dCA9IFwiUGF1c2VcIjsgLy8gU2V0IHVwIGFyaWEgdGFncyBoZXJlIGluc3RlYWRcbiAgICAgIGV2LnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzLXBsYXlpbmcnKTtcbiAgICB9KTtcblxuICAgIG5vaXNlLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKGV2KSA9PiB7XG4gICAgICAvLyBidG5QbGF5UGF1c2UuaW5uZXJUZXh0ID0gXCJQbGF5XCI7XG4gICAgICBldi50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1wbGF5aW5nJyk7XG4gICAgfSk7XG5cbiAgICBub2lzZS5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIChldikgPT4ge1xuICAgICAgLy8gYnRuUGxheVBhdXNlLmlubmVyVGV4dCA9IFwiUGxheVwiO1xuICAgICAgZXYudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtcGxheWluZycpO1xuICAgIH0pO1xuXG4gICAgbm9pc2UuYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIChldikgPT4ge1xuICAgICAgdG90YWxQbGF5ZWQuaW5uZXJUZXh0ID0gc2Vjb25kc1RvVGltZVN0cmluZyhwYXJzZUludChldi50YXJnZXQuY3VycmVudFRpbWUsIDEwKSk7XG4gICAgICBzZWVrZXIudmFsdWUgPSBldi50YXJnZXQuY3VycmVudFRpbWU7XG4gICAgfSk7XG5cbiAgICBzZWVrZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2KSA9PiB7XG4gICAgICBub2lzZS5jdXJyZW50VGltZSA9IGV2LnRhcmdldC52YWx1ZTtcbiAgICAgIG5vaXNlLnBsYXkoKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBhdXNlQWxsIChlbHMpIHtcbiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlbHMsIChlbCkgPT4ge1xuICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJ2F1ZGlvJykucGF1c2UoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNlY29uZHNUb1RpbWVTdHJpbmcgKHQpIHtcbiAgY29uc3QgbSA9IE1hdGguZmxvb3IodCAvIDYwLCAxMCk7XG4gIGNvbnN0IHMgPSB0IC0gKG0gKiA2MCk7XG4gIHJldHVybiBgJHsobSA8IDEwID8gYDAke219YCA6IG0pfTokeyhzIDwgMTAgPyBgMCR7c31gIDogcyl9YDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZXhwYW5kYWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtY29udGVudC1ib3gtZXhwYW5kYWJsZScpO1xuICBjb25zdCBkZWZhdWx0TGFiZWwgPSAnU2hvdyBtb3JlJztcblxuICBpZiAoZXhwYW5kYWJsZXMgPT09IFtdKSB7IHJldHVybjsgfVxuXG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZXhwYW5kYWJsZXMsIChlbCkgPT4ge1xuICAgIGNvbnN0IGwgPSBlbC5kYXRhc2V0LmxhYmVsIHx8IGRlZmF1bHRMYWJlbDtcblxuICAgIGNvbnN0IHNob3dMbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgc2hvd0xuay5pbm5lckhUTUwgPSBgXG4gICAgICA8YSBjbGFzcz1cInUtYnRuIHUtYnRuLS1kYXJrIHUtYnRuLS1hcnJvd2VkIHUtYnRuLS1jZW50cmVkXCI+XG4gICAgICAgICR7bH1cbiAgICAgIDwvYT5cbiAgICBgO1xuXG4gICAgY29uc3QgcGFyZW50ID0gZWwucGFyZW50Tm9kZTtcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHNob3dMbmssIGVsKTtcblxuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuXG4gICAgc2hvd0xuay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgZXYudGFyZ2V0LnJlbW92ZSgpO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgbmF2QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW5hdlRvZ2dsZScpO1xuICBjb25zdCBib2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgaWYgKCFuYXZCdXR0b24pIHsgcmV0dXJuOyB9XG5cbiAgbmF2QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBib2QuY2xhc3NMaXN0LnRvZ2dsZSgnbmF2LW9wZW4nKTtcbiAgfSk7XG59XG4iLCJmdW5jdGlvbiBwb2x5ZmlsbE9iamVjdEZpdCAoKSB7XG4gIGNvbnN0IG9iamVjdEZpdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1vYmplY3QtZml0LWNvbnRhaW5lcicpO1xuICBbXS5mb3JFYWNoLmNhbGwob2JqZWN0Rml0Q29udGFpbmVyLCAoZWxzKSA9PiB7XG4gICAgaWYgKGVscy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0pIHtcbiAgICAgIGNvbnN0IGltZ1VybCA9IGVscy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJylbMF0uc3JjO1xuICAgICAgaWYgKGltZ1VybCkge1xuICAgICAgICBlbHMuY2xhc3NMaXN0LmFkZCgnanMtb2JqZWN0LWZpdC1jb250YWluZXItLWZhbGxiYWNrJyk7XG4gICAgICAgIGVscy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCcke2ltZ1VybH0nKWA7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuaWYgKHR5cGVvZiBNb2Rlcm5penIgIT09ICd1bmRlZmluZWQnKSB7XG4gIE1vZGVybml6ci5vbignb2JqZWN0Zml0JywgKHIpID0+IHtcbiAgICBpZiAoIXIpIHBvbHlmaWxsT2JqZWN0Rml0KCk7XG4gIH0pO1xufVxuIl19
