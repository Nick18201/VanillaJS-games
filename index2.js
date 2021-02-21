const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// console.log(canvas)
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const images = {};
images.player = new Image();
images.player.src = "Cuphead.png";

const playerWidth = images.player.width / 16;
const playerHeight = images.player.height / 8;
let playerFrameX = 3;
let playerFrameY = 3;
let playerX = 0;
let playerY = 0;
const playerSpeed = 6;

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSprite(
    images.player,
    playerWidth * playerFrameX,
    playerHeight * playerFrameY,
    playerWidth,
    playerHeight,
    playerX,
    playerY,
    playerWidth,
    playerHeight
  );
}
