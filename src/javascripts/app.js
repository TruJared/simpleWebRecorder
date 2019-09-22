// bling.js -> https://gist.github.com/TruJared/f674b493d6c312f3a4385bc25701ad88
import { $ } from './lib/bling';

// just import the whole libraries because why not...
const RecordRTC = require('recordrtc');
const shortid = require('shortid');

// sets a var for recorder which works with the RecordRTC lib
let recorder;

const captureCamera = callback => {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then(camera => {
      callback(camera);
    });
};

const stopRecording = () => {
  $('#videoPlayer').srcObject = null;
  $('#videoPlayer').src = null;
  $('#videoPlayer').muted = false;
  $('#videoPlayer').volume = 1;

  // auto playback
  $('#videoPlayer').src = URL.createObjectURL(recorder.getBlob());

  // name file with a hash and show link
  $('#download').href = URL.createObjectURL(recorder.getBlob());
  $('#download').download = `${shortid.generate()}.webm`;

  // update ui
  recorder.camera.stop();
  recorder.destroy();
  recorder = null;
  $('#download').classList.remove('is-hidden');
  $('#playback').classList.add('is-hidden');
  $('#start').disabled = false;
  $('#pause').disabled = true;
  $('#stop').disabled = true;
};

// this will start the process
$('#start').on('click', () => {
  // reset ui
  $('#start').disabled = true;
  $('#stop').disabled = false;
  $('#pause').disabled = false;
  $('.main-content--video-box').classList.remove('is-hidden');
  $('#download').classList.add('is-hidden');
  $('#playback').classList.remove('is-hidden');

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

// this is needed to pass the stopRecording function to recorder
$('#stop').on('click', () => {
  recorder.stopRecording(stopRecording);
});
