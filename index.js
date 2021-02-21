const canvas = document.getElementById("canva1");
const ctx = canvas.getContext("2d");

// console.log(ctx);
canvas.width = 800;
canvas.height = 500;

const keys = [];

const player = {
  x: 200,
  y: 200,
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

window.addEventListener("keydown", function (e) {
  // console.log(e);
  keys[e.key] = true;
  player.moving = true;
  // console.log(keys);
});
window.addEventListener("keyup", function (e) {
  delete keys[e.key];
  player.moving = false;
});

function movePlayer() {
  if (keys["ArrowUp"] && player.y > 100) {
    player.y -= player.speed;
    player.frameY = 3;
    player.moving = true;
  }
  if (keys["ArrowDown"] && player.y < canvas.height - player.height) {
    player.y += player.speed;
    player.frameY = 0;
    player.moving = true;
  }
  if (keys["ArrowLeft"] && player.x > 0) {
    player.x -= player.speed;
    player.frameY = 1;
    player.moving = true;
  }
  if (keys["ArrowRight"] && player.x < canvas.width - player.width) {
    player.x += player.speed;
    player.frameY = 2;
    player.moving = true;
  }
}
function handlePlayerFrame() {
  if (player.frameX < 3 && player.moving) player.frameX++;
  else player.frameX = 0;
}

/* function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  drawSprite(
    playerSprite,
    player.width * player.frameX,
    player.height * player.frameY,
    player.width,
    player.height,
    player.x,
    player.y,
    player.width,
    player.height
  );
  movePlayer();
  handlePlayerFrame();
  requestAnimationFrame(animate);
}
animate();*/

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(
      playerSprite,
      player.width * player.frameX,
      player.height * player.frameY,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width,
      player.height
    );
    movePlayer();
    handlePlayerFrame();
  }
}

startAnimating(20);

// A small comment on the animation cap you did;

// requestAnimationFrame passes a DOMHighResTimeStamp to the function that it calls, so every time it calls the animate function it gets passed a timestamp that you could use in frame cap calculation rather than re-setting now with Date.now() on every frame.
// I wonder if this would increase efficiency, even if it's a bit of a micro optimisation.

// So something like;

// const fps = 30;
// const interval = 1000/fps;
// var lastTime = 0;

// function animate( time ) {
//     if ( time - lastTime < interval ) {
//         requestionAnimationFrame( animate );  // Not enough time has passed, do nothing
//         return;
//     }
//     // Enough time seems to have passed, calculate and draw the next frame
//     lastTime = time;
//     // -- All your frame code here --
//     requestionAnimationFrame( animate );
// }

// // Kick off the first frame
// requestionAnimationFrame( animate );
