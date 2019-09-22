import { $, $$ } from './lib/bling';

const video = document.querySelector('#videoPlayer');

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(e => {
      console.log(`Something went wrong! ${e}`);
    });
}
