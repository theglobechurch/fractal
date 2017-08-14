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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL3NjcmlwdHMvYXBwbGljYXRpb24uanMiLCJzcmMvY29tcG9uZW50cy9ibG9ja3MvYXVkaW8tcGxheWVyL2luZGV4LmpzIiwic3JjL2NvbXBvbmVudHMvZ2xvYmFscy9oZWFkZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7Ozs7Ozs7OztrQkNKZSxZQUFZO0FBQ3pCLE1BQU0sZUFBZSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixDQUFyQjs7QUFFQSxNQUFJLGlCQUFpQixFQUFyQixFQUF5QjtBQUFFO0FBQVM7O0FBRXBDLGVBQWEsT0FBYixDQUFxQixVQUFDLEVBQUQsRUFBUTtBQUMzQixRQUFNLFFBQVEsR0FBRyxhQUFILENBQWlCLE9BQWpCLENBQWQ7QUFDQSxRQUFNLFNBQVMsR0FBRyxhQUFILENBQWlCLDRCQUFqQixDQUFmO0FBQ0EsUUFBTSxlQUFlLEdBQUcsYUFBSCxDQUFpQixRQUFqQixDQUFyQjtBQUNBLFFBQU0sY0FBYyxHQUFHLGFBQUgsQ0FBaUIsMEJBQWpCLENBQXBCO0FBQ0EsUUFBTSxjQUFjLEdBQUcsYUFBSCxDQUFpQiwwQkFBakIsQ0FBcEI7O0FBRUEsaUJBQWEsZ0JBQWIsQ0FBOEIsT0FBOUIsRUFBdUMsVUFBQyxFQUFELEVBQVE7QUFDN0MsU0FBRyxjQUFIO0FBQ0EsVUFBTSxTQUFTLE1BQU0sTUFBckI7QUFDQSxlQUFTLFlBQVQ7QUFDQSxVQUFJLE1BQUosRUFBWTtBQUFFLGNBQU0sSUFBTjtBQUFlO0FBQzlCLEtBTEQ7O0FBT0EsVUFBTSxnQkFBTixDQUF1QixnQkFBdkIsRUFBeUMsVUFBQyxFQUFELEVBQVE7QUFDL0Msa0JBQVksU0FBWixHQUF3QixvQkFBb0IsU0FBUyxHQUFHLE1BQUgsQ0FBVSxRQUFuQixFQUE2QixFQUE3QixDQUFwQixDQUF4QjtBQUNBLGFBQU8sWUFBUCxDQUFvQixLQUFwQixFQUEyQixNQUFNLFFBQWpDO0FBQ0QsS0FIRDs7QUFLQSxVQUFNLGdCQUFOLENBQXVCLE1BQXZCLEVBQStCLFVBQUMsRUFBRCxFQUFRO0FBQ3JDO0FBQ0EsU0FBRyxNQUFILENBQVUsYUFBVixDQUF3QixTQUF4QixDQUFrQyxHQUFsQyxDQUFzQyxZQUF0QztBQUNELEtBSEQ7O0FBS0EsVUFBTSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDLEVBQUQsRUFBUTtBQUN0QztBQUNBLFNBQUcsTUFBSCxDQUFVLGFBQVYsQ0FBd0IsU0FBeEIsQ0FBa0MsTUFBbEMsQ0FBeUMsWUFBekM7QUFDRCxLQUhEOztBQUtBLFVBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQyxFQUFELEVBQVE7QUFDdEM7QUFDQSxTQUFHLE1BQUgsQ0FBVSxhQUFWLENBQXdCLFNBQXhCLENBQWtDLE1BQWxDLENBQXlDLFlBQXpDO0FBQ0QsS0FIRDs7QUFLQSxVQUFNLGdCQUFOLENBQXVCLFlBQXZCLEVBQXFDLFVBQUMsRUFBRCxFQUFRO0FBQzNDLGtCQUFZLFNBQVosR0FBd0Isb0JBQW9CLFNBQVMsR0FBRyxNQUFILENBQVUsV0FBbkIsRUFBZ0MsRUFBaEMsQ0FBcEIsQ0FBeEI7QUFDQSxhQUFPLEtBQVAsR0FBZSxHQUFHLE1BQUgsQ0FBVSxXQUF6QjtBQUNELEtBSEQ7O0FBS0EsV0FBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxVQUFDLEVBQUQsRUFBUTtBQUN4QyxZQUFNLFdBQU4sR0FBb0IsR0FBRyxNQUFILENBQVUsS0FBOUI7QUFDQSxZQUFNLElBQU47QUFDRCxLQUhEO0FBSUQsR0EzQ0Q7QUE0Q0QsQzs7QUFFRCxTQUFTLFFBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDdEIsTUFBSSxPQUFKLENBQVksVUFBQyxFQUFELEVBQVE7QUFDbEIsT0FBRyxhQUFILENBQWlCLE9BQWpCLEVBQTBCLEtBQTFCO0FBQ0QsR0FGRDtBQUdEOztBQUVELFNBQVMsbUJBQVQsQ0FBOEIsQ0FBOUIsRUFBaUM7QUFDL0IsTUFBTSxJQUFJLEtBQUssS0FBTCxDQUFXLElBQUksRUFBZixFQUFtQixFQUFuQixDQUFWO0FBQ0EsTUFBTSxJQUFJLElBQUssSUFBSSxFQUFuQjtBQUNBLFVBQVcsSUFBSSxFQUFKLFNBQWEsQ0FBYixHQUFtQixDQUE5QixXQUFxQyxJQUFJLEVBQUosU0FBYSxDQUFiLEdBQW1CLENBQXhEO0FBQ0Q7Ozs7Ozs7OztrQkM3RGMsWUFBWTtBQUN6QixNQUFNLFlBQVksU0FBUyxhQUFULENBQXVCLGVBQXZCLENBQWxCO0FBQ0EsTUFBTSxNQUFNLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFaOztBQUVBLE1BQUksQ0FBQyxTQUFMLEVBQWdCO0FBQUU7QUFBUzs7QUFFM0IsWUFBVSxnQkFBVixDQUEyQixPQUEzQixFQUFvQyxVQUFDLEVBQUQsRUFBUTtBQUMxQyxPQUFHLGNBQUg7QUFDQSxRQUFJLFNBQUosQ0FBYyxNQUFkLENBQXFCLFVBQXJCO0FBQ0QsR0FIRDtBQUlELEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IG5hdlRvZ2dsZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2dsb2JhbHMvaGVhZGVyJztcbmltcG9ydCBhdWRpb1BsYXllciBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Jsb2Nrcy9hdWRpby1wbGF5ZXInO1xuXG5uYXZUb2dnbGUoKTtcbmF1ZGlvUGxheWVyKCk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGF1ZGlvUGxheWVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1hdWRpby1wbGF5ZXInKTtcblxuICBpZiAoYXVkaW9QbGF5ZXJzID09PSBbXSkgeyByZXR1cm47IH1cblxuICBhdWRpb1BsYXllcnMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBjb25zdCBub2lzZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2F1ZGlvJyk7XG4gICAgY29uc3Qgc2Vla2VyID0gZWwucXVlcnlTZWxlY3RvcignLmpzLWF1ZGlvLXBsYXllci0tcHJvZ3Jlc3MnKTtcbiAgICBjb25zdCBidG5QbGF5UGF1c2UgPSBlbC5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcbiAgICBjb25zdCB0b3RhbFBsYXllZCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1hdWRpby1wbGF5ZXItLXBsYXllZCcpO1xuICAgIGNvbnN0IHRvdGFsTGVuZ3RoID0gZWwucXVlcnlTZWxlY3RvcignLmpzLWF1ZGlvLXBsYXllci0tbGVuZ3RoJyk7XG5cbiAgICBidG5QbGF5UGF1c2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb25zdCBwYXVzZWQgPSBub2lzZS5wYXVzZWQ7XG4gICAgICBwYXVzZUFsbChhdWRpb1BsYXllcnMpO1xuICAgICAgaWYgKHBhdXNlZCkgeyBub2lzZS5wbGF5KCk7IH1cbiAgICB9KTtcblxuICAgIG5vaXNlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgKGV2KSA9PiB7XG4gICAgICB0b3RhbExlbmd0aC5pbm5lclRleHQgPSBzZWNvbmRzVG9UaW1lU3RyaW5nKHBhcnNlSW50KGV2LnRhcmdldC5kdXJhdGlvbiwgMTApKTtcbiAgICAgIHNlZWtlci5zZXRBdHRyaWJ1dGUoJ21heCcsIG5vaXNlLmR1cmF0aW9uKTtcbiAgICB9KTtcblxuICAgIG5vaXNlLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCAoZXYpID0+IHtcbiAgICAgIC8vIGJ0blBsYXlQYXVzZS5pbm5lclRleHQgPSBcIlBhdXNlXCI7IC8vIFNldCB1cCBhcmlhIHRhZ3MgaGVyZSBpbnN0ZWFkXG4gICAgICBldi50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1wbGF5aW5nJyk7XG4gICAgfSk7XG5cbiAgICBub2lzZS5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIChldikgPT4ge1xuICAgICAgLy8gYnRuUGxheVBhdXNlLmlubmVyVGV4dCA9IFwiUGxheVwiO1xuICAgICAgZXYudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtcGxheWluZycpO1xuICAgIH0pO1xuXG4gICAgbm9pc2UuYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCAoZXYpID0+IHtcbiAgICAgIC8vIGJ0blBsYXlQYXVzZS5pbm5lclRleHQgPSBcIlBsYXlcIjtcbiAgICAgIGV2LnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXBsYXlpbmcnKTtcbiAgICB9KTtcblxuICAgIG5vaXNlLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCAoZXYpID0+IHtcbiAgICAgIHRvdGFsUGxheWVkLmlubmVyVGV4dCA9IHNlY29uZHNUb1RpbWVTdHJpbmcocGFyc2VJbnQoZXYudGFyZ2V0LmN1cnJlbnRUaW1lLCAxMCkpO1xuICAgICAgc2Vla2VyLnZhbHVlID0gZXYudGFyZ2V0LmN1cnJlbnRUaW1lO1xuICAgIH0pO1xuXG4gICAgc2Vla2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldikgPT4ge1xuICAgICAgbm9pc2UuY3VycmVudFRpbWUgPSBldi50YXJnZXQudmFsdWU7XG4gICAgICBub2lzZS5wbGF5KCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwYXVzZUFsbCAoZWxzKSB7XG4gIGVscy5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJ2F1ZGlvJykucGF1c2UoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNlY29uZHNUb1RpbWVTdHJpbmcgKHQpIHtcbiAgY29uc3QgbSA9IE1hdGguZmxvb3IodCAvIDYwLCAxMCk7XG4gIGNvbnN0IHMgPSB0IC0gKG0gKiA2MCk7XG4gIHJldHVybiBgJHsobSA8IDEwID8gYDAke219YCA6IG0pfTokeyhzIDwgMTAgPyBgMCR7c31gIDogcyl9YDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgbmF2QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW5hdlRvZ2dsZScpO1xuICBjb25zdCBib2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgaWYgKCFuYXZCdXR0b24pIHsgcmV0dXJuOyB9XG5cbiAgbmF2QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBib2QuY2xhc3NMaXN0LnRvZ2dsZSgnbmF2LW9wZW4nKTtcbiAgfSk7XG59XG4iXX0=
