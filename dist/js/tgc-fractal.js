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

  audioPlayers.forEach(function (el) {
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
  els.forEach(function (el) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvc3ZnNGV2ZXJ5Ym9keS9kaXN0L3N2ZzRldmVyeWJvZHkuanMiLCJzcmMvYXNzZXRzL3NjcmlwdHMvYXBwbGljYXRpb24uanMiLCJzcmMvY29tcG9uZW50cy8wMC1taXhpbnMvbW9kZXJuaXpyL2luZGV4LmpzIiwic3JjL2NvbXBvbmVudHMvYmxvY2tzL2F1ZGlvLXBsYXllci9pbmRleC5qcyIsInNyYy9jb21wb25lbnRzL2dsb2JhbHMvaGVhZGVyL2luZGV4LmpzIiwic3JjL2NvbXBvbmVudHMvc2VydmljZXMvcG9seWZpbGwtb2JqZWN0LWZpdC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7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Q0FBbEI7QUFDQSxNQUFNLE1BQU0sU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVo7O0FBRUEsTUFBSSxDQUFDLFNBQUwsRUFBZ0I7QUFBRTtBQUFTOztBQUUzQixZQUFVLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFVBQUMsRUFBRCxFQUFRO0FBQzFDLE9BQUcsY0FBSDtBQUNBLFFBQUksU0FBSixDQUFjLE1BQWQsQ0FBcUIsVUFBckI7QUFDRCxHQUhEO0FBSUQsQzs7Ozs7QUNWRCxTQUFTLGlCQUFULEdBQThCO0FBQzVCLE1BQU0scUJBQXFCLFNBQVMsZ0JBQVQsQ0FBMEIsMEJBQTFCLENBQTNCO0FBQ0EsS0FBRyxPQUFILENBQVcsSUFBWCxDQUFnQixrQkFBaEIsRUFBb0MsVUFBQyxHQUFELEVBQVM7QUFDM0MsUUFBSSxJQUFJLG9CQUFKLENBQXlCLEtBQXpCLEVBQWdDLENBQWhDLENBQUosRUFBd0M7QUFDdEMsVUFBTSxTQUFTLElBQUksb0JBQUosQ0FBeUIsS0FBekIsRUFBZ0MsQ0FBaEMsRUFBbUMsR0FBbEQ7QUFDQSxVQUFJLE1BQUosRUFBWTtBQUNWLFlBQUksU0FBSixDQUFjLEdBQWQsQ0FBa0IsbUNBQWxCO0FBQ0EsWUFBSSxLQUFKLENBQVUsZUFBVixjQUFvQyxNQUFwQztBQUNEO0FBQ0Y7QUFDRixHQVJEO0FBU0Q7O0FBRUQsSUFBSSxPQUFPLFNBQVAsS0FBcUIsV0FBekIsRUFBc0M7QUFDcEMsWUFBVSxFQUFWLENBQWEsV0FBYixFQUEwQixVQUFDLENBQUQsRUFBTztBQUMvQixRQUFJLENBQUMsQ0FBTCxFQUFRO0FBQ1QsR0FGRDtBQUdEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiFmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgXCJmdW5jdGlvblwiID09IHR5cGVvZiBkZWZpbmUgJiYgZGVmaW5lLmFtZCA/IC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZSB1bmxlc3MgYW1kTW9kdWxlSWQgaXMgc2V0XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHJvb3Quc3ZnNGV2ZXJ5Ym9keSA9IGZhY3RvcnkoKTtcbiAgICB9KSA6IFwib2JqZWN0XCIgPT0gdHlwZW9mIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cyA/IC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgIC8vIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgIC8vIGxpa2UgTm9kZS5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6IHJvb3Quc3ZnNGV2ZXJ5Ym9keSA9IGZhY3RvcnkoKTtcbn0odGhpcywgZnVuY3Rpb24oKSB7XG4gICAgLyohIHN2ZzRldmVyeWJvZHkgdjIuMS45IHwgZ2l0aHViLmNvbS9qb25hdGhhbnRuZWFsL3N2ZzRldmVyeWJvZHkgKi9cbiAgICBmdW5jdGlvbiBlbWJlZChwYXJlbnQsIHN2ZywgdGFyZ2V0KSB7XG4gICAgICAgIC8vIGlmIHRoZSB0YXJnZXQgZXhpc3RzXG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50IHRvIGhvbGQgdGhlIGNvbnRlbnRzIG9mIHRoZSB0YXJnZXRcbiAgICAgICAgICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSwgdmlld0JveCA9ICFzdmcuaGFzQXR0cmlidXRlKFwidmlld0JveFwiKSAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFwidmlld0JveFwiKTtcbiAgICAgICAgICAgIC8vIGNvbmRpdGlvbmFsbHkgc2V0IHRoZSB2aWV3Qm94IG9uIHRoZSBzdmdcbiAgICAgICAgICAgIHZpZXdCb3ggJiYgc3ZnLnNldEF0dHJpYnV0ZShcInZpZXdCb3hcIiwgdmlld0JveCk7XG4gICAgICAgICAgICAvLyBjb3B5IHRoZSBjb250ZW50cyBvZiB0aGUgY2xvbmUgaW50byB0aGUgZnJhZ21lbnRcbiAgICAgICAgICAgIGZvciAoLy8gY2xvbmUgdGhlIHRhcmdldFxuICAgICAgICAgICAgdmFyIGNsb25lID0gdGFyZ2V0LmNsb25lTm9kZSghMCk7IGNsb25lLmNoaWxkTm9kZXMubGVuZ3RoOyApIHtcbiAgICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjbG9uZS5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aGUgZnJhZ21lbnQgaW50byB0aGUgc3ZnXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxvYWRyZWFkeXN0YXRlY2hhbmdlKHhocikge1xuICAgICAgICAvLyBsaXN0ZW4gdG8gY2hhbmdlcyBpbiB0aGUgcmVxdWVzdFxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGUgcmVxdWVzdCBpcyByZWFkeVxuICAgICAgICAgICAgaWYgKDQgPT09IHhoci5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjYWNoZWQgaHRtbCBkb2N1bWVudFxuICAgICAgICAgICAgICAgIHZhciBjYWNoZWREb2N1bWVudCA9IHhoci5fY2FjaGVkRG9jdW1lbnQ7XG4gICAgICAgICAgICAgICAgLy8gZW5zdXJlIHRoZSBjYWNoZWQgaHRtbCBkb2N1bWVudCBiYXNlZCBvbiB0aGUgeGhyIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgY2FjaGVkRG9jdW1lbnQgfHwgKGNhY2hlZERvY3VtZW50ID0geGhyLl9jYWNoZWREb2N1bWVudCA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudChcIlwiKSwgXG4gICAgICAgICAgICAgICAgY2FjaGVkRG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSB4aHIucmVzcG9uc2VUZXh0LCB4aHIuX2NhY2hlZFRhcmdldCA9IHt9KSwgLy8gY2xlYXIgdGhlIHhociBlbWJlZHMgbGlzdCBhbmQgZW1iZWQgZWFjaCBpdGVtXG4gICAgICAgICAgICAgICAgeGhyLl9lbWJlZHMuc3BsaWNlKDApLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgY2FjaGVkIHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0geGhyLl9jYWNoZWRUYXJnZXRbaXRlbS5pZF07XG4gICAgICAgICAgICAgICAgICAgIC8vIGVuc3VyZSB0aGUgY2FjaGVkIHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgfHwgKHRhcmdldCA9IHhoci5fY2FjaGVkVGFyZ2V0W2l0ZW0uaWRdID0gY2FjaGVkRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5pZCkpLCBcbiAgICAgICAgICAgICAgICAgICAgLy8gZW1iZWQgdGhlIHRhcmdldCBpbnRvIHRoZSBzdmdcbiAgICAgICAgICAgICAgICAgICAgZW1iZWQoaXRlbS5wYXJlbnQsIGl0ZW0uc3ZnLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAvLyB0ZXN0IHRoZSByZWFkeSBzdGF0ZSBjaGFuZ2UgaW1tZWRpYXRlbHlcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzdmc0ZXZlcnlib2R5KHJhd29wdHMpIHtcbiAgICAgICAgZnVuY3Rpb24gb25pbnRlcnZhbCgpIHtcbiAgICAgICAgICAgIC8vIHdoaWxlIHRoZSBpbmRleCBleGlzdHMgaW4gdGhlIGxpdmUgPHVzZT4gY29sbGVjdGlvblxuICAgICAgICAgICAgZm9yICgvLyBnZXQgdGhlIGNhY2hlZCA8dXNlPiBpbmRleFxuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDsgaW5kZXggPCB1c2VzLmxlbmd0aDsgKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IDx1c2U+XG4gICAgICAgICAgICAgICAgdmFyIHVzZSA9IHVzZXNbaW5kZXhdLCBwYXJlbnQgPSB1c2UucGFyZW50Tm9kZSwgc3ZnID0gZ2V0U1ZHQW5jZXN0b3IocGFyZW50KSwgc3JjID0gdXNlLmdldEF0dHJpYnV0ZShcInhsaW5rOmhyZWZcIikgfHwgdXNlLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFzcmMgJiYgb3B0cy5hdHRyaWJ1dGVOYW1lICYmIChzcmMgPSB1c2UuZ2V0QXR0cmlidXRlKG9wdHMuYXR0cmlidXRlTmFtZSkpLCBcbiAgICAgICAgICAgICAgICBzdmcgJiYgc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2x5ZmlsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRzLnZhbGlkYXRlIHx8IG9wdHMudmFsaWRhdGUoc3JjLCBzdmcsIHVzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgdGhlIDx1c2U+IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQodXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwYXJzZSB0aGUgc3JjIGFuZCBnZXQgdGhlIHVybCBhbmQgaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3JjU3BsaXQgPSBzcmMuc3BsaXQoXCIjXCIpLCB1cmwgPSBzcmNTcGxpdC5zaGlmdCgpLCBpZCA9IHNyY1NwbGl0LmpvaW4oXCIjXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsaW5rIGlzIGV4dGVybmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVybC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBjYWNoZWQgeGhyIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHhociA9IHJlcXVlc3RzW3VybF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuc3VyZSB0aGUgeGhyIHJlcXVlc3QgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhociB8fCAoeGhyID0gcmVxdWVzdHNbdXJsXSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLCB4aHIub3BlbihcIkdFVFwiLCB1cmwpLCB4aHIuc2VuZCgpLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLl9lbWJlZHMgPSBbXSksIC8vIGFkZCB0aGUgc3ZnIGFuZCBpZCBhcyBhbiBpdGVtIHRvIHRoZSB4aHIgZW1iZWRzIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLl9lbWJlZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN2Zzogc3ZnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLCAvLyBwcmVwYXJlIHRoZSB4aHIgcmVhZHkgc3RhdGUgY2hhbmdlIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRyZWFkeXN0YXRlY2hhbmdlKHhocik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW1iZWQgdGhlIGxvY2FsIGlkIGludG8gdGhlIHN2Z1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWJlZChwYXJlbnQsIHN2ZywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluY3JlYXNlIHRoZSBpbmRleCB3aGVuIHRoZSBwcmV2aW91cyB2YWx1ZSB3YXMgbm90IFwidmFsaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsraW5kZXgsICsrbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5jcmVhc2UgdGhlIGluZGV4IHdoZW4gdGhlIHByZXZpb3VzIHZhbHVlIHdhcyBub3QgXCJ2YWxpZFwiXG4gICAgICAgICAgICAgICAgICAgICsraW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29udGludWUgdGhlIGludGVydmFsXG4gICAgICAgICAgICAoIXVzZXMubGVuZ3RoIHx8IHVzZXMubGVuZ3RoIC0gbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzID4gMCkgJiYgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9uaW50ZXJ2YWwsIDY3KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcG9seWZpbGwsIG9wdHMgPSBPYmplY3QocmF3b3B0cyksIG5ld2VySUVVQSA9IC9cXGJUcmlkZW50XFwvWzU2N11cXGJ8XFxiTVNJRSAoPzo5fDEwKVxcLjBcXGIvLCB3ZWJraXRVQSA9IC9cXGJBcHBsZVdlYktpdFxcLyhcXGQrKVxcYi8sIG9sZGVyRWRnZVVBID0gL1xcYkVkZ2VcXC8xMlxcLihcXGQrKVxcYi8sIGVkZ2VVQSA9IC9cXGJFZGdlXFwvLihcXGQrKVxcYi8sIGluSWZyYW1lID0gd2luZG93LnRvcCAhPT0gd2luZG93LnNlbGY7XG4gICAgICAgIHBvbHlmaWxsID0gXCJwb2x5ZmlsbFwiIGluIG9wdHMgPyBvcHRzLnBvbHlmaWxsIDogbmV3ZXJJRVVBLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2gob2xkZXJFZGdlVUEpIHx8IFtdKVsxXSA8IDEwNTQ3IHx8IChuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKHdlYmtpdFVBKSB8fCBbXSlbMV0gPCA1MzcgfHwgZWRnZVVBLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgaW5JZnJhbWU7XG4gICAgICAgIC8vIGNyZWF0ZSB4aHIgcmVxdWVzdHMgb2JqZWN0XG4gICAgICAgIHZhciByZXF1ZXN0cyA9IHt9LCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHNldFRpbWVvdXQsIHVzZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInVzZVwiKSwgbnVtYmVyT2ZTdmdVc2VFbGVtZW50c1RvQnlwYXNzID0gMDtcbiAgICAgICAgLy8gY29uZGl0aW9uYWxseSBzdGFydCB0aGUgaW50ZXJ2YWwgaWYgdGhlIHBvbHlmaWxsIGlzIGFjdGl2ZVxuICAgICAgICBwb2x5ZmlsbCAmJiBvbmludGVydmFsKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFNWR0FuY2VzdG9yKG5vZGUpIHtcbiAgICAgICAgZm9yICh2YXIgc3ZnID0gbm9kZTsgXCJzdmdcIiAhPT0gc3ZnLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgJiYgKHN2ZyA9IHN2Zy5wYXJlbnROb2RlKTsgKSB7fVxuICAgICAgICByZXR1cm4gc3ZnO1xuICAgIH1cbiAgICByZXR1cm4gc3ZnNGV2ZXJ5Ym9keTtcbn0pOyIsImltcG9ydCBzdmc0ZXZlcnlib2R5IGZyb20gJ3N2ZzRldmVyeWJvZHknO1xuaW1wb3J0IG5hdlRvZ2dsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dsb2JhbHMvaGVhZGVyJztcbmltcG9ydCBhdWRpb1BsYXllciBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Jsb2Nrcy9hdWRpby1wbGF5ZXInO1xuXG5yZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzLzAwLW1peGlucy9tb2Rlcm5penIvaW5kZXguanMnKTtcbnJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvc2VydmljZXMvcG9seWZpbGwtb2JqZWN0LWZpdC9pbmRleC5qcycpO1xuXG5zdmc0ZXZlcnlib2R5KCk7XG5uYXZUb2dnbGUoKTtcbmF1ZGlvUGxheWVyKCk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyohIG1vZGVybml6ciAzLjUuMCAoQ3VzdG9tIEJ1aWxkKSB8IE1JVCAqXG4gKiBodHRwczovL21vZGVybml6ci5jb20vZG93bmxvYWQvPy1mbGV4Ym94LW9iamVjdGZpdC1zZXRjbGFzc2VzICEqL1xuIWZ1bmN0aW9uKGUsbix0KXtmdW5jdGlvbiByKGUsbil7cmV0dXJuIHR5cGVvZiBlPT09bn1mdW5jdGlvbiBvKCl7dmFyIGUsbix0LG8saSxzLGE7Zm9yKHZhciBsIGluIHgpaWYoeC5oYXNPd25Qcm9wZXJ0eShsKSl7aWYoZT1bXSxuPXhbbF0sbi5uYW1lJiYoZS5wdXNoKG4ubmFtZS50b0xvd2VyQ2FzZSgpKSxuLm9wdGlvbnMmJm4ub3B0aW9ucy5hbGlhc2VzJiZuLm9wdGlvbnMuYWxpYXNlcy5sZW5ndGgpKWZvcih0PTA7dDxuLm9wdGlvbnMuYWxpYXNlcy5sZW5ndGg7dCsrKWUucHVzaChuLm9wdGlvbnMuYWxpYXNlc1t0XS50b0xvd2VyQ2FzZSgpKTtmb3Iobz1yKG4uZm4sXCJmdW5jdGlvblwiKT9uLmZuKCk6bi5mbixpPTA7aTxlLmxlbmd0aDtpKyspcz1lW2ldLGE9cy5zcGxpdChcIi5cIiksMT09PWEubGVuZ3RoP01vZGVybml6clthWzBdXT1vOighTW9kZXJuaXpyW2FbMF1dfHxNb2Rlcm5penJbYVswXV1pbnN0YW5jZW9mIEJvb2xlYW58fChNb2Rlcm5penJbYVswXV09bmV3IEJvb2xlYW4oTW9kZXJuaXpyW2FbMF1dKSksTW9kZXJuaXpyW2FbMF1dW2FbMV1dPW8pLEMucHVzaCgobz9cIlwiOlwibm8tXCIpK2Euam9pbihcIi1cIikpfX1mdW5jdGlvbiBpKGUpe3ZhciBuPV8uY2xhc3NOYW1lLHQ9TW9kZXJuaXpyLl9jb25maWcuY2xhc3NQcmVmaXh8fFwiXCI7aWYodyYmKG49bi5iYXNlVmFsKSxNb2Rlcm5penIuX2NvbmZpZy5lbmFibGVKU0NsYXNzKXt2YXIgcj1uZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIrdCtcIm5vLWpzKFxcXFxzfCQpXCIpO249bi5yZXBsYWNlKHIsXCIkMVwiK3QrXCJqcyQyXCIpfU1vZGVybml6ci5fY29uZmlnLmVuYWJsZUNsYXNzZXMmJihuKz1cIiBcIit0K2Uuam9pbihcIiBcIit0KSx3P18uY2xhc3NOYW1lLmJhc2VWYWw9bjpfLmNsYXNzTmFtZT1uKX1mdW5jdGlvbiBzKGUpe3JldHVybiBlLnJlcGxhY2UoLyhbYS16XSktKFthLXpdKS9nLGZ1bmN0aW9uKGUsbix0KXtyZXR1cm4gbit0LnRvVXBwZXJDYXNlKCl9KS5yZXBsYWNlKC9eLS8sXCJcIil9ZnVuY3Rpb24gYSgpe3JldHVyblwiZnVuY3Rpb25cIiE9dHlwZW9mIG4uY3JlYXRlRWxlbWVudD9uLmNyZWF0ZUVsZW1lbnQoYXJndW1lbnRzWzBdKTp3P24uY3JlYXRlRWxlbWVudE5TLmNhbGwobixcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsYXJndW1lbnRzWzBdKTpuLmNyZWF0ZUVsZW1lbnQuYXBwbHkobixhcmd1bWVudHMpfWZ1bmN0aW9uIGwoZSxuKXtyZXR1cm4hIX4oXCJcIitlKS5pbmRleE9mKG4pfWZ1bmN0aW9uIGYoZSxuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gZS5hcHBseShuLGFyZ3VtZW50cyl9fWZ1bmN0aW9uIHUoZSxuLHQpe3ZhciBvO2Zvcih2YXIgaSBpbiBlKWlmKGVbaV1pbiBuKXJldHVybiB0PT09ITE/ZVtpXToobz1uW2VbaV1dLHIobyxcImZ1bmN0aW9uXCIpP2Yobyx0fHxuKTpvKTtyZXR1cm4hMX1mdW5jdGlvbiBwKGUpe3JldHVybiBlLnJlcGxhY2UoLyhbQS1aXSkvZyxmdW5jdGlvbihlLG4pe3JldHVyblwiLVwiK24udG9Mb3dlckNhc2UoKX0pLnJlcGxhY2UoL15tcy0vLFwiLW1zLVwiKX1mdW5jdGlvbiBjKG4sdCxyKXt2YXIgbztpZihcImdldENvbXB1dGVkU3R5bGVcImluIGUpe289Z2V0Q29tcHV0ZWRTdHlsZS5jYWxsKGUsbix0KTt2YXIgaT1lLmNvbnNvbGU7aWYobnVsbCE9PW8pciYmKG89by5nZXRQcm9wZXJ0eVZhbHVlKHIpKTtlbHNlIGlmKGkpe3ZhciBzPWkuZXJyb3I/XCJlcnJvclwiOlwibG9nXCI7aVtzXS5jYWxsKGksXCJnZXRDb21wdXRlZFN0eWxlIHJldHVybmluZyBudWxsLCBpdHMgcG9zc2libGUgbW9kZXJuaXpyIHRlc3QgcmVzdWx0cyBhcmUgaW5hY2N1cmF0ZVwiKX19ZWxzZSBvPSF0JiZuLmN1cnJlbnRTdHlsZSYmbi5jdXJyZW50U3R5bGVbcl07cmV0dXJuIG99ZnVuY3Rpb24gZCgpe3ZhciBlPW4uYm9keTtyZXR1cm4gZXx8KGU9YSh3P1wic3ZnXCI6XCJib2R5XCIpLGUuZmFrZT0hMCksZX1mdW5jdGlvbiBtKGUsdCxyLG8pe3ZhciBpLHMsbCxmLHU9XCJtb2Rlcm5penJcIixwPWEoXCJkaXZcIiksYz1kKCk7aWYocGFyc2VJbnQociwxMCkpZm9yKDtyLS07KWw9YShcImRpdlwiKSxsLmlkPW8/b1tyXTp1KyhyKzEpLHAuYXBwZW5kQ2hpbGQobCk7cmV0dXJuIGk9YShcInN0eWxlXCIpLGkudHlwZT1cInRleHQvY3NzXCIsaS5pZD1cInNcIit1LChjLmZha2U/YzpwKS5hcHBlbmRDaGlsZChpKSxjLmFwcGVuZENoaWxkKHApLGkuc3R5bGVTaGVldD9pLnN0eWxlU2hlZXQuY3NzVGV4dD1lOmkuYXBwZW5kQ2hpbGQobi5jcmVhdGVUZXh0Tm9kZShlKSkscC5pZD11LGMuZmFrZSYmKGMuc3R5bGUuYmFja2dyb3VuZD1cIlwiLGMuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIixmPV8uc3R5bGUub3ZlcmZsb3csXy5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiLF8uYXBwZW5kQ2hpbGQoYykpLHM9dChwLGUpLGMuZmFrZT8oYy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGMpLF8uc3R5bGUub3ZlcmZsb3c9ZixfLm9mZnNldEhlaWdodCk6cC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHApLCEhc31mdW5jdGlvbiB2KG4scil7dmFyIG89bi5sZW5ndGg7aWYoXCJDU1NcImluIGUmJlwic3VwcG9ydHNcImluIGUuQ1NTKXtmb3IoO28tLTspaWYoZS5DU1Muc3VwcG9ydHMocChuW29dKSxyKSlyZXR1cm4hMDtyZXR1cm4hMX1pZihcIkNTU1N1cHBvcnRzUnVsZVwiaW4gZSl7Zm9yKHZhciBpPVtdO28tLTspaS5wdXNoKFwiKFwiK3AobltvXSkrXCI6XCIrcitcIilcIik7cmV0dXJuIGk9aS5qb2luKFwiIG9yIFwiKSxtKFwiQHN1cHBvcnRzIChcIitpK1wiKSB7ICNtb2Rlcm5penIgeyBwb3NpdGlvbjogYWJzb2x1dGU7IH0gfVwiLGZ1bmN0aW9uKGUpe3JldHVyblwiYWJzb2x1dGVcIj09YyhlLG51bGwsXCJwb3NpdGlvblwiKX0pfXJldHVybiB0fWZ1bmN0aW9uIHkoZSxuLG8saSl7ZnVuY3Rpb24gZigpe3AmJihkZWxldGUgTi5zdHlsZSxkZWxldGUgTi5tb2RFbGVtKX1pZihpPXIoaSxcInVuZGVmaW5lZFwiKT8hMTppLCFyKG8sXCJ1bmRlZmluZWRcIikpe3ZhciB1PXYoZSxvKTtpZighcih1LFwidW5kZWZpbmVkXCIpKXJldHVybiB1fWZvcih2YXIgcCxjLGQsbSx5LGc9W1wibW9kZXJuaXpyXCIsXCJ0c3BhblwiLFwic2FtcFwiXTshTi5zdHlsZSYmZy5sZW5ndGg7KXA9ITAsTi5tb2RFbGVtPWEoZy5zaGlmdCgpKSxOLnN0eWxlPU4ubW9kRWxlbS5zdHlsZTtmb3IoZD1lLmxlbmd0aCxjPTA7ZD5jO2MrKylpZihtPWVbY10seT1OLnN0eWxlW21dLGwobSxcIi1cIikmJihtPXMobSkpLE4uc3R5bGVbbV0hPT10KXtpZihpfHxyKG8sXCJ1bmRlZmluZWRcIikpcmV0dXJuIGYoKSxcInBmeFwiPT1uP206ITA7dHJ5e04uc3R5bGVbbV09b31jYXRjaChoKXt9aWYoTi5zdHlsZVttXSE9eSlyZXR1cm4gZigpLFwicGZ4XCI9PW4/bTohMH1yZXR1cm4gZigpLCExfWZ1bmN0aW9uIGcoZSxuLHQsbyxpKXt2YXIgcz1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK2Uuc2xpY2UoMSksYT0oZStcIiBcIitFLmpvaW4ocytcIiBcIikrcykuc3BsaXQoXCIgXCIpO3JldHVybiByKG4sXCJzdHJpbmdcIil8fHIobixcInVuZGVmaW5lZFwiKT95KGEsbixvLGkpOihhPShlK1wiIFwiK2ouam9pbihzK1wiIFwiKStzKS5zcGxpdChcIiBcIiksdShhLG4sdCkpfWZ1bmN0aW9uIGgoZSxuLHIpe3JldHVybiBnKGUsdCx0LG4scil9dmFyIEM9W10seD1bXSxTPXtfdmVyc2lvbjpcIjMuNS4wXCIsX2NvbmZpZzp7Y2xhc3NQcmVmaXg6XCJcIixlbmFibGVDbGFzc2VzOiEwLGVuYWJsZUpTQ2xhc3M6ITAsdXNlUHJlZml4ZXM6ITB9LF9xOltdLG9uOmZ1bmN0aW9uKGUsbil7dmFyIHQ9dGhpcztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bih0W2VdKX0sMCl9LGFkZFRlc3Q6ZnVuY3Rpb24oZSxuLHQpe3gucHVzaCh7bmFtZTplLGZuOm4sb3B0aW9uczp0fSl9LGFkZEFzeW5jVGVzdDpmdW5jdGlvbihlKXt4LnB1c2goe25hbWU6bnVsbCxmbjplfSl9fSxNb2Rlcm5penI9ZnVuY3Rpb24oKXt9O01vZGVybml6ci5wcm90b3R5cGU9UyxNb2Rlcm5penI9bmV3IE1vZGVybml6cjt2YXIgXz1uLmRvY3VtZW50RWxlbWVudCx3PVwic3ZnXCI9PT1fLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCksYj1cIk1veiBPIG1zIFdlYmtpdFwiLEU9Uy5fY29uZmlnLnVzZVByZWZpeGVzP2Iuc3BsaXQoXCIgXCIpOltdO1MuX2Nzc29tUHJlZml4ZXM9RTt2YXIgUD1mdW5jdGlvbihuKXt2YXIgcixvPXByZWZpeGVzLmxlbmd0aCxpPWUuQ1NTUnVsZTtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgaSlyZXR1cm4gdDtpZighbilyZXR1cm4hMTtpZihuPW4ucmVwbGFjZSgvXkAvLFwiXCIpLHI9bi5yZXBsYWNlKC8tL2csXCJfXCIpLnRvVXBwZXJDYXNlKCkrXCJfUlVMRVwiLHIgaW4gaSlyZXR1cm5cIkBcIituO2Zvcih2YXIgcz0wO28+cztzKyspe3ZhciBhPXByZWZpeGVzW3NdLGw9YS50b1VwcGVyQ2FzZSgpK1wiX1wiK3I7aWYobCBpbiBpKXJldHVyblwiQC1cIithLnRvTG93ZXJDYXNlKCkrXCItXCIrbn1yZXR1cm4hMX07Uy5hdFJ1bGU9UDt2YXIgaj1TLl9jb25maWcudXNlUHJlZml4ZXM/Yi50b0xvd2VyQ2FzZSgpLnNwbGl0KFwiIFwiKTpbXTtTLl9kb21QcmVmaXhlcz1qO3ZhciB6PXtlbGVtOmEoXCJtb2Rlcm5penJcIil9O01vZGVybml6ci5fcS5wdXNoKGZ1bmN0aW9uKCl7ZGVsZXRlIHouZWxlbX0pO3ZhciBOPXtzdHlsZTp6LmVsZW0uc3R5bGV9O01vZGVybml6ci5fcS51bnNoaWZ0KGZ1bmN0aW9uKCl7ZGVsZXRlIE4uc3R5bGV9KSxTLnRlc3RBbGxQcm9wcz1nLFMudGVzdEFsbFByb3BzPWgsTW9kZXJuaXpyLmFkZFRlc3QoXCJmbGV4Ym94XCIsaChcImZsZXhCYXNpc1wiLFwiMXB4XCIsITApKTt2YXIgVD1TLnByZWZpeGVkPWZ1bmN0aW9uKGUsbix0KXtyZXR1cm4gMD09PWUuaW5kZXhPZihcIkBcIik/UChlKTooLTEhPWUuaW5kZXhPZihcIi1cIikmJihlPXMoZSkpLG4/ZyhlLG4sdCk6ZyhlLFwicGZ4XCIpKX07TW9kZXJuaXpyLmFkZFRlc3QoXCJvYmplY3RmaXRcIiwhIVQoXCJvYmplY3RGaXRcIikse2FsaWFzZXM6W1wib2JqZWN0LWZpdFwiXX0pLG8oKSxpKEMpLGRlbGV0ZSBTLmFkZFRlc3QsZGVsZXRlIFMuYWRkQXN5bmNUZXN0O2Zvcih2YXIgTD0wO0w8TW9kZXJuaXpyLl9xLmxlbmd0aDtMKyspTW9kZXJuaXpyLl9xW0xdKCk7ZS5Nb2Rlcm5penI9TW9kZXJuaXpyfSh3aW5kb3csZG9jdW1lbnQpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCBhdWRpb1BsYXllcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtYXVkaW8tcGxheWVyJyk7XG5cbiAgaWYgKGF1ZGlvUGxheWVycyA9PT0gW10pIHsgcmV0dXJuOyB9XG5cbiAgYXVkaW9QbGF5ZXJzLmZvckVhY2goKGVsKSA9PiB7XG4gICAgY29uc3Qgbm9pc2UgPSBlbC5xdWVyeVNlbGVjdG9yKCdhdWRpbycpO1xuICAgIGNvbnN0IHNlZWtlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1hdWRpby1wbGF5ZXItLXByb2dyZXNzJyk7XG4gICAgY29uc3QgYnRuUGxheVBhdXNlID0gZWwucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG4gICAgY29uc3QgdG90YWxQbGF5ZWQgPSBlbC5xdWVyeVNlbGVjdG9yKCcuanMtYXVkaW8tcGxheWVyLS1wbGF5ZWQnKTtcbiAgICBjb25zdCB0b3RhbExlbmd0aCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1hdWRpby1wbGF5ZXItLWxlbmd0aCcpO1xuICAgIGNvbnN0IHBsYXlMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWF1ZGlvLXN0YXJ0LWxpbmsnKTtcblxuICAgIGlmIChwbGF5TGluaykge1xuICAgICAgcGxheUxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyk7XG4gICAgICAgICAgZXZ0LmluaXRFdmVudCgnY2xpY2snLCB0cnVlLCBmYWxzZSk7XG4gICAgICAgICAgYnRuUGxheVBhdXNlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgICAgIGJ0blBsYXlQYXVzZS5maXJlRXZlbnQoJ29uY2xpY2snKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYnRuUGxheVBhdXNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgcGF1c2VkID0gbm9pc2UucGF1c2VkO1xuICAgICAgcGF1c2VBbGwoYXVkaW9QbGF5ZXJzKTtcbiAgICAgIGlmIChwYXVzZWQpIHsgbm9pc2UucGxheSgpOyB9XG4gICAgfSk7XG5cbiAgICBub2lzZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIChldikgPT4ge1xuICAgICAgdG90YWxMZW5ndGguaW5uZXJUZXh0ID0gc2Vjb25kc1RvVGltZVN0cmluZyhwYXJzZUludChldi50YXJnZXQuZHVyYXRpb24sIDEwKSk7XG4gICAgICBzZWVrZXIuc2V0QXR0cmlidXRlKCdtYXgnLCBub2lzZS5kdXJhdGlvbik7XG4gICAgfSk7XG5cbiAgICBub2lzZS5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgKGV2KSA9PiB7XG4gICAgICAvLyBidG5QbGF5UGF1c2UuaW5uZXJUZXh0ID0gXCJQYXVzZVwiOyAvLyBTZXQgdXAgYXJpYSB0YWdzIGhlcmUgaW5zdGVhZFxuICAgICAgZXYudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtcGxheWluZycpO1xuICAgIH0pO1xuXG4gICAgbm9pc2UuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoZXYpID0+IHtcbiAgICAgIC8vIGJ0blBsYXlQYXVzZS5pbm5lclRleHQgPSBcIlBsYXlcIjtcbiAgICAgIGV2LnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXBsYXlpbmcnKTtcbiAgICB9KTtcblxuICAgIG5vaXNlLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgKGV2KSA9PiB7XG4gICAgICAvLyBidG5QbGF5UGF1c2UuaW5uZXJUZXh0ID0gXCJQbGF5XCI7XG4gICAgICBldi50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1wbGF5aW5nJyk7XG4gICAgfSk7XG5cbiAgICBub2lzZS5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgKGV2KSA9PiB7XG4gICAgICB0b3RhbFBsYXllZC5pbm5lclRleHQgPSBzZWNvbmRzVG9UaW1lU3RyaW5nKHBhcnNlSW50KGV2LnRhcmdldC5jdXJyZW50VGltZSwgMTApKTtcbiAgICAgIHNlZWtlci52YWx1ZSA9IGV2LnRhcmdldC5jdXJyZW50VGltZTtcbiAgICB9KTtcblxuICAgIHNlZWtlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXYpID0+IHtcbiAgICAgIG5vaXNlLmN1cnJlbnRUaW1lID0gZXYudGFyZ2V0LnZhbHVlO1xuICAgICAgbm9pc2UucGxheSgpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcGF1c2VBbGwgKGVscykge1xuICBlbHMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBlbC5xdWVyeVNlbGVjdG9yKCdhdWRpbycpLnBhdXNlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZWNvbmRzVG9UaW1lU3RyaW5nICh0KSB7XG4gIGNvbnN0IG0gPSBNYXRoLmZsb29yKHQgLyA2MCwgMTApO1xuICBjb25zdCBzID0gdCAtIChtICogNjApO1xuICByZXR1cm4gYCR7KG0gPCAxMCA/IGAwJHttfWAgOiBtKX06JHsocyA8IDEwID8gYDAke3N9YCA6IHMpfWA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IG5hdkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1uYXZUb2dnbGUnKTtcbiAgY29uc3QgYm9kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gIGlmICghbmF2QnV0dG9uKSB7IHJldHVybjsgfVxuXG4gIG5hdkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgYm9kLmNsYXNzTGlzdC50b2dnbGUoJ25hdi1vcGVuJyk7XG4gIH0pO1xufVxuIiwiZnVuY3Rpb24gcG9seWZpbGxPYmplY3RGaXQgKCkge1xuICBjb25zdCBvYmplY3RGaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtb2JqZWN0LWZpdC1jb250YWluZXInKTtcbiAgW10uZm9yRWFjaC5jYWxsKG9iamVjdEZpdENvbnRhaW5lciwgKGVscykgPT4ge1xuICAgIGlmIChlbHMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdKSB7XG4gICAgICBjb25zdCBpbWdVcmwgPSBlbHMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdLnNyYztcbiAgICAgIGlmIChpbWdVcmwpIHtcbiAgICAgICAgZWxzLmNsYXNzTGlzdC5hZGQoJ2pzLW9iamVjdC1maXQtY29udGFpbmVyLS1mYWxsYmFjaycpO1xuICAgICAgICBlbHMuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnJHtpbWdVcmx9JylgO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmlmICh0eXBlb2YgTW9kZXJuaXpyICE9PSAndW5kZWZpbmVkJykge1xuICBNb2Rlcm5penIub24oJ29iamVjdGZpdCcsIChyKSA9PiB7XG4gICAgaWYgKCFyKSBwb2x5ZmlsbE9iamVjdEZpdCgpO1xuICB9KTtcbn1cbiJdfQ==
