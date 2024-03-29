const memoryCanvas = document.createElement('canvas');
const memoryCtx = memoryCanvas.getContext('2d');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let balls = [];
let maxWidth = window.innerWidth;
let maxHeight =window.innerHeight;

canvas.width = maxWidth;
canvas.height = maxHeight;
memoryCanvas.width = maxWidth;
memoryCanvas.height = maxHeight;

window.addEventListener('resize',function(){
	addBall();
	maxWidth = window.innerWidth;
	maxHeight = window.innerHeight;
	canvas.width = maxWidth;
	canvas.height = maxHeight;
	memoryCanvas.width = maxWidth;
	memoryCanvas.height = maxHeight;
});

document.addEventListener('click',function(e){
	let size = (Math.random()*35)+15;
	let x = e.offsetX;
	let y = e.offsetY;
	let color = '#'+Math.round(Math.random() * 0xFFFFFF).toString(16);
	// let color = `#000`;
	balls = [...balls,new Ball(x,y,size,color)];
});

class Ball{
	constructor(x,y,size,color){
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;

		this.px = (Math.random()*(maxWidth/200))+1;
		this.py = (Math.random()*(maxHeight/100))+1;
	}
	draw(){
		memoryCtx.beginPath();
		memoryCtx.fillStyle = this.color;
		memoryCtx.arc(this.x,this.y,this.size,0,Math.PI*2);
		memoryCtx.fill();
	}
	update(){
		memoryCtx.filter = 'blur(10px)';

		if( this.x+this.px-this.size < 0 || this.x+this.px+this.size > maxWidth ){
			this.px = -this.px;
		}
		if( this.y+this.py-this.size < 0 || this.y+this.py+this.size > maxHeight ){
			this.py = -this.py;
		}

		if( this.x -this.size < 0 || this.x+this.size > maxWidth || this.y-this.sisze < 0 || this.y+this.size > maxHeight ){
			this.x = (Math.random()*(maxWidth-this.size*2))+this.size;
			this.y = (Math.random()*(maxHeight-this.size*2))+this.size;
		}
		this.x += this.px;
		this.y += this.py;
		this.draw();
	}
}

function init(){
	addBall();
	animate();
}
function addBall(){
	let count = parseInt(maxWidth/100)+parseInt(maxHeight/100);
	if( balls.length >= count ){
		balls.splice(0,balls.length - count);
		return;
	}else{
		const max = count-balls.length;
		for(let i=0; i<max; i++){
			let size = (Math.random()*35)+15;
			let x = (Math.random()*(maxWidth-size*2))+size;
			let y = (Math.random()*(maxHeight-size*2))+size;
			let color = `#000`;
			balls = [...balls,new Ball(x,y,size,color)];
		}
	}
}
function animate(){
	memoryCtx.clearRect(0,0,maxWidth,maxHeight);
	memoryCtx.fillStyle = '#fff';
	memoryCtx.rect(0,0,maxWidth,maxHeight);
	memoryCtx.fill();

	for(let ball of balls){
		ball.update();
	}

	ctx.filter = 'contrast(60)';
	ctx.drawImage(memoryCanvas,0,0);	
	
	
	requestAnimationFrame(animate);

}



init();