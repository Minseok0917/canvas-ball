const memoryCanvas = document.createElement('canvas');
const memoryCtx = memoryCanvas.getContext('2d') ;
const $img = document.getElementById('img')
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

	ctx.filter = 'contrast(20)';
	ctx.drawImage(memoryCanvas,0,0);	
	
	
	requestAnimationFrame(animate);

}



init();