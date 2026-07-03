const input = document.getElementById("videoInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const video = document.createElement("video");

video.muted = true;
video.playsInline = true;
video.loop = true;
video.preload = "auto";

let isReady = false;

input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  isReady = false;

  video.pause();
  video.src = URL.createObjectURL(file);

  video.load();

  video.onloadeddata = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    isReady = true;

    // ВАЖНО: play() может требовать user gesture → вызываем через promise
    video.play().catch(err => {
      console.log("Play blocked:", err);
    });

    requestAnimationFrame(render);
  };
});

function render() {
  if (isReady) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  requestAnimationFrame(render);
}
