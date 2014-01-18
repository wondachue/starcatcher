/*
	This is a simple little timed based game.
	Click start, then try to catch as many stars as
	you can before the timer stops.
*/
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	canvas.width = 768;
	canvas.height = window.innerHeight - 75;
	var cWidth = 1000;
	var cHeight = screen.height/2 - 75;
	document.body.appendChild(canvas);

function load()
	{
		//Make sure the game is loaded by giving it
		//a time bumper (count of 11)
		count++;
		if(count == 11)
		{
			startGame();
		}
	}

//sets the draw interval
function startGame()
{
	setInterval(draw, Math.floor(1000/30));
}

//draw all the animation
function draw()
	{
		update();
		drawBG();
		context.drawImage(platform, 0, -cHeight/5 - 75);
		spriteStand();
		spriteStar();
		frameCount++;
		
		//checks if the countdown is going
		if(timeLeft > 0)
		{
			context.fillStyle = "rgb(200, 200, 250)";
			context.font = "50px Helvetica";
			context.textAlign = "right";
			context.textBaseline = "top";

			//display time left, decrement time remaining
			context.fillText(timeLeft, 700, 32);
			timeLeft--;
		}

		//time's up. Don't allow stars to be caught, turn text blue
		//to signify that the game isn't playing
		if(timeLeft == 0)
		{
			catchable = 0;
			context.fillStyle = "rgb(0, 250, 250)";
			context.font = "24px Helvetica";
			context.textAlign = "left";
			context.textBaseline = "top";
			context.fillText("Stars caught: " + starsCaught, 32, 32);

		}

		//Otherwise, use regular white text to signify the stars are
		//catchable
		else
		{

			context.fillStyle = "rgb(250, 250, 250)";
			context.font = "24px Helvetica";
			context.textAlign = "left";
			context.textBaseline = "top";
			context.fillText("Stars caught: " + starsCaught, 32, 32);
		}

	}

//draw all the background in loop according to a set speed
function drawBG()
	{
		context.drawImage(imgB, 0, 0);
		if((frameCount % 120) < 20)
		{
			context.drawImage(imgBG, 0, -75);
		}
		else if((frameCount % 120) < 40)
		{
			context.drawImage(imgBG2, 0, -75);
		}
		else if((frameCount % 120) < 60)
		{
			context.drawImage(imgBG3, 0, -75);
		}
		else if((frameCount % 120) < 80)
		{
			context.drawImage(imgBG4, 0, -75);
		}
		else if((frameCount % 120) < 100)
		{
			context.drawImage(imgBG5, 0, -75);
		}

		else
		{
			context.drawImage(imgBG7, 0, -75);
		}

		
	}

//move and draw the sprite
function spriteStand()
	{
		if(upwards > 0)
		{
			//sprite is jumping up
			if(upwards > 3)
			{	
				hero.y -= hero.speed;
			}

			//sprite is falling down
			else
			{
				hero.y += hero.speed;
			}
			upwards--;
		}

		//check to make sure the sprite isn't
		//jumping too high
		if(hero.y < compareHeight)
		{
			hero.y = 4*cHeight/5;
			upwards = 0;
		}

		//alternate the animation
		if((frameCount % 20) < 10)
		{
			//check the direction and display the
			// correctly facing sprite
			if(direction == 1)
			{
				context.drawImage(img1, hero.x, hero.y, img1.width/2, img1.height/2);
			}
			else
			{
				context.drawImage(img3, hero.x, hero.y, img1.width/2, img1.height/2);
			}
		}
		else
		{
			if(direction == 1)
			{
				context.drawImage(img2, hero.x, hero.y, img1.width/2, img1.height/2);
			}
			else
			{
				context.drawImage(img4, hero.x, hero.y, img1.width/2, img1.height/2);
			}
		}
			
	}

//animate the randomly falling stars
function spriteStar()
	{
		//only animate if the star has a height just above the
		//sprite's head (according to the given window size)
		if(sYH >= ((cHeight)*.7) || sYH == null)
		{
			sYW = random(cWidth);
			sYH = randomH();
			sYSpeed = random(8)+2;
			if((frameCount % 20) < 10)
			{
		    	sYType = 1;
				context.drawImage(imgStarY1, sYW, sYH, imgStarY1.width/8, imgStarY1.height/8);
			}
			else
			{
				syType = 2;
				context.drawImage(imgStarY2, sYW, sYH, imgStarY2.width/8, imgStarY2.height/8);
			}
		}
		else
		{
			sYSpeed += sYSpeed/100;
			sYH += sYSpeed;
			if((frameCount % 20) < 10)
			{
		    	sYType = 1;
				context.drawImage(imgStarY1, sYW, sYH, imgStarY1.width/8, imgStarY1.height/8);
			}
			else
			{
				syType = 2;
				context.drawImage(imgStarY2, sYW, sYH, imgStarY2.width/8, imgStarY2.height/8);
			}
		}
	} 

//start timer, reset game
function countdown()
{
	timeLeft = 300;
	starsCaught = 0;
	catchable = 1;
}

//give a random width
function random(n)
	{
		return Math.floor((Math.random()*n)+1);
	}

//give a random height
function randomH()
	{
		return Math.floor((Math.random()*((cHeight)*.5))+1);
	}

//update the screen
var update = function () 
{
	if (38 in keysDown) 
	{ 
		// Player holding up
		if(upwards == 0)
		{
			upwards = 8;
		}
	}
	if (37 in keysDown) 
	{ 
		// Player holding left
		hero.x -= hero.speed;
		direction = 0;
	}
	if (39 in keysDown) 
	{ 
		// Player holding right
		hero.x += hero.speed;
		direction = 1;
	}

	//check if game is going before checking if can
	//catch a star
	if(catchable == 1)
	{
		// Is the character touching the star?
		if (
			(
				(  
						(
							(hero.x <= sYW + 15)
							//hero's left is less then star's right
							&&  (hero.x >= sYW)
							//hero's left is greater than star's left
						)
					|| 	(
							(hero.x + (img2.width/2) >= sYW + 15)
							//hero's right is greater than star's right
							&& (hero.x + img2.width <= sYW)
							//hero's right is less than star's left
						)  
				)
				//x hero
				||
				(
						(
							(sYW <= hero.x + (img2.width/2))
							//star's left is less than hero's right
							&&  (sYW >= hero.x + 37.4)
							//star's left is greater than hero's left
						)
					||  (
							(sYW + 15 >= hero.x)
							//star's right is greater than hero's left
							&&  (sYW + 15 <= hero.x + 53)
							//star's right is less than hero's right
						)    
				)
				//x star
			)
			//X
			&&
			(
				(   
						(
							(hero.y <= sYH + 15)
							//hero's top is less than (more up than) star's bottom
							&&   (hero.y  >= sYH)
							//hero's top is greater than (more down than) star's top
						)
					||  (
							(hero.y + img2.height/2 >= sYH)
							//hero's bottom is greater than (more down than) star's top
							&&   (hero.y + 192 <= sYH + 15)
							//hero's bottom is less than (more up than) star's bottom
						)  
				)
				//y height hero
				||
				(   
						(
							(sYH <= hero.y + img2.height/2)
							//star's top is less than (more up than) hero's bottom
							&&   (sYH >= hero.y)
							//star's top is greater than (more down than) hero's top
						)
					||  (
							(sYH + 15 >= hero.y)
							//star's bottom is greater than (more down than) hero's top
							&&   (sYH + 15 <= hero.y + 192)
							//star's bottom is less than (more up than) hero's bottom
						) 
				)
				//y height star
			)
			//Y
			
		) {
			//update stars caught
			++starsCaught;
			sYH = null;
		}
	}
};



addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var canvas = document.getElementById("surface");

var count = 0;
var frameCount = 0;
var sYH = null;
var sYW = null;
var sYType = null;
var sYSpeed = null;
var keysDown = {};
var hero = {
	speed: 6, // movement in pixels per second
	x: 0,
	y: 4*cHeight/5,
};
var direction = 0;
var starsCaught = 0;
var upwards = 0;
var compareHeight = 8*cHeight/10 - cHeight/10;
var timeLeft = 0;
var catchable = 0;


//get all the images	
var img1 = new Image();
img1.src = "img/sprite1.png";
img1.onload = load;

var img2 = new Image();
img2.src = "img/sprite2.png";
img2.onload = load;

var img3 = new Image();
img3.src = "img/img3.png";
img3.onload = load;

var img4 = new Image();
img4.src = "img/img4.png";
img4.onload = load;

var imgBG = new Image();
imgBG.src = "img/bg1.png";
imgBG.onload = load;

var imgBG2 = new Image();
imgBG2.src = "img/bg2.png";
imgBG2.onload = load;

var imgBG3 = new Image();
imgBG3.src = "img/bg3.png";
imgBG3.onload = load;

var imgBG4 = new Image();
imgBG4.src = "img/bg4.png";
imgBG4.onload = load;

var imgBG5 = new Image();
imgBG5.src = "img/bg5.png";
imgBG5.onload = load;


var imgBG7 = new Image();
imgBG7.src = "img/bg7.png";
imgBG7.onload = load;

var imgB = new Image();
imgB.src = "img/b.png";
imgB.onload = load;

var imgStarY1 = new Image();
imgStarY1.src = "img/starY1.png";
imgStarY1.onload = load;

var imgStarY2 = new Image();
imgStarY2.src = "img/starY2.png";
imgStarY2.onload = load;

var platform = new Image();
platform.src = "img/plat.png";
platform.onload = load;


