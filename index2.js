const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// console.log(canvas)
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const images = {};
images.player = new Image();
images.player.src = "Cuphead.png";

const characterActions = [
  "up",
  // "top right",
  "right",
  "down right",
  // "down",
  "jump",
];
const characters = [];
const numberOfCharacters = 10;

class Character {
  constructor() {
    this.width = images.player.width / 16;
    this.height = images.player.height / 8;
    this.frameX = 3;
    this.x = Math.random() * canvas.height;
    this.y = Math.random() * canvas.height;
    this.speed = Math.random() * 1.5 + 3.5;
    this.action =
      characterActions[Math.floor(Math.random() * characterActions.length)];
    if (this.action === "up") {
      this.frameY = 0;
      this.minFrame = 4;
      this.maxFrame = 15;
    } else if (this.action === "right") {
      this.frameY = 3;
      this.minFrame = 3;
      this.maxFrame = 13;
    } else if (this.action === "jump") {
      this.frameY = 7;
      this.minFrame = 0;
      this.maxFrame = 9;
    } else if (this.action === "down right") {
      this.frameY = 4;
      this.minFrame = 4;
      this.maxFrame = 15;
    }
  }

  draw() {
    drawSprite(
      images.player,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    // animation of sprites
    if (this.frameX < this.maxFrame) this.frameX++;
    else this.frameX = this.minFrame;
  }
  update() {
    if (this.action === "right") {
      if (this.x > canvas.width + this.width) {
        this.x = 0 - this.width;
        this.y = Math.random() * (canvas.height - this.height);
      } else {
        this.x += this.speed;
      }
    } else if (this.action === "up") {
      if (this.y < 0 - this.height) {
        this.y = canvas.height + this.height;
        this.x = Math.random() * canvas.width;
      } else {
        this.y -= this.speed;
      }
    } else if (this.action === "down right") {
      if (
        this.y > canvas.height + this.height &&
        this.x > canvas.width + this.width
      ) {
        this.y = 0 - this.height;
        this.x = (Math.random() * canvas.width) / 2;
      } else {
        this.y += this.speed;
        this.x += this.speed;
      }
    }
  }
}
for (i = 0; i < numberOfCharacters; i++) {
  characters.push(new Character());
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < characters.length; i++) {
    characters[i].draw();
    characters[i].update();
  }
}

window.onload = setInterval(animate, 1000 / 20);

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});
