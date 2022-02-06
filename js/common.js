const memoryCanvas = document.createElement('canvas');
const memoryCtx = memoryCanvas.getContext('2d') ;
const $img = document.getElementById('img')
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let balls = [];


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


memoryCanvas.width = window.innerWidth;
memoryCanvas.height = window.innerHeight;
class Ball{
	constructor(x,y,size,color){
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;

		this.px = (Math.random()*15)+1;
		this.py = (Math.random()*15)+1;
	}
	draw(){
		memoryCtx.beginPath();
		memoryCtx.fillStyle = this.color;
		memoryCtx.arc(this.x,this.y,this.size,0,Math.PI*2);
		memoryCtx.fill();
	}
	update(){
		memoryCtx.filter = 'blur(10px)';
		if( this.x+this.px-this.size < 0 || this.x+this.px+this.size > memoryCanvas.width ){
			this.px = -this.px;
		}
		if( this.y+this.py-this.size < 0 || this.y+this.py+this.size > memoryCanvas.height ){
			this.py = -this.py;
		}
		this.x += this.px;
		this.y += this.py;
		this.draw();
	}
}

function init(){
	for(let i=0; i<100; i++){
		let size = (Math.random()*35)+15;
		let x = (Math.random()*(memoryCanvas.width-size*2))+size;
		let y = (Math.random()*(memoryCanvas.height-size*2))+size;
		let color = `#000`;
		balls = [...balls,new Ball(x,y,size,color)];
	}
	animate();
}
function animate(){
	memoryCtx.clearRect(0,0,memoryCanvas.width,memoryCanvas.height);
	memoryCtx.fillStyle = '#fff';
	memoryCtx.rect(0,0,memoryCanvas.width,memoryCanvas.height);
	memoryCtx.fill();

	for(let ball of balls){
		ball.update();
	}

	// $img.src = memoryCanvas.toDataURL();
	ctx.filter = 'contrast(20)';
	ctx.drawImage(memoryCanvas,0,0);	
	
	
	requestAnimationFrame(animate);

}



init();