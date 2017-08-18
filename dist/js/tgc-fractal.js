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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL3NjcmlwdHMvYXBwbGljYXRpb24uanMiLCJzcmMvY29tcG9uZW50cy9ibG9ja3MvYXVkaW8tcGxheWVyL2luZGV4LmpzIiwic3JjL2NvbXBvbmVudHMvZ2xvYmFscy9oZWFkZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7OztBQUVBO0FBQ0E7Ozs7Ozs7OztrQkNKZSxZQUFZO0FBQ3pCLE1BQU0sZUFBZSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixDQUFyQjs7QUFFQSxNQUFJLGlCQUFpQixFQUFyQixFQUF5QjtBQUFFO0FBQVM7O0FBRXBDLGVBQWEsT0FBYixDQUFxQixVQUFDLEVBQUQsRUFBUTtBQUMzQixRQUFNLFFBQVEsR0FBRyxhQUFILENBQWlCLE9BQWpCLENBQWQ7QUFDQSxRQUFNLFNBQVMsR0FBRyxhQUFILENBQWlCLDRCQUFqQixDQUFmO0FBQ0EsUUFBTSxlQUFlLEdBQUcsYUFBSCxDQUFpQixRQUFqQixDQUFyQjtBQUNBLFFBQU0sY0FBYyxHQUFHLGFBQUgsQ0FBaUIsMEJBQWpCLENBQXBCO0FBQ0EsUUFBTSxjQUFjLEdBQUcsYUFBSCxDQUFpQiwwQkFBakIsQ0FBcEI7QUFDQSxRQUFNLFdBQVcsU0FBUyxhQUFULENBQXVCLHNCQUF2QixDQUFqQjs7QUFFQSxRQUFJLFFBQUosRUFBYztBQUNaLGVBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsVUFBQyxFQUFELEVBQVE7QUFDekMsV0FBRyxjQUFIO0FBQ0EsWUFBSSxTQUFTLFdBQWIsRUFBMEI7QUFDeEIsY0FBTSxNQUFNLFNBQVMsV0FBVCxDQUFxQixhQUFyQixDQUFaO0FBQ0EsY0FBSSxTQUFKLENBQWMsT0FBZCxFQUF1QixJQUF2QixFQUE2QixLQUE3QjtBQUNBLHVCQUFhLGFBQWIsQ0FBMkIsR0FBM0I7QUFDRCxTQUpELE1BSU8sSUFBSSxTQUFTLGlCQUFiLEVBQWdDO0FBQ3JDLHVCQUFhLFNBQWIsQ0FBdUIsU0FBdkI7QUFDRDtBQUNGLE9BVEQ7QUFVRDs7QUFFRCxpQkFBYSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxVQUFDLEVBQUQsRUFBUTtBQUM3QyxTQUFHLGNBQUg7QUFDQSxVQUFNLFNBQVMsTUFBTSxNQUFyQjtBQUNBLGVBQVMsWUFBVDtBQUNBLFVBQUksTUFBSixFQUFZO0FBQUUsY0FBTSxJQUFOO0FBQWU7QUFDOUIsS0FMRDs7QUFPQSxVQUFNLGdCQUFOLENBQXVCLGdCQUF2QixFQUF5QyxVQUFDLEVBQUQsRUFBUTtBQUMvQyxrQkFBWSxTQUFaLEdBQXdCLG9CQUFvQixTQUFTLEdBQUcsTUFBSCxDQUFVLFFBQW5CLEVBQTZCLEVBQTdCLENBQXBCLENBQXhCO0FBQ0EsYUFBTyxZQUFQLENBQW9CLEtBQXBCLEVBQTJCLE1BQU0sUUFBakM7QUFDRCxLQUhEOztBQUtBLFVBQU0sZ0JBQU4sQ0FBdUIsTUFBdkIsRUFBK0IsVUFBQyxFQUFELEVBQVE7QUFDckM7QUFDQSxTQUFHLE1BQUgsQ0FBVSxhQUFWLENBQXdCLFNBQXhCLENBQWtDLEdBQWxDLENBQXNDLFlBQXRDO0FBQ0QsS0FIRDs7QUFLQSxVQUFNLGdCQUFOLENBQXVCLE9BQXZCLEVBQWdDLFVBQUMsRUFBRCxFQUFRO0FBQ3RDO0FBQ0EsU0FBRyxNQUFILENBQVUsYUFBVixDQUF3QixTQUF4QixDQUFrQyxNQUFsQyxDQUF5QyxZQUF6QztBQUNELEtBSEQ7O0FBS0EsVUFBTSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFDLEVBQUQsRUFBUTtBQUN0QztBQUNBLFNBQUcsTUFBSCxDQUFVLGFBQVYsQ0FBd0IsU0FBeEIsQ0FBa0MsTUFBbEMsQ0FBeUMsWUFBekM7QUFDRCxLQUhEOztBQUtBLFVBQU0sZ0JBQU4sQ0FBdUIsWUFBdkIsRUFBcUMsVUFBQyxFQUFELEVBQVE7QUFDM0Msa0JBQVksU0FBWixHQUF3QixvQkFBb0IsU0FBUyxHQUFHLE1BQUgsQ0FBVSxXQUFuQixFQUFnQyxFQUFoQyxDQUFwQixDQUF4QjtBQUNBLGFBQU8sS0FBUCxHQUFlLEdBQUcsTUFBSCxDQUFVLFdBQXpCO0FBQ0QsS0FIRDs7QUFLQSxXQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFVBQUMsRUFBRCxFQUFRO0FBQ3hDLFlBQU0sV0FBTixHQUFvQixHQUFHLE1BQUgsQ0FBVSxLQUE5QjtBQUNBLFlBQU0sSUFBTjtBQUNELEtBSEQ7QUFJRCxHQXpERDtBQTBERCxDOztBQUVELFNBQVMsUUFBVCxDQUFtQixHQUFuQixFQUF3QjtBQUN0QixNQUFJLE9BQUosQ0FBWSxVQUFDLEVBQUQsRUFBUTtBQUNsQixPQUFHLGFBQUgsQ0FBaUIsT0FBakIsRUFBMEIsS0FBMUI7QUFDRCxHQUZEO0FBR0Q7O0FBRUQsU0FBUyxtQkFBVCxDQUE4QixDQUE5QixFQUFpQztBQUMvQixNQUFNLElBQUksS0FBSyxLQUFMLENBQVcsSUFBSSxFQUFmLEVBQW1CLEVBQW5CLENBQVY7QUFDQSxNQUFNLElBQUksSUFBSyxJQUFJLEVBQW5CO0FBQ0EsVUFBVyxJQUFJLEVBQUosU0FBYSxDQUFiLEdBQW1CLENBQTlCLFdBQXFDLElBQUksRUFBSixTQUFhLENBQWIsR0FBbUIsQ0FBeEQ7QUFDRDs7Ozs7Ozs7O2tCQzNFYyxZQUFZO0FBQ3pCLE1BQU0sWUFBWSxTQUFTLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBbEI7QUFDQSxNQUFNLE1BQU0sU0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVo7O0FBRUEsTUFBSSxDQUFDLFNBQUwsRUFBZ0I7QUFBRTtBQUFTOztBQUUzQixZQUFVLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFVBQUMsRUFBRCxFQUFRO0FBQzFDLE9BQUcsY0FBSDtBQUNBLFFBQUksU0FBSixDQUFjLE1BQWQsQ0FBcUIsVUFBckI7QUFDRCxHQUhEO0FBSUQsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgbmF2VG9nZ2xlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZ2xvYmFscy9oZWFkZXInO1xuaW1wb3J0IGF1ZGlvUGxheWVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYmxvY2tzL2F1ZGlvLXBsYXllcic7XG5cbm5hdlRvZ2dsZSgpO1xuYXVkaW9QbGF5ZXIoKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYXVkaW9QbGF5ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWF1ZGlvLXBsYXllcicpO1xuXG4gIGlmIChhdWRpb1BsYXllcnMgPT09IFtdKSB7IHJldHVybjsgfVxuXG4gIGF1ZGlvUGxheWVycy5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGNvbnN0IG5vaXNlID0gZWwucXVlcnlTZWxlY3RvcignYXVkaW8nKTtcbiAgICBjb25zdCBzZWVrZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuanMtYXVkaW8tcGxheWVyLS1wcm9ncmVzcycpO1xuICAgIGNvbnN0IGJ0blBsYXlQYXVzZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuICAgIGNvbnN0IHRvdGFsUGxheWVkID0gZWwucXVlcnlTZWxlY3RvcignLmpzLWF1ZGlvLXBsYXllci0tcGxheWVkJyk7XG4gICAgY29uc3QgdG90YWxMZW5ndGggPSBlbC5xdWVyeVNlbGVjdG9yKCcuanMtYXVkaW8tcGxheWVyLS1sZW5ndGgnKTtcbiAgICBjb25zdCBwbGF5TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1hdWRpby1zdGFydC1saW5rJyk7XG5cbiAgICBpZiAocGxheUxpbmspIHtcbiAgICAgIHBsYXlMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuICAgICAgICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuICAgICAgICAgIGV2dC5pbml0RXZlbnQoJ2NsaWNrJywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgIGJ0blBsYXlQYXVzZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICAgICAgICBidG5QbGF5UGF1c2UuZmlyZUV2ZW50KCdvbmNsaWNrJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGJ0blBsYXlQYXVzZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldikgPT4ge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IHBhdXNlZCA9IG5vaXNlLnBhdXNlZDtcbiAgICAgIHBhdXNlQWxsKGF1ZGlvUGxheWVycyk7XG4gICAgICBpZiAocGF1c2VkKSB7IG5vaXNlLnBsYXkoKTsgfVxuICAgIH0pO1xuXG4gICAgbm9pc2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCAoZXYpID0+IHtcbiAgICAgIHRvdGFsTGVuZ3RoLmlubmVyVGV4dCA9IHNlY29uZHNUb1RpbWVTdHJpbmcocGFyc2VJbnQoZXYudGFyZ2V0LmR1cmF0aW9uLCAxMCkpO1xuICAgICAgc2Vla2VyLnNldEF0dHJpYnV0ZSgnbWF4Jywgbm9pc2UuZHVyYXRpb24pO1xuICAgIH0pO1xuXG4gICAgbm9pc2UuYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIChldikgPT4ge1xuICAgICAgLy8gYnRuUGxheVBhdXNlLmlubmVyVGV4dCA9IFwiUGF1c2VcIjsgLy8gU2V0IHVwIGFyaWEgdGFncyBoZXJlIGluc3RlYWRcbiAgICAgIGV2LnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzLXBsYXlpbmcnKTtcbiAgICB9KTtcblxuICAgIG5vaXNlLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKGV2KSA9PiB7XG4gICAgICAvLyBidG5QbGF5UGF1c2UuaW5uZXJUZXh0ID0gXCJQbGF5XCI7XG4gICAgICBldi50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1wbGF5aW5nJyk7XG4gICAgfSk7XG5cbiAgICBub2lzZS5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIChldikgPT4ge1xuICAgICAgLy8gYnRuUGxheVBhdXNlLmlubmVyVGV4dCA9IFwiUGxheVwiO1xuICAgICAgZXYudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtcGxheWluZycpO1xuICAgIH0pO1xuXG4gICAgbm9pc2UuYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIChldikgPT4ge1xuICAgICAgdG90YWxQbGF5ZWQuaW5uZXJUZXh0ID0gc2Vjb25kc1RvVGltZVN0cmluZyhwYXJzZUludChldi50YXJnZXQuY3VycmVudFRpbWUsIDEwKSk7XG4gICAgICBzZWVrZXIudmFsdWUgPSBldi50YXJnZXQuY3VycmVudFRpbWU7XG4gICAgfSk7XG5cbiAgICBzZWVrZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2KSA9PiB7XG4gICAgICBub2lzZS5jdXJyZW50VGltZSA9IGV2LnRhcmdldC52YWx1ZTtcbiAgICAgIG5vaXNlLnBsYXkoKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBhdXNlQWxsIChlbHMpIHtcbiAgZWxzLmZvckVhY2goKGVsKSA9PiB7XG4gICAgZWwucXVlcnlTZWxlY3RvcignYXVkaW8nKS5wYXVzZSgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2Vjb25kc1RvVGltZVN0cmluZyAodCkge1xuICBjb25zdCBtID0gTWF0aC5mbG9vcih0IC8gNjAsIDEwKTtcbiAgY29uc3QgcyA9IHQgLSAobSAqIDYwKTtcbiAgcmV0dXJuIGAkeyhtIDwgMTAgPyBgMCR7bX1gIDogbSl9OiR7KHMgPCAxMCA/IGAwJHtzfWAgOiBzKX1gO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBjb25zdCBuYXZCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbmF2VG9nZ2xlJyk7XG4gIGNvbnN0IGJvZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICBpZiAoIW5hdkJ1dHRvbikgeyByZXR1cm47IH1cblxuICBuYXZCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXYpID0+IHtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGJvZC5jbGFzc0xpc3QudG9nZ2xlKCduYXYtb3BlbicpO1xuICB9KTtcbn1cbiJdfQ==
