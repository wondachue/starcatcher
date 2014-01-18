/*
	This is a simple little timed based game.
	Click start, then try to catch as many stars as
	you can before the timer stops.
*/
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 768;
canvas.height = 550;
var cWidth = 500;
var cHeight = 550;
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
	context.drawImage(images.platform, 0, -150);
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
	else
	{
		//Otherwise, use regular white text to signify the stars are
		//catchable
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
	context.drawImage(images.imgB, 0, 0);
	if(frameCount % frameRate < 20)
	{
		context.drawImage(images.imgBG, 0, -75);
	}
	else if(frameCount % frameRate < 40)
	{
		context.drawImage(images.imgBG2, 0, -75);
	}
	else if(frameCount % frameRate < 60)
	{
		context.drawImage(images.imgBG3, 0, -75);
	}
	else if(frameCount % frameRate < 80)
	{
		context.drawImage(images.imgBG4, 0, -75);
	}
	else if(frameCount % frameRate < 100)
	{
		context.drawImage(images.imgBG5, 0, -75);
	}
	else
	{
		context.drawImage(images.imgBG7, 0, -75);
	}
}

//move and draw the sprite
function spriteStand()
{
	if(upwards > 0)
	{
		//sprite is jumping up
		if(upwards > 6)
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
		hero.y = 230;
		upwards = 0;
	}

	//alternate the animation
	if((frameCount % 20) < 10)
	{
		//check the direction and display the
		// correctly facing sprite
		if(direction == 1)
		{
			context.drawImage(images.img1, hero.x, hero.y, images.img1.width/2, images.img1.height/2);
		}
		else
		{
			context.drawImage(images.img3, hero.x, hero.y, images.img1.width/2, images.img1.height/2);
		}
	}
	else
	{
		if(direction == 1)
		{
			context.drawImage(images.img2, hero.x, hero.y, images.img1.width/2, images.img1.height/2);
		}
		else
		{
			context.drawImage(images.img4, hero.x, hero.y, images.img1.width/2, images.img1.height/2);
		}
	}
		
}

//animate the randomly falling stars
function spriteStar()
{
	//only animate if the star has a height just above the
	//sprite's head (according to the given window size)
	if(cHeight*.7 <= sYH || sYH == null)
	{
		sYW = random(cWidth);
		sYH = randomH();

		//pick a random speed for the star
		sYSpeed = random(8) + 2;
		if(frameCount % 20 < 10)
		{
	    	sYType = 1;
			context.drawImage(images.imgStarY1, sYW, sYH, images.imgStarY1.width/8, images.imgStarY1.height/8);
		}
		else
		{
			syType = 2;
			context.drawImage(images.imgStarY2, sYW, sYH, images.imgStarY1.width/8, images.imgStarY1.height/8);
		}
	}
	else
	{
		sYSpeed += sYSpeed/100;
		sYH += sYSpeed;
		if(frameCount % 20 < 10)
		{
	    	sYType = 1;
			context.drawImage(images.imgStarY1, sYW, sYH, images.imgStarY1.height/8, images.imgStarY1.width/8);
		}
		else
		{
			syType = 2;
			context.drawImage(images.imgStarY2, sYW, sYH, images.imgStarY1.height/8, images.imgStarY1.width/8);
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

//give a random speed
function random(n)
{
	return Math.floor((Math.random()*n)+1);
}

//give a random height
function randomH()
{
	return Math.floor((Math.random()*((500)*.5))+1);
}

//update the screen
var update = function () 
{
	if (38 in keysDown) 
	{ 
		// Player holding up
		if(upwards == 0)
		{
			upwards = 16;
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

	//update sprite's width x and y components
	currentHeroWidth = hero.x + images["img1"].width;
	currentHeroHeight = hero.y;
	starCenter = sYH;

	//check if game is going before checking if can
	//catch a star
	if(catchable == 1)
	{
		// Is the character touching the star?
		if (starCenter >= currentHeroHeight) 
		{
			if (sYW <= currentHeroWidth && sYW >= hero.x) 
			{
				//update stars caught
				sYH = null;
				++starsCaught;
				
			}
		}
	}
	console.log(starCenter);
};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


//create a dictionary of the images
var images = 
{
	"img1": "img/sprite1.png",
	"img2": "img/sprite2.png",
	"img3": "img/img3.png",
	"img4": "img/img4.png",
	"imgBG": "img/bg1.png",
	"imgBG2": "img/bg2.png",
	"imgBG3": "img/bg3.png",
	"imgBG4": "img/bg4.png",
	"imgBG5": "img/bg5.png",
	"imgBG7": "img/bg7.png",
	"imgB": "img/b.png",
	"imgStarY1": "img/starY1.png",
	"imgStarY2": "img/starY2.png",
	"platform": "img/plat.png"
};

//map keys to values with a for loop
for(var key in images)
{
	var thisImageSource = images[key];
	images[key] = new Image();
	images[key].src = thisImageSource;
	images[key].onload = load;
}

//variables
var canvas = document.getElementById("surface");

var count = 0;
var frameCount = 0;
var sYH = null;
var sYW = null;
var starCenter;
var sYType = null;
var sYSpeed = null;
var keysDown = {};
var hero = 
{
	speed: 6, // movement in pixels per second
	x: 0,
	y: 230,
};
var direction = 0;
var starsCaught = 0;
var upwards = 0;
var compareHeight = 200;
var timeLeft = 0;
var catchable = 0;
var frameRate = 120;

var currentHeroWidth = hero.x + images["img1"].width;
var currentHeroHeight = hero.y + images["img1"].height;
