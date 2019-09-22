// bling.js -> https://gist.github.com/TruJared/f674b493d6c312f3a4385bc25701ad88
import { $, $$ } from './lib/bling';

// just import the whole libraries because why not...
const RecordRTC = require('recordrtc');
const shortid = require('shortid');
const Stopwatch = require('timer-stopwatch');

// initialize some vars
let recorder;
const stopwatch = new Stopwatch();

// functions
const captureCamera = callback => {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then(camera => {
      callback(camera);
    });
};

// thanks -> https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript#21294619
const millisToMinutesAndSeconds = millis => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const timer = () => {
  const state = $('#videoPlayer').dataset.recording;
  if (!state) {
    stopwatch.start();
    $('#videoPlayer').setAttribute('data-recording', true);
    return ($('#off-on').innerHTML = 'On');
  }
  stopwatch.stop();
  $('#videoPlayer').removeAttribute('data-recording');
  return ($('#off-on').innerHTML = 'Off');
};

// * interactive elements * //

// this will start the process
$('#start').on('click', () => {
  // reset ui
  $('#start').disabled = true;
  $('#stop').disabled = false;
  $('#pause').disabled = false;
  $('.main-content--video-box').classList.remove('is-hidden');
  $('#download').classList.add('is-hidden');
  $('#playback').classList.remove('is-hidden');
  $('#pause').innerHTML = 'Pause';
  $('#videoPlayer').removeAttribute('controls');
  setInterval(() => {
    $('#timer').innerHTML = millisToMinutesAndSeconds(stopwatch.ms);
  }, 1000);

  // let's make a movie!
  captureCamera(camera => {
    $('#videoPlayer').muted = true;
    $('#videoPlayer').volume = 0;
    $('#videoPlayer').srcObject = camera;
    recorder = RecordRTC(camera, {
      type: 'video',
    });
    recorder.startRecording();
    // release camera on stopRecording
    recorder.camera = camera;
  });
});

// stop
$('#stop').on('click', () => {
  recorder.stopRecording(() => {
    $('#videoPlayer').srcObject = null;
    $('#videoPlayer').src = null;
    $('#videoPlayer').muted = false;
    $('#videoPlayer').volume = 1;
    $('#videoPlayer').setAttribute('controls', true);

    // auto playback
    $('#videoPlayer').src = URL.createObjectURL(recorder.getBlob());

    // name file with a hash and show link
    $('#download').href = URL.createObjectURL(recorder.getBlob());
    $('#download').download = `${shortid.generate()}.webm`;

    // update ui
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
    stopwatch.reset();
    $('#download').classList.remove('is-hidden');
    $('#playback').classList.add('is-hidden');
    $('#start').disabled = false;
    $('#pause').disabled = true;
    $('#stop').disabled = true;
  });
});

// pause and resume functionality
$('#pause').on('click', function () {
  if (this.innerHTML === 'Pause') {
    this.innerHTML = 'Resume';
    recorder.pauseRecording();
  } else {
    this.innerHTML = 'Pause';
    recorder.resumeRecording();
  }
});

// add timer function to buttons
$$('.button').forEach(el => {
  el.on('click', () => {
    timer();
  });
});
