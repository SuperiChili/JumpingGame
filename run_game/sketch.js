let canvas;
let bg;
let bgX = 0;
let gravity = 0.6;
let jumpForce = -13;
let isJumping = false;

let playerImg;
let playerLives = 3;

let malusImg;
let malusX;
let malus_sound;

let bonusImg;
let bonusX;
let bonus_sound;

let spriteX = 50;
let playerY;
let spriteVelocityY = 0;
let scene = 1; // Variable to keep track of the current scene
let intro_sound;
let game_over;
let speed = 4;

function preload() {
  bg = loadImage('sprites/dark_background.jpg');
  playerImg = loadImage('sprites/player.png')
  malusImg = loadImage('sprites/CREMA.jpg');
  bonusImg = loadImage('sprites/TROFEO.jpg');
  bonus_sound = loadSound('sounds/trophy.wav');
  malus_sound = loadSound('sounds/crema.wav');
  intro_sound = loadSound('sounds/introlo.mp3');
  game_over = loadSound('sounds/game_over.wav');
}

function setup() {
  canvas = createCanvas(700, 540); // Set the canvas size to match the image height
  
  // Center the canvas
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);

  // Initialize the sprite position
  playerY = height - playerImg.height;
  // Initialize the malus position
  malusX = width - 5;
  bonusX = width - 5;

  // Update the bonus position every 7 seconds
  setInterval(() => {
    bonusX = width - 5;
  }, 7000);

}

function draw() 
{
  background(220); // Clear the background with a gray color
  intro_sound.play();
  if (scene === 1) {
    // First scene
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Welcome to the Game!', width / 2, height / 2);
    text('Press SPACE to continue', width / 2, height / 2 + 50);
  } else if (scene === 2) {
    // Second scene
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Use the arrow keys to move', width / 2, height / 2);
    text('Press SPACE to continue', width / 2, height / 2 + 50);
  } else if (scene === 3) {
    // Third scene
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Avoid obstacles and reach the end!', width / 2, height / 2);
    text('Press SPACE to start the game', width / 2, height / 2 + 50);
  } else // GAME START
  {
    intro_sound.stop();
    // Draw the background image twice to create a looping effect
    image(bg, bgX, 0, 1920, 540);
    image(bg, bgX + 1920, 0, 1920, 540);

    // Move the background image to the left
    bgX -= speed;

    // Reset the background image position when it goes off screen
    if (bgX <= -1920) {
      bgX = 0;
    }

    // Apply gravity to the sprite
    spriteVelocityY += gravity;
    playerY += spriteVelocityY;

    // Prevent the sprite from falling below the ground
    if (playerY >= height - playerImg.height) {
      playerY = height - playerImg.height;
      spriteVelocityY = 0;
      isJumping = false;
    }

  
    image(playerImg, spriteX, playerY);

    // Draw the malus image
    if (malusImg) 
    {
      let malusY = height - malusImg.height; // Position the malus on the floor
      image(malusImg, malusX, malusY);

      // Move the malus image to the left along with the background
      malusX -= speed;

      // Reset the malus image position when it goes off screen
      if (malusX <= -malusImg.width) 
      {
        malusX = width - 5;
      }
      if (spriteX < malusX + malusImg.width && spriteX + playerImg.width > malusX && playerY < malusY + malusImg.height && playerY + playerImg.height > malusY) 
      {
        playerLives--;
        malus_sound.play();
        malusX = width - 5;
      }

      //STAMPA/AGGIORNA IL PUNTEGGIO
      textSize(32);
      textAlign(RIGHT, TOP);
      text('Lives: ' + playerLives, width - 10, 10);

      if (playerLives <= 0) {
        textSize(64);
        textAlign(CENTER, CENTER);
        text('YOU LOSE', width / 2, height / 2);
        game_over.play();
        noLoop();
      }
    }
    if (bonusImg) {
      
      let bonusY = height - bonusImg.height; // Position the bonus on the floor
      image(bonusImg, bonusX, bonusY);
  
      // Move the bonus image to the left along with the background
      bonusX -= speed;
  
      // Reset the bonus image position when it goes off screen
      if (bonusX <= -bonusImg.width) {
        bonusX = width - 5;
      }
  
      // Check for collision with the player
      if (spriteX < bonusX + bonusImg.width &&
          spriteX + playerImg.width > bonusX &&
          playerY < bonusY + bonusImg.height &&
          playerY + playerImg.height > bonusY) {
        playerLives++;
        bonus_sound.play();
        bonusX = width - 5; // Reset the bonus position
      }
    }
  }
}

function keyPressed() 
{
  if ((scene === 1 || scene === 2 || scene === 3) && keyCode === 32)
    scene++;
  if (keyCode === 32)
  {
    spriteVelocityY = jumpForce;
    isJumping = true;
  }
}
