(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

var _map = require('../../components/blocks/map');

var _map2 = _interopRequireDefault(_map);

var _contentBox = require('../../components/blocks/content-box');

var _contentBox2 = _interopRequireDefault(_contentBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../../components/00-mixins/modernizr/index.js');
require('../../components/services/polyfill-object-fit/index.js');

(0, _svg4everybody2.default)();
(0, _header2.default)();
(0, _audioPlayer2.default)();
(0, _contentBox2.default)();
(0, _map2.default)();

},{"../../components/00-mixins/modernizr/index.js":3,"../../components/blocks/audio-player":4,"../../components/blocks/content-box":5,"../../components/blocks/map":6,"../../components/globals/header":7,"../../components/services/polyfill-object-fit/index.js":8,"svg4everybody":1}],3:[function(require,module,exports){
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return true;
};

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}]},{},[2]);
