import { $, $$ } from './lib/bling';

const RecordRTC = require('recordrtc');

let recorder;

const video = document.querySelector('#videoPlayer');

function captureCamera(callback) {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then(camera => {
      callback(camera);
    })
    .catch(error => {
      console.error(`ERROR ${error}`);
    });
}

function stopRecordingCallback() {
  video.srcObject = null;
  video.src = video.srcObject;
  video.muted = false;
  video.volume = 1;
  video.src = URL.createObjectURL(recorder.getBlob());

  recorder.camera.stop();
  recorder.destroy();
  recorder = null;
}

document.getElementById('start').onclick = function () {
  this.disabled = true;
  captureCamera(camera => {
    video.muted = true;
    video.volume = 0;
    video.srcObject = camera;
    recorder = RecordRTC(camera, {
      type: 'video',
    });
    recorder.startRecording();
    // release camera on stopRecording
    recorder.camera = camera;
    document.getElementById('btn-stop-recording').disabled = false;
  });
};

document.getElementById('stop').onclick = function () {
  this.disabled = true;
  recorder.stopRecording(stopRecordingCallback);
};
