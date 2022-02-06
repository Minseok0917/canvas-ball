const memoryCanvas = document.createElement('canvas');
const memoryCtx = memoryCanvas.getContext('2d') ;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let balls = [];


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



ctx.filter = 'blur(10px)';
ctx.beginPath();
ctx.arc(50,50,30,0,Math.PI*2);
ctx.fill();

ctx.beginPath();
ctx.arc(100,50,30,0,Math.PI*2);
ctx.fill();


let img = new Image();
img.src = canvas.toDataURL();
img.onload = () => {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.filter = 'contrast(20)';
	ctx.drawImage(img,0,0);
}
/*memoryCanvas.width = window.innerWidth;
memoryCanvas.height = window.innerHeight;
class Ball{
	constructor(x,y,size,color){
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;

		this.px = (Math.random()*10)+2;
		this.py = (Math.random()*10)+2;
	}
	draw(){
		memoryCtx.beginPath();
		memoryCtx.fillStyle = this.color;
		memoryCtx.arc(this.x,this.y,this.size,0,Math.PI*2);
		memoryCtx.fill();
	}
	update(){
		memoryCtx.filter = 'blur(10px)';
		if( this.x+this.px < 0 || this.x+this.px > canvas.width ){
			this.px = -this.px;
		}
		if( this.y+this.py < 0 || this.y+this.py > canvas.height ){
			this.py = -this.py;
		}
		this.x += this.px;
		this.y += this.py;
		this.draw();
	}
}

function init(){
	for(let i=0; i<50; i++){
		let size = (Math.random()*35)+15;
		let x = (Math.random()*(canvas.width-size))+size;
		let y = (Math.random()*(canvas.height-size))+size;
		let color = '#000';
		balls = [...balls,new Ball(x,y,size,color)];
	}
	animate();
}
function animate(){
	memoryCtx.clearRect(0,0,canvas.width,canvas.height);
	for(let ball of balls){
		ball.update();
	}
	const img = new Image();
	img.src = memoryCanvas.toDataURL();
	img.onload = () => {
		// console.log(img);
		ctx.filter = 'contrast(20)';
		ctx.drawImage(img,0,0);
		// requestAnimationFrame(animate);
	}

}*/



init();