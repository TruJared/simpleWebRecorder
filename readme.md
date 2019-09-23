# Easy Web Recorder

## What 'Dis? 🤷‍♂️

This is a very basic app to record video from a browser using a webcam. It's served 100% client side. You can see the demo [here](https://www.jaredmakes-webrecorder.com).

## Why 'Dis? 🤷‍♀

Why not?

## K, How 'Dis Work? 🧙

Requires Node and NPM.

Clone the repo or download the zip file. From the base directory type `npm i` to install dependencies. After the dependencies are installed, `npm start` to fire up a live server. The command line output will point you to the correct URL for the site. As of today (2019-09-22), the server is set to run at [http://localhost:1234](http://localhost:1234).

If you want to compile your own files for hosting on your own live server or local host; type `npm run build`. This command will create a `dist` folder containing all files required to host the app.

## Other Considerations

This is pretty much a POC/Prototype; the codes a bit janky an disorganized. Perhaps, someday, I'll clean it up a bit.

In `src/sass/utils/_variables.scss`, there are some options that are customizable. Mostly with colors; but a fe more.

## Gotcha's

Chrome will only support browser based web recording over `https` or `localhost`. Ohter browsers may vary.

Does not work on mobile. 🙁

Video does not persist throughout sessions.

---

Jared T. - 🐯

[![Netlify Status](https://api.netlify.com/api/v1/badges/6da23e47-6d5e-4ef6-a308-e9b951549e7e/deploy-status)](https://app.netlify.com/sites/simple-web-recorder/deploys)
