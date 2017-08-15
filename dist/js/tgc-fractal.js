(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _header = require('../../components/globals/header');

var _header2 = _interopRequireDefault(_header);

var _audioPlayer = require('../../components/blocks/audio-player');

var _audioPlayer2 = _interopRequireDefault(_audioPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _header2.default)();
(0, _audioPlayer2.default)();

},{"../../components/blocks/audio-player":2,"../../components/globals/header":3}],2:[function(require,module,exports){
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
        } else if (typeof node.onclick == 'function') {
          btnPlayPause.onclick();
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

},{}],3:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL3NjcmlwdHMvYXBwbGljYXRpb24uanMiLCJzcmMvY29tcG9uZW50cy9ibG9ja3MvYXVkaW8tcGxheWVyL2luZGV4LmpzIiwic3JjL2NvbXBvbmVudHMvZ2xvYmFscy9oZWFkZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7Ozs7Ozs7OztrQkNKZSxZQUFZO0FBQ3pCLE1BQU0sZUFBZSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixDQUFyQjs7QUFFQSxNQUFJLGlCQUFpQixFQUFyQixFQUF5QjtBQUFFO0FBQVM7O0FBRXBDLGVBQWEsT0FBYixDQUFxQixVQUFDLEVBQUQsRUFBUTtBQUMzQixRQUFNLFFBQVEsR0FBRyxhQUFILENBQWlCLE9BQWpCLENBQWQ7QUFDQSxRQUFNLFNBQVMsR0FBRyxhQUFILENBQWlCLDRCQUFqQixDQUFmO0FBQ0EsUUFBTSxlQUFlLEdBQUcsYUFBSCxDQUFpQixRQUFqQixDQUFyQjtBQUNBLFFBQU0sY0FBYyxHQUFHLGFBQUgsQ0FBaUIsMEJBQWpCLENBQXBCO0FBQ0EsUUFBTSxjQUFjLEdBQUcsYUFBSCxDQUFpQiwwQkFBakIsQ0FBcEI7QUFDQSxRQUFNLFdBQVcsU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFqQjs7QUFFQSxRQUFJLFFBQUosRUFBYztBQUNaLGVBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsVUFBQyxFQUFELEVBQVE7QUFDekMsV0FBRyxjQUFIO0FBQ0EsWUFBSSxTQUFTLFdBQWIsRUFBMEI7QUFDdEIsY0FBSSxNQUFNLFNBQVMsV0FBVCxDQUFxQixhQUFyQixDQUFWO0FBQ0EsY0FBSSxTQUFKLENBQWMsT0FBZCxFQUF1QixJQUF2QixFQUE2QixLQUE3QjtBQUNBLHVCQUFhLGFBQWIsQ0FBMkIsR0FBM0I7QUFDSCxTQUpELE1BSU8sSUFB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Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IG5hdlRvZ2dsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dsb2JhbHMvaGVhZGVyJztcbmltcG9ydCBhdWRpb1BsYXllciBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Jsb2Nrcy9hdWRpby1wbGF5ZXInO1xuXG5uYXZUb2dnbGUoKTtcbmF1ZGlvUGxheWVyKCk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGF1ZGlvUGxheWVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1hdWRpby1wbGF5ZXInKTtcblxuICBpZiAoYXVkaW9QbGF5ZXJzID09PSBbXSkgeyByZXR1cm47IH1cblxuICBhdWRpb1BsYXllcnMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBjb25zdCBub2lzZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2F1ZGlvJyk7XG4gICAgY29uc3Qgc2Vla2VyID0gZWwucXVlcnlTZWxlY3RvcignLmpzLWF1ZGlvLXBsYXllci0tcHJvZ3Jlc3MnKTtcbiAgICBjb25zdCBidG5QbGF5UGF1c2UgPSBlbC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICBjb25zdCB0b3RhbFBsYXllZCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1hdWRpby1wbGF5ZXItLXBsYXllZCcpO1xuICAgIGNvbnN0IHRvdGFsTGVuZ3RoID0gZWwucXVlcnlTZWxlY3RvcignLmpzLWF1ZGlvLXBsYXllci0tbGVuZ3RoJyk7XG4gICAgY29uc3QgcGxheUxpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYXVkaW8tc3RhcnQtbGluaycpO1xuXG4gICAgaWYgKHBsYXlMaW5rKSB7XG4gICAgICBwbGF5TGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcbiAgICAgICAgICAgIGV2dC5pbml0RXZlbnQoJ2NsaWNrJywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgYnRuUGxheVBhdXNlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCkge1xuICAgICAgICAgIGJ0blBsYXlQYXVzZS5maXJlRXZlbnQoJ29uY2xpY2snKSA7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG5vZGUub25jbGljayA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgYnRuUGxheVBhdXNlLm9uY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYnRuUGxheVBhdXNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgcGF1c2VkID0gbm9pc2UucGF1c2VkO1xuICAgICAgcGF1c2VBbGwoYXVkaW9QbGF5ZXJzKTtcbiAgICAgIGlmIChwYXVzZWQpIHsgbm9pc2UucGxheSgpOyB9XG4gICAgfSk7XG5cbiAgICBub2lzZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIChldikgPT4ge1xuICAgICAgdG90YWxMZW5ndGguaW5uZXJUZXh0ID0gc2Vjb25kc1RvVGltZVN0cmluZyhwYXJzZUludChldi50YXJnZXQuZHVyYXRpb24sIDEwKSk7XG4gICAgICBzZWVrZXIuc2V0QXR0cmlidXRlKCdtYXgnLCBub2lzZS5kdXJhdGlvbik7XG4gICAgfSk7XG5cbiAgICBub2lzZS5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgKGV2KSA9PiB7XG4gICAgICAvLyBidG5QbGF5UGF1c2UuaW5uZXJUZXh0ID0gXCJQYXVzZVwiOyAvLyBTZXQgdXAgYXJpYSB0YWdzIGhlcmUgaW5zdGVhZFxuICAgICAgZXYudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtcGxheWluZycpO1xuICAgIH0pO1xuXG4gICAgbm9pc2UuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoZXYpID0+IHtcbiAgICAgIC8vIGJ0blBsYXlQYXVzZS5pbm5lclRleHQgPSBcIlBsYXlcIjtcbiAgICAgIGV2LnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXBsYXlpbmcnKTtcbiAgICB9KTtcblxuICAgIG5vaXNlLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgKGV2KSA9PiB7XG4gICAgICAvLyBidG5QbGF5UGF1c2UuaW5uZXJUZXh0ID0gXCJQbGF5XCI7XG4gICAgICBldi50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1wbGF5aW5nJyk7XG4gICAgfSk7XG5cbiAgICBub2lzZS5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgKGV2KSA9PiB7XG4gICAgICB0b3RhbFBsYXllZC5pbm5lclRleHQgPSBzZWNvbmRzVG9UaW1lU3RyaW5nKHBhcnNlSW50KGV2LnRhcmdldC5jdXJyZW50VGltZSwgMTApKTtcbiAgICAgIHNlZWtlci52YWx1ZSA9IGV2LnRhcmdldC5jdXJyZW50VGltZTtcbiAgICB9KTtcblxuICAgIHNlZWtlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXYpID0+IHtcbiAgICAgIG5vaXNlLmN1cnJlbnRUaW1lID0gZXYudGFyZ2V0LnZhbHVlO1xuICAgICAgbm9pc2UucGxheSgpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcGF1c2VBbGwgKGVscykge1xuICBlbHMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBlbC5xdWVyeVNlbGVjdG9yKCdhdWRpbycpLnBhdXNlKCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZWNvbmRzVG9UaW1lU3RyaW5nICh0KSB7XG4gIGNvbnN0IG0gPSBNYXRoLmZsb29yKHQgLyA2MCwgMTApO1xuICBjb25zdCBzID0gdCAtIChtICogNjApO1xuICByZXR1cm4gYCR7KG0gPCAxMCA/IGAwJHttfWAgOiBtKX06JHsocyA8IDEwID8gYDAke3N9YCA6IHMpfWA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IG5hdkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1uYXZUb2dnbGUnKTtcbiAgY29uc3QgYm9kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gIGlmICghbmF2QnV0dG9uKSB7IHJldHVybjsgfVxuXG4gIG5hdkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgYm9kLmNsYXNzTGlzdC50b2dnbGUoJ25hdi1vcGVuJyk7XG4gIH0pO1xufVxuIl19
