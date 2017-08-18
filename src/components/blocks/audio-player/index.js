export default function () {
  const audioPlayers = document.querySelectorAll('.js-audio-player');

  if (audioPlayers === []) { return; }

  audioPlayers.forEach((el) => {
    const noise = el.querySelector('audio');
    const seeker = el.querySelector('.js-audio-player--progress');
    const btnPlayPause = el.querySelector('button');
    const totalPlayed = el.querySelector('.js-audio-player--played');
    const totalLength = el.querySelector('.js-audio-player--length');
    const playLink = document.querySelector('.js-audio-start-link');

    if (playLink) {
      playLink.addEventListener('click', (ev) => {
        ev.preventDefault();
        if (document.createEvent) {
          const evt = document.createEvent('MouseEvents');
          evt.initEvent('click', true, false);
          btnPlayPause.dispatchEvent(evt);
        } else if (document.createEventObject) {
          btnPlayPause.fireEvent('onclick');
        }
      });
    }

    btnPlayPause.addEventListener('click', (ev) => {
      ev.preventDefault();
      const paused = noise.paused;
      pauseAll(audioPlayers);
      if (paused) { noise.play(); }
    });

    noise.addEventListener('loadedmetadata', (ev) => {
      totalLength.innerText = secondsToTimeString(parseInt(ev.target.duration, 10));
      seeker.setAttribute('max', noise.duration);
    });

    noise.addEventListener('play', (ev) => {
      // btnPlayPause.innerText = "Pause"; // Set up aria tags here instead
      ev.target.parentElement.classList.add('is-playing');
    });

    noise.addEventListener('ended', (ev) => {
      // btnPlayPause.innerText = "Play";
      ev.target.parentElement.classList.remove('is-playing');
    });

    noise.addEventListener('pause', (ev) => {
      // btnPlayPause.innerText = "Play";
      ev.target.parentElement.classList.remove('is-playing');
    });

    noise.addEventListener('timeupdate', (ev) => {
      totalPlayed.innerText = secondsToTimeString(parseInt(ev.target.currentTime, 10));
      seeker.value = ev.target.currentTime;
    });

    seeker.addEventListener('change', (ev) => {
      noise.currentTime = ev.target.value;
      noise.play();
    });
  });
}

function pauseAll (els) {
  els.forEach((el) => {
    el.querySelector('audio').pause();
  });
}

function secondsToTimeString (t) {
  const m = Math.floor(t / 60, 10);
  const s = t - (m * 60);
  return `${(m < 10 ? `0${m}` : m)}:${(s < 10 ? `0${s}` : s)}`;
}
