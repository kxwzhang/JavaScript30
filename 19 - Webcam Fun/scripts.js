const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(error => console.log('Access was Denied', error));
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    const pixels = ctx.getImageData(0, 0, width, height);
    pixels = redEffect(pixels);
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  // take data out of canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src=${data} alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);

}

function redEffect(pixels) {
  for (let i = 0; i < pixels.length; i+= 4) {
    pixels[i] = pixels.data[i] + 200; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // BLUE
  } 
}

getVideo();

video.addEventListener('canplay', paintToCanvas);