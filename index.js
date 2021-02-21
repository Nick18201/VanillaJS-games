const canvas = document.getElementById("canva1");
const ctx = canvas.getContext("2d");

console.log(ctx);
canvas.width = 800;
canvas.height = 500;

const keys = [];

const player = {
  x: 0,
  y: 0,
  width: 40,
  height: 72,
  frameX: 0,
  frameY: 0,
  speed: 9,
  moving: false,
};

const playerSprite = new Image();
playerSprite.src = "chewie.png";

const background = new Image();
background.src = "background.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  drawSprite(
    playerSprite,
    0,
    0,
    player.width,
    player.height,
    0,
    0,
    player.width,
    player.height
  );
  requestAnimationFrame(animate);
}
animate();
