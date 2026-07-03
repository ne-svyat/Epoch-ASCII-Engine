const input = document.getElementById("videoInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const video = document.createElement("video");

video.muted = true;
video.playsInline = true;
video.loop = true;

input.addEventListener("change", e => {

const file = e.target.files[0];

if(!file) return;

video.src = URL.createObjectURL(file);

video.onloadedmetadata = () => {

canvas.width = video.videoWidth;

canvas.height = video.videoHeight;

video.play();

requestAnimationFrame(render);

};

});

function render(){

ctx.drawImage(video,0,0);

requestAnimationFrame(render);

}
